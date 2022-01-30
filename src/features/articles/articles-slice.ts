import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../../store';

type Article = {
    id: string;
    title: string;
    text: string;
    userId: string;
    timestamp: number;
};

type Id = string;

const articlesAdapter = createEntityAdapter<Article>();

const emptyInitialState = articlesAdapter.getInitialState<{
    current: Id;
}>({
    current: 'article001',
});

const exampleState = articlesAdapter.upsertMany(emptyInitialState, {
    article001: {
        id: 'article001',
        title: 'Саундтрек игры Devs Ex Machina (ZX Spectrum 1984)',
        text: 'Мультимедийный артефакт далекой эпохи, к которому при желании можно прикоснуться и сейчас (в стим). Для тех кто боится не пережить подобный эксперимент прилагается оцифровка кассет шедших с игрой.',
        userId: 'author004',
        timestamp: 432432423435,
    },
});

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: exampleState,
    reducers: {},
});

const articlesSelectors = articlesAdapter.getSelectors<RootState>(
    (state) => state.articles
);

export const currentArticleSelector = (state: RootState) =>
    articlesSelectors.selectById(state, state.articles.current);

export default articlesSlice.reducer;
