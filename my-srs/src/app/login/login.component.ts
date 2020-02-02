import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ApiService } from '../api.service';
import { ConnectionResponse } from '../models/connection-response.model';
import { DialogueDataComponent } from '../dialogue-data/dialogue-data.component';
import { FormBuilder, FormGroup,  Validators  } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService, public dialog: MatDialog,  private formBuilder: FormBuilder,
    private alertService: AlertService) { }
  username: string;
  password: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    localStorage.removeItem('currentUser');
  }

  openDialog(msgError: string): void {
    const dialogRef = this.dialog.open(DialogueDataComponent, {
      width: '300px',
      data: {msgError: msgError}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  get f() { return this.loginForm.controls; }

  login(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.apiService.getConnection(this.username, this.password).subscribe((value: ConnectionResponse) => {
      if (value.existed === true) {
        if (value.fonction === 'Élève') {
          localStorage.setItem('currentUser', JSON.stringify(value));
          this.router.navigate(["eleve"]);
        } else if (value.fonction === 'Professeur' || value.fonction === 'admin') {
          localStorage.setItem('currentUser', JSON.stringify(value));
          this.router.navigate(["user"]);
        }
      }
      else {
        this.openDialog(value.error);
      }
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser'); 
  }
}
