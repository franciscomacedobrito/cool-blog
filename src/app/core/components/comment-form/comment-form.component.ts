import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentState } from '../../../store/comment/comment.reducer';
import { addComment } from '../../../store/comment/comment.actions';
import { AppComment } from '../../interfaces/comment.interface';
import { Post } from '../../interfaces/post.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {
  commentValue: string;
  postCommentForm: FormGroup;
  formSubmitAttempt: boolean;
  currentUser: IUser;

  public commentText: FormControl = new FormControl(null, [Validators.required, Validators.minLength(20)]);

  @Input() comment: AppComment;
  @Input() post: Post;
  @Output() commentAdded = new EventEmitter<void>();
  private currentUserSubscription: Subscription;

  constructor(
    private store: Store<CommentState>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private analytics: AngularFireAnalytics
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = undefined;
      setTimeout(() => (this.currentUser = currentUser));
      currentUser?.isGuest ? this.commentText.disable() : this.commentText.enable();
    });
    this.postCommentForm = this.formBuilder.group({
      commentText: this.commentText
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  submitPost(): void {
    this.formSubmitAttempt = true;
    if (!this.postCommentForm.valid) {
      return;
    }

    this.store.dispatch(
      addComment({
        comment: {
          postId: this.post.id,
          parent_id: this.comment?.id,
          user: this.currentUser.displayName,
          date: new Date().toISOString(),
          content: this.postCommentForm.controls.commentText.value
        },
        postId: this.post.id
      })
    );

    this.commentAdded.emit();
    this.postCommentForm.controls.commentText.setValue('');
    this.formSubmitAttempt = false;
  }

  promptLogin(): void {
    this.authService.openLoginForm();
  }

  handleFormClick(): void {
    if (this.currentUser.isGuest) {
      this.analytics.logEvent('attempt to add comment');
      this.promptLogin();
    }
  }
}
