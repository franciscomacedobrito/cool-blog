import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppComment } from '../interfaces/comment.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${environment.host}/posts/${postId}/comments`);
  }

  postComment(postId: number, comment: Partial<AppComment>): Observable<any> {
    return this.http.post(`${environment.host}/posts/${postId}/comments`, comment);
  }
}
