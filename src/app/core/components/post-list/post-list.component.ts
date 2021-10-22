import { Component, OnDestroy } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { getPostsIsLoading, getPostsLoadingError, selectAllPosts } from '../../../store/post/post.selector';
import { PostState } from '../../../store/post/post.reducer';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnDestroy {
  posts: Post[] = [];
  isLoading: boolean;
  errorLoadingPosts: boolean;

  private getAllPostsSubscription: Subscription;
  private isLoadingPostsSubscription: Subscription;
  private postsLoadingHasErrorSubscription: Subscription;

  constructor(private store: Store<PostState>) {
    this.getAllPostsSubscription = store.select(selectAllPosts).subscribe(posts => (this.posts = posts));
    this.isLoadingPostsSubscription = store.select(getPostsIsLoading).subscribe(isLoading => (this.isLoading = isLoading));
    this.postsLoadingHasErrorSubscription = store.select(getPostsLoadingError).subscribe(hasError => {
      this.errorLoadingPosts = hasError;
    });
  }

  ngOnDestroy(): void {
    this.getAllPostsSubscription.unsubscribe();
    this.isLoadingPostsSubscription.unsubscribe();
    this.postsLoadingHasErrorSubscription.unsubscribe();
  }
}
