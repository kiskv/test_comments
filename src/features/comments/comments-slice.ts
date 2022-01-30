import {
    createSlice,
    PayloadAction,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';

import { RootState } from '../../store';

type Id = string;

export type Comment = {
    userId: string;
    id: Id;
    text: string;
    timestamp: number;
    childs: string[];
    parentId: Id | null;
};

type AddCommentPayload = Pick<Comment, 'userId' | 'text' | 'parentId'>;
type UpdateCommentTextPayload = Pick<Comment, 'id' | 'text'>;
type EditorState = {
    commentId: Id | null;
    type: 'new' | 'replyTo' | 'edit';
};

const commentsAdapter = createEntityAdapter<Comment>();

const emptyInitialState = commentsAdapter.getInitialState<{
    editor: EditorState;
}>({
    editor: {
        commentId: null,
        type: 'new',
    },
});

const exampleState = commentsAdapter.upsertMany(emptyInitialState, {
    comment001: {
        userId: 'author001',
        id: 'comment001',
        text: 'Название напомнило прикольную игрушку от отечественных разрабов',
        timestamp: Date.now() - 4e5,
        childs: ['comment002'],
        parentId: null,
    },
    comment002: {
        userId: 'author002',
        id: 'comment002',
        text: 'Да уж... Deus Ex Machina ему об отечественной игрушке напоминает... Что за бескультурное поколение растёт!',
        timestamp: Date.now() - 4e4,
        childs: ['comment003'],
        parentId: 'comment001',
    },
    comment003: {
        userId: 'author003',
        id: 'comment003',
        text: 'Да это то понятно, самый популярный вариант. Как в той игре, где надо называть менее популярные варианты.',
        timestamp: Date.now() - 4e2,
        childs: [],
        parentId: 'comment002',
    },
    comment004: {
        userId: 'author004',
        id: 'comment004',
        text: 'Я для Exmachina пару треков в свое время писал. Если вы играли то скорее всего катались под них ;)',
        timestamp: Date.now() - 4,
        childs: [],
        parentId: null,
    },
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: exampleState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        deleteComment(state, action: PayloadAction<Id>) {
            const comment = state.entities[action.payload];

            if (!comment) return;

            if (comment.childs.length > 0) {
                commentsAdapter.updateOne(state, {
                    id: action.payload,
                    changes: {
                        text: 'Комментарий удалён по просьбе пользователя.',
                    },
                });

                return;
            }

            const { parentId } = comment;

            if (parentId) {
                const parentComment = state.entities[parentId];

                if (parentComment) {
                    // remove link from parent children
                    commentsAdapter.updateOne(state, {
                        id: parentId,
                        changes: {
                            childs: parentComment.childs.filter(
                                (id) => id !== action.payload
                            ),
                        },
                    });
                }
            }

            commentsAdapter.removeOne(state, action.payload);
        },

        addComment: {
            prepare(payload: AddCommentPayload) {
                const id = nanoid();
                const timestamp = Date.now();

                return {
                    payload: {
                        ...payload,
                        id,
                        timestamp,
                        childs: [],
                    },
                };
            },
            reducer(state, action: PayloadAction<Comment>) {
                const { parentId, id } = action.payload;

                if (parentId) {
                    const parentChildren =
                        state.entities[parentId]?.childs ?? [];

                    // Add this comment to parent entity children
                    commentsAdapter.updateOne(state, {
                        id: parentId,
                        changes: {
                            childs: [...parentChildren, id],
                        },
                    });
                }

                commentsAdapter.addOne(state, action.payload);
            },
        },

        updateCommentText(
            state,
            action: PayloadAction<UpdateCommentTextPayload>
        ) {
            commentsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    text: action.payload.text,
                },
            });
        },

        setEditor(state, action: PayloadAction<EditorState>) {
            state.editor = action.payload;
        },
    },
});

export const commentsSelectors = commentsAdapter.getSelectors<RootState>(
    (state) => state.comments
);

export const editorSelector = (state: RootState) => state.comments.editor;

export const { addComment, deleteComment, updateCommentText, setEditor } =
    commentsSlice.actions;

export default commentsSlice.reducer;
