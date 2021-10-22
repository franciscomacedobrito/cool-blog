import * as commentReducer from './comment.reducer';
import { COMMENTS_STORE_KEY } from './comment.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectCommentState = createFeatureSelector<commentReducer.CommentState>(COMMENTS_STORE_KEY);

export const selectAllCommentsByPostId = (postId: number) => {
  return createSelector(selectCommentState, state => {
    return (
      postId &&
      Object.values(state.entities)
        .filter(comment => Number(comment.postId) === Number(postId) && !comment.parent_id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  });
};

export const selectAllChildComments = (postId: number, commentId: number) => {
  return createSelector(selectCommentState, state => {
    return (
      postId &&
      Object.values(state.entities)
        .filter(comment => Number(comment.postId) === postId && Number(comment.parent_id) === commentId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
  });
};

export const getCommentsLoadingError = createSelector(selectCommentState, state => state.hasError);
export const getCommentsIsLoading = createSelector(selectCommentState, state => state.isLoading);
