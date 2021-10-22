import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnDestroy {
  currentUser: IUser;
  private currentUserSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = undefined;
      setTimeout(() => (this.currentUser = currentUser));
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  logoutUser(): void {
    this.authService.logOut();
  }

  handleUserAvatarClick(): void {
    if (this.currentUser.isGuest) {
      this.authService.openLoginForm();
    }
  }
}
