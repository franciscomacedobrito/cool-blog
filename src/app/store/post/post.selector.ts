import * as postReducer from './post.reducer';
import { adapter, POSTS_STORE_KEY } from './post.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectPostState = createFeatureSelector<postReducer.PostState>(POSTS_STORE_KEY);
const { selectAll } = adapter.getSelectors();

export const selectAllPosts = createSelector(selectPostState, selectAll);
export const getPostsLoadingError = createSelector(selectPostState, state => state.hasError);
export const getPostsIsLoading = createSelector(selectPostState, state => state.isLoading);
export const getPostBySlug = (slug: string) => {
  return createSelector(selectPostState, state => {
    const postId = state?.slugMap[slug];
    return postId && state?.entities[postId];
  });
};
