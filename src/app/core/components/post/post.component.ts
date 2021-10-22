import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;

  constructor(private router: Router) {}

  seePost(): void {
    this.router.navigate(['posts', this.post.slug]);
  }
}
