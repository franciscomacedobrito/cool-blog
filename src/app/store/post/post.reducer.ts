import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as PostActions from './post.actions';
import { Post } from '../../core/interfaces/post.interface';

export const POSTS_STORE_KEY = 'posts';

export interface PostState extends EntityState<Post> {
  isLoading: boolean;
  hasError: boolean;
  slugMap: {
    [key: string]: string;
  };
}

export function sortByDate(a: Post, b: Post): number {
  return b.publish_date.localeCompare(a.publish_date);
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortByDate
});

export const initialState: PostState = adapter.getInitialState({
  isLoading: false,
  hasError: false,
  slugMap: {}
});

const setSlugMap = (posts: Post[]) => {
  const map = {};
  posts.forEach(post => {
    map[post.slug] = post.id;
  });
  return map;
};

export const PostReducer = createReducer(
  initialState,
  on(PostActions.loadPosts, (state, action) => {
    return {
      ...adapter.removeAll(state),
      isLoading: true,
      hasError: false,
      slugMap: {}
    };
  }),
  on(PostActions.loadPostsSuccess, (state, action) => {
    return {
      ...adapter.addMany(action.posts, state),
      isLoading: false,
      hasError: false,
      slugMap: setSlugMap(action.posts)
    };
  }),
  on(PostActions.loadPostsError, state => {
    return {
      ...adapter.removeAll(state),
      isLoading: false,
      hasError: true,
      slugMap: {}
    };
  }),
  on(PostActions.clearPosts, state => adapter.removeAll(state))
);
