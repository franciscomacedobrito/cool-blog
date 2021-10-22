import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommentState } from '../../../store/comment/comment.reducer';
import { selectAllPosts } from '../../../store/post/post.selector';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
      declarations: [HomeComponent],
      imports: [],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllPosts, []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
