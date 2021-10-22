import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs/index';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      imports: [MockModule(AngularFireAuthModule)],
      providers: [MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
