import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../../store';

import { commentsSelectors } from '../comments/comments-slice';

type User = {
    id: string;
    name: string;
};

type Id = string;

const usersAdapter = createEntityAdapter<User>();

const emptyInitialState = usersAdapter.getInitialState<{
    logged: Id;
}>({
    logged: 'author003',
});

const exampleState = usersAdapter.upsertMany(emptyInitialState, {
    author001: {
        id: 'author001',
        name: 'Джек Воробей',
    },
    author002: {
        id: 'author002',
        name: 'Дейви Джонс',
    },
    author003: {
        id: 'author003',
        name: 'Сяо Фэнь',
    },
    author004: {
        id: 'author004',
        name: 'Катлер Беккет',
    },
});

export const usersSelectors = {
    ...usersAdapter.getSelectors<RootState>((state) => state.users),
    loggedUserSelector: (state: RootState) =>
        usersSelectors.selectById(state, state.users.logged),
    userByCommentIdSelector: (state: RootState, commentId: Id) =>
        usersSelectors.selectById(
            state,
            commentsSelectors.selectById(state, commentId)?.userId ?? ''
        ),
};

export const usersSlice = createSlice({
    name: 'users',
    initialState: exampleState,
    reducers: {},
});

export default usersSlice.reducer;
