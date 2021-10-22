import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostState } from '../../../store/post/post.reducer';
import { MockModule, MockProvider } from 'ng-mocks';
import { MomentModule } from 'ngx-moment';
import { selectAllPosts } from '../../../store/post/post.selector';
import { mockPost } from '../../shared/mocks/post.mock';
import { commentMock } from '../../shared/mocks/comment.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let store: MockStore;
  const posts: PostState = {
    isLoading: undefined,
    ids: [],
    hasError: undefined,
    slugMap: {},
    entities: {}
  };
  const initialState = { posts };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentFormComponent],
      imports: [MockModule(MomentModule), MockModule(FormsModule), MockModule(ReactiveFormsModule), MockModule(AngularFireAnalyticsModule)],
      providers: [provideMockStore({ initialState }), MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;

    component.post = mockPost;
    component.comment = commentMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
