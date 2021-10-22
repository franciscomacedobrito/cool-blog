import { Component, OnInit } from '@angular/core';
import { loadPosts } from '../../../store/post/post.actions';
import { Store } from '@ngrx/store';
import { PostState } from '../../../store/post/post.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<PostState>) {
    this.store.dispatch(loadPosts());
  }

  ngOnInit(): void {}
}
