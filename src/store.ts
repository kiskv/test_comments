import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commentsReducer from './features/comments/comments-slice';

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
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
