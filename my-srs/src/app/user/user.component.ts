import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Files } from '../models/files.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
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

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    }
    change($event) {
    this.changeImage = true;
    }
    changedImage(event) {
    this.selectedFile = event.target.files[0];
    }
    upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
    this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
    alert('File Successfully Uploaded');
    this.apiService.files().subscribe((data: Files) => {
      this.files = data.files;
    });
    }
    this.selectedFiles = undefined;
    });
    }
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }
  }
