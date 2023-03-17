import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginModule } from './authentication/user-login/user-login.module';
import { UserRegistrationModule } from './user-info/user-registration/user-registration.module';
import { HttpClientModule } from '@angular/common/http';
import { AnimalEditComponent } from './animal-info/animal-edit/animal-edit.component';
import { AnimalInfoModule } from './animal-info/animal-info.module'
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRegistrationModule,
    UserLoginModule,
    AnimalInfoModule,
    UserInfoModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
