import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { getStorageItem, setStorageItem } from '../utils/commons';
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs/index';
import { UiHelperService } from './ui-helper.service';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<IUser | undefined>;

  private GUEST_USER_KEY = 'guestUser';

  constructor(private auth: AngularFireAuth, private uiHelper: UiHelperService) {
    this.currentUser = new BehaviorSubject<IUser | undefined>(undefined);
    this.auth.user.subscribe(async userState => {
      let currentUser;
      if (userState) {
        if (!userState.displayName) {
          await userState.reload();
        }

        currentUser = {
          id: userState.uid,
          displayName: userState.displayName,
          isGuest: false
        };
      } else {
        const guestUser = this.getGuestUser();
        currentUser = guestUser ? guestUser : this.setGuestUser();
      }
      this.currentUser.next(currentUser);
    });
  }

  getGuestUser(): IUser {
    return getStorageItem(localStorage, this.GUEST_USER_KEY);
  }

  setGuestUser(): IUser {
    const newGuestUser: IUser = {
      displayName: `Guest-${uniqueNamesGenerator({
        dictionaries: [colors, animals]
      })}`,
      id: uuidv4(),
      isGuest: true
    };
    setStorageItem(localStorage, this.GUEST_USER_KEY, newGuestUser);
    return newGuestUser;
  }

  logOut(): void {
    this.auth.signOut();
  }

  openLoginForm(): void {
    this.uiHelper.openDialogWithComponent(LoginFormComponent, 320);
  }

  loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  openRegisterPrompt(): void {
    this.uiHelper.openDialogWithComponent(RegisterFormComponent, 420);
  }

  registerUserByEmail(email: string, password: string, name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.auth.createUserWithEmailAndPassword(email, password).then(
        state => {
          state.user
            .updateProfile({
              displayName: name
            })
            .then(
              () => {
                resolve();
              },
              error => {
                reject(error);
              }
            );
        },
        error => reject(error)
      );
    });
  }
}
