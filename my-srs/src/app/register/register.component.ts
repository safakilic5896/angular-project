import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../models/user.model';
import { AlertService } from '../services/alert.service';
import { DialogData } from '../models/dialogData.model';
import { MatDialog } from '@angular/material';
import { DialogueDataComponent } from '../dialogue-data/dialogue-data.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private alertService: AlertService,
              public dialog: MatDialog,
              private snackBar: SnackbarComponent) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fonction: ['', Validators.required]
  });
  }

  get f() { return this.registerForm.controls; }

  // tslint:disable-next-line:ban-types
  openDialog(msgError: String): void {
    const dialogRef = this.dialog.open(DialogueDataComponent, {
      width: '300px',
      // tslint:disable-next-line:object-literal-shorthand
      data: {msgError: msgError}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.apiService.register(this.registerForm.value).subscribe(
      data => {
        if (data.response === 'Cet identifiant existe déjà. Veuillez saisir un autre identifiant') {
          this.openDialog(data.response);
          this.loading = false;
        } else {
          this.alertService.success('Registration successful', true);
          this.snackBar.openSnackBar('Votre compte a bien été enregistré.', 'OK');
          this.router.navigate(['/login']);
        }
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
}
