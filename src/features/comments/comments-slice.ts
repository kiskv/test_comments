import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';

import { RootState } from '../../store';

type Comment = {
  authorId: string;
  id: string;
  text: string;
  timestamp: number;
  children: string[];
  parentId?: string;
}

type AddCommentPayload = Pick<Comment, 'authorId' | 'text' | 'parentId'>;
type UpdateCommentTextPayload = Pick<Comment, 'id' | 'text'>;

const commentsAdapter = createEntityAdapter<Comment>();

const initialState = commentsAdapter.getInitialState();

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    deleteComment (state, action: PayloadAction<Comment['id']>) {
      const parentId = state.entities[action.payload]?.parentId;

      if (parentId) {
        const parentChildren = state.entities[parentId]?.children ?? [];
        // remove link from parent children
        commentsAdapter.updateOne(state, {
          id: parentId,
          changes: {
            children: parentChildren.filter((id) => id !== action.payload)
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
            children: [],
          }
        };
      },
      reducer(state, action: PayloadAction<Comment>) {
        const { parentId, id } = action.payload;
  
        if (parentId) {
          const parentChildren = state.entities[parentId]?.children ?? [];

          // Add this comment to parent entity children
          commentsAdapter.updateOne(state, {
            id: parentId,
            changes: {
              children: [...parentChildren, id],
            }
          });
        }
  
        commentsAdapter.addOne(state, action.payload);
      },
    },
    updateCommentText(state, action: PayloadAction<UpdateCommentTextPayload>) {
      commentsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          text: action.payload.text,
        }
      });
    },
  },
});

export const commentsSelectors =
  commentsAdapter.getSelectors<RootState>((state) => state.comments);

export const { addComment, deleteComment, updateCommentText } = commentsSlice.actions;

export default commentsSlice.reducer;