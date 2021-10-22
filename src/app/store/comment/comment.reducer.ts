import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as CommentActions from './comment.actions';
import { AppComment } from '../../core/interfaces/comment.interface';

export const COMMENTS_STORE_KEY = 'comments';

export interface CommentState extends EntityState<Partial<AppComment>> {
  isLoading: boolean;
  hasError: boolean;
}

export const adapter: EntityAdapter<Partial<AppComment>> = createEntityAdapter<Partial<AppComment>>();

export const initialState: CommentState = adapter.getInitialState({
  isLoading: false,
  hasError: false
});

export const CommentReducer = createReducer(
  initialState,

  on(CommentActions.loadComments, state => {
    return {
      ...state,
      hasError: false,
      isLoading: true
    };
  }),
  on(CommentActions.loadCommentsSuccess, (state, action) => {
    return {
      ...adapter.upsertMany(action.comments, state),
      isLoading: false,
      hasError: false
    };
  }),
  on(CommentActions.loadCommentsError, state => {
    return {
      ...adapter.removeAll(state),
      isLoading: false,
      hasError: true
    };
  }),
  on(CommentActions.addCommentSuccess, (state, action) => adapter.addOne(action.comment, state)),

  on(CommentActions.clearComments, state => adapter.removeAll(state))
);
