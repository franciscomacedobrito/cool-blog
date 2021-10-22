import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppComment } from '../../core/interfaces/comment.interface';

export const loadComments = createAction('[AppComment/API] Load Comments', props<{ postId: number }>());

export const loadCommentsSuccess = createAction('[AppComment/API] Load Comments Success', props<{ comments: AppComment[] }>());

export const loadCommentsError = createAction('[AppComment/API] Load Comments Error');

export const addComment = createAction('[AppComment/API] Add Comment', props<{ postId: number; comment: Partial<AppComment> }>());

export const addCommentSuccess = createAction('[AppComment/API] Add Comment Success', props<{ comment: AppComment }>());

export const updateComment = createAction('[AppComment/API] Update Comment', props<{ comment: Update<AppComment> }>());

export const clearComments = createAction('[AppComment/API] Clear Comments');
