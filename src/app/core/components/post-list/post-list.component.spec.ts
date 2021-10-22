import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostState } from '../../../store/post/post.reducer';
import { selectAllPosts } from '../../../store/post/post.selector';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
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
      providers: [provideMockStore({ initialState })],
      declarations: [PostListComponent]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
