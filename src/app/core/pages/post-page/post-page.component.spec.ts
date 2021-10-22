import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommentState } from '../../../store/comment/comment.reducer';
import { selectAllPosts } from '../../../store/post/post.selector';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
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
      declarations: [PostPageComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState }), MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
