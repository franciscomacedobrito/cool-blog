import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser.interface';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  formSubmitAttempt: boolean;
  currentUser: IUser;
  loginForm: FormGroup;
  loading: boolean;
  loginError: string;

  public email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  public password: FormControl = new FormControl(null, [Validators.required]);

  private currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Optional() private dialogRef: MatDialogRef<LoginFormComponent>
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  doLogin(): void {
    this.formSubmitAttempt = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;

    this.authService.loginWithEmailAndPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(
      () => {
        this.loading = false;
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error => {
        this.loading = false;
        this.loginError = error;
      }
    );
  }

  promptRegister(): void {
    this.authService.openRegisterPrompt();
  }
}
