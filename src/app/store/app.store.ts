import { PostReducer, POSTS_STORE_KEY } from './post/post.reducer';
import { CommentReducer, COMMENTS_STORE_KEY } from './comment/comment.reducer';

export const AppStore = {
  [POSTS_STORE_KEY]: PostReducer,
  [COMMENTS_STORE_KEY]: CommentReducer
};
