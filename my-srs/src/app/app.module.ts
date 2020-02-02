import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './core/material.module';
import {FormsModule, ControlContainer, NgControl, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DialogueDataComponent } from './dialogue-data/dialogue-data.component';
import { MatDialogModule, MatSnackBar, MatSnackBarContainer, MatSnackBarModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { AlertService } from './services/alert.service';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { EleveComponent } from './eleve/eleve.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    DialogueDataComponent,
    RegisterComponent,
    SnackbarComponent,
    EleveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DialogueDataComponent
  ],
  providers: [
    AlertService,
    SnackbarComponent,
    {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }