import { Component, Input, OnInit } from '@angular/core';
import { AppComment } from '../../interfaces/comment.interface';
import { Store } from '@ngrx/store';
import { CommentState } from '../../../store/comment/comment.reducer';
import { selectAllChildComments } from '../../../store/comment/comment.selector';
import { Subscription } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comments: Partial<AppComment>[] = [];
  showCommentForm: boolean;
  displayDate: string;
  currentUser: IUser;

  private getCommentsSubscription: Subscription;

  @Input() comment: AppComment;
  @Input() post: Post;
  private currentUserSubscription: Subscription;

  constructor(private store: Store<CommentState>, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
    if (this.comment) {
      // this.displayDate = new Date(Number(this.comment.date)).toUTCString();
      this.displayDate = this.comment.date;
    }

    this.getCommentsSubscription = this.store.select(selectAllChildComments(this.post.id, this.comment.id)).subscribe(comments => {
      this.comments = comments;
    });
  }

  handleReplyClicked(): void {
    this.showCommentForm = !this.showCommentForm;
    if (this.currentUser.isGuest) {
      this.authService.openLoginForm();
    }
  }
}
