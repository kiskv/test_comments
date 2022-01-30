import {
    createSlice,
    PayloadAction,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';

import { RootState } from '../../store';

type Id = string;

export type Comment = {
    authorId: string;
    id: Id;
    text: string;
    timestamp: number;
    childs: string[];
    parentId: Id | null;
};

type AddCommentPayload = Pick<Comment, 'authorId' | 'text' | 'parentId'>;
type UpdateCommentTextPayload = Pick<Comment, 'id' | 'text'>;

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState<{
    currentReplyId: Id | null;
}>({
    currentReplyId: null,
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        deleteComment(state, action: PayloadAction<Id>) {
            const parentId = state.entities[action.payload]?.parentId;

            if (parentId) {
                const parentChildren = state.entities[parentId]?.childs ?? [];
                // remove link from parent children
                commentsAdapter.updateOne(state, {
                    id: parentId,
                    changes: {
                        childs: parentChildren.filter(
                            (id) => id !== action.payload
                        ),
                    },
                });
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
        setCurrentReplyId(state, action: PayloadAction<Id>) {
            state.currentReplyId = action.payload;
        },
        cancelReply(state) {
            state.currentReplyId = null;
        },
    },
});

export const commentsSelectors = commentsAdapter.getSelectors<RootState>(
    (state) => state.comments
);

export const currentReplyIdSelector = (state: RootState) =>
    state.comments.currentReplyId;

export const {
    addComment,
    deleteComment,
    updateCommentText,
    setCurrentReplyId,
    cancelReply,
} = commentsSlice.actions;

export default commentsSlice.reducer;
