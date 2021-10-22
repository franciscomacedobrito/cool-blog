import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostsService } from '../../core/services/posts.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { loadPosts, loadPostsError, loadPostsSuccess } from './post.actions';
import { Post } from '../../core/interfaces/post.interface';
import { PostState } from './post.reducer';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postsService: PostsService, private postsStore: Store<PostState>) {}

  @Effect()
  loadPosts$ = this.actions$.pipe(
    ofType(loadPosts),
    mergeMap(() =>
      this.postsService.getAll().pipe(
        map((posts: Post[]) => loadPostsSuccess({ posts })),
        catchError(() => {
          this.postsStore.dispatch(loadPostsError());
          return EMPTY;
        })
      )
    )
  );
}
