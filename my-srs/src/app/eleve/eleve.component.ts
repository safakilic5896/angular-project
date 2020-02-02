import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Files } from '../models/files.model';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {

  files: string[];
  constructor(private uploadService: UploadService,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.length <= 0) {
      this.router.navigate(['/login']);
    }
    this.apiService.files().subscribe((data: Files) => {
      this.files = data.files;
    });
  }
}
