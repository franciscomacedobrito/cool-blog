import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommentState } from '../../../store/comment/comment.reducer';
import { MockModule, MockProvider } from 'ng-mocks';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { selectAllPosts } from '../../../store/post/post.selector';
import { mockPost } from '../../shared/mocks/post.mock';

describe('ComponentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;
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
      declarations: [CommentsListComponent],
      imports: [MockModule(FormsModule), MockModule(ReactiveFormsModule)],
      providers: [provideMockStore({ initialState }), MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;

    component.post = mockPost;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
