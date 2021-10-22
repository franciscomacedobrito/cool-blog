import { CommentsService } from '../../core/services/comments.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { addComment, addCommentSuccess, loadComments, loadCommentsError, loadCommentsSuccess } from './comment.actions';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CommentState } from './comment.reducer';
import { EMPTY } from 'rxjs';
import { AppComment } from '../../core/interfaces/comment.interface';

@Injectable()
export class CommentEffects {
  constructor(private actions$: Actions, private commentsService: CommentsService, private commentsStore: Store<CommentState>) {}

  @Effect()
  loadComments$ = this.actions$.pipe(
    ofType(loadComments),
    mergeMap(data => {
      return this.commentsService.getCommentsByPostId(data.postId).pipe(
        map((comments: AppComment[]) => loadCommentsSuccess({ comments })),
        catchError(() => {
          this.commentsStore.dispatch(loadCommentsError());
          return EMPTY;
        })
      );
    })
  );

  @Effect()
  createComment = this.actions$.pipe(
    ofType(addComment),
    mergeMap(data => {
      return this.commentsService.postComment(data.postId, data.comment).pipe(
        map((comment: AppComment) => {
          return addCommentSuccess({ comment });
        }),
        catchError(() => {
          this.commentsStore.dispatch(loadCommentsError());
          return EMPTY;
        })
      );
    })
  );
}
