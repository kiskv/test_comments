import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commentsReducer from './features/comments/comments-slice';
import usersReducer from './features/users/users-slice';
import articlesReducer from './features/articles/articles-slice';

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
        users: usersReducer,
        articles: articlesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
