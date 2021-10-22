import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MockModule(AngularFireAnalyticsModule)],
      providers: [MockProvider(AuthService, { currentUser: new BehaviorSubject(undefined) })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
