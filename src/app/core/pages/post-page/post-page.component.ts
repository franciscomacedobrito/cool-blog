import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPostBySlug } from '../../../store/post/post.selector';
import { Subscription } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';
import { PostState } from '../../../store/post/post.reducer';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post: Post;

  private getPostSubscription: Subscription;

  constructor(private store: Store<PostState>, private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('postslug');
    this.getPostSubscription = store.select(getPostBySlug(slug)).subscribe(post => {
      if (!post) {
        return;
      }
      this.post = post;
    });
  }

  ngOnInit(): void {}
}
