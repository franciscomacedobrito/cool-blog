import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './core/pages/home/home.component';
import { TopBarComponent } from './core/components/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostListComponent } from './core/components/post-list/post-list.component';
import { LoginComponent } from './core/pages/login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { PostsComponent } from './core/pages/posts/posts.component';
import { PostComponent } from './core/components/post/post.component';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppStore } from './store/app.store';
import { AppEffects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PostPageComponent } from './core/pages/post-page/post-page.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommentComponent } from './core/components/comment/comment.component';
import { CommentsListComponent } from './core/components/commenents-list/comments-list.component';
import { CommentFormComponent } from './core/components/comment-form/comment-form.component';
import { AdorableAvatarModule } from '@adorable-avatar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginFormComponent } from './core/components/login-form/login-form.component';
import { RegisterFormComponent } from './core/components/register-form/register-form.component';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    PostListComponent,
    LoginComponent,
    PostsComponent,
    PostComponent,
    PostPageComponent,
    CommentComponent,
    CommentsListComponent,
    CommentFormComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdorableAvatarModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    EffectsModule.forRoot(AppEffects),
    StoreModule.forRoot(AppStore, {}),
    MatProgressSpinnerModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    TextFieldModule
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
