import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';;

import { UploadService } from '../upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uploadForm: FormGroup | undefined;
  selectedFile?: File;
  originalImageUrl?: string;
  croppedImageUrl?: string;

  constructor(private uploadService: UploadService) {}

  // Triggered when file input changes
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile)
    }
  }

 
  onSubmit() {
    console.log("Submit clicked");
  
    if (!this.selectedFile) {
      console.warn("No file selected");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      console.log("reader.onload");
      const base64 = (reader.result as string).split(',')[1];
      console.log("Base64 Data:", base64); // בדוק אם כאן יש בעיה

    // ודא שאתה שולח את הנתונים עם מבנה נכון
    const body = { image: base64 };
  
    this.uploadService.uploadImage(body).subscribe(response => {
      console.log("Response:", response);
      this.originalImageUrl = response.originalUrl;
      this.croppedImageUrl = response.croppedUrl;
    }, error => {
      console.error('Upload error:', error);
    });
  };
  
    reader.readAsDataURL(this.selectedFile);
  }
  
}
