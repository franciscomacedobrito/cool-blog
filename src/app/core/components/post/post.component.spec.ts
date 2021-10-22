import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostState } from '../../../store/post/post.reducer';
import { selectAllPosts } from '../../../store/post/post.selector';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { MomentModule } from 'ngx-moment';
import { mockPost } from '../../shared/mocks/post.mock';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
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
      declarations: [PostComponent],
      imports: [RouterTestingModule, MockModule(MomentModule)],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = mockPost;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
