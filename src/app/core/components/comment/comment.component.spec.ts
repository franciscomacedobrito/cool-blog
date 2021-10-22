import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommentState } from '../../../store/comment/comment.reducer';
import { MockModule, MockProvider } from 'ng-mocks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { selectAllPosts } from '../../../store/post/post.selector';
import { mockPost } from '../../shared/mocks/post.mock';
import { AdorableAvatarModule } from '@adorable-avatar/angular';
import { MomentModule } from 'ngx-moment';
import { commentMock } from '../../shared/mocks/comment.mock';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let store: MockStore;
  const comments: CommentState = {
    isLoading: undefined,
    ids: [],
    hasError: undefined,
    entities: {}
  };
  const initialState = { comments };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent],
      imports: [MockModule(FormsModule), MockModule(ReactiveFormsModule), MockModule(AdorableAvatarModule), MockModule(MomentModule)],
      providers: [provideMockStore({ initialState }), MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.post = mockPost;
    component.comment = commentMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
