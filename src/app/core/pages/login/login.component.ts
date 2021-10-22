import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from '../../interfaces/IUser.interface';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentUser: IUser;

  private currentUserSubscription: Subscription;

  constructor(private authService: AuthService, private analytics: AngularFireAnalytics) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  trackAvatarClick(): void {
    this.analytics.logEvent('Avatar click');
  }
}
