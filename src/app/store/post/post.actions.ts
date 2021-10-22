import { createAction, props } from '@ngrx/store';
import { Post } from '../../core/interfaces/post.interface';

export const loadPosts = createAction('[Post/API] Load Posts');

export const loadPostsSuccess = createAction('[Post/API] Load Posts Success', props<{ posts: Post[] }>());

export const loadPostsError = createAction('[Post/API] Load Posts Error');

export const clearPosts = createAction('[Post/API] Clear Posts');
