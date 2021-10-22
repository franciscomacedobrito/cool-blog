import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { Store } from '@ngrx/store';
import { CommentState } from '../../../store/comment/comment.reducer';
import { Subscription } from 'rxjs';
import { loadComments } from '../../../store/comment/comment.actions';
import { selectAllCommentsByPostId } from '../../../store/comment/comment.selector';
import { AppComment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./components-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  private getCommentsSubscription: Subscription;

  comments: Partial<AppComment>[] = [];

  @Input() post: Post;
  constructor(private store: Store<CommentState>) {}

  ngOnInit(): void {
    if (this.post.id) {
      this.store.dispatch(loadComments({ postId: this.post.id }));
      this.getCommentsSubscription = this.store.select(selectAllCommentsByPostId(this.post.id)).subscribe(comments => {
        this.comments = comments;
      });
    }
  }
}
