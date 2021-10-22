import { Component, OnInit, Optional } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../login-form/login-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  formSubmitAttempt: boolean;
  currentUser: IUser;
  loginForm: FormGroup;
  loading: boolean;
  loginError: string;

  public name: FormControl = new FormControl(null, [Validators.required]);
  public email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  public password: FormControl = new FormControl(null, [Validators.required]);

  private currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Optional() private dialogRef: MatDialogRef<RegisterFormComponent>
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }

  doRegister(): void {
    this.formSubmitAttempt = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.loading = true;

    this.authService
      .registerUserByEmail(this.loginForm.controls.email.value, this.loginForm.controls.password.value, this.loginForm.controls.name.value)
      .then(
        () => {
          this.loading = false;
          this.dialogRef.close();
        },
        error => {
          this.loading = false;
          this.loginError = error;
        }
      );
  }
}
