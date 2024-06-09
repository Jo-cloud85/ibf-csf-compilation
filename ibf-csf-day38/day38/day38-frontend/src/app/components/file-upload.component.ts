import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnDestroy {

  private readonly fileSvc = inject(FileService);

  sub$!: Subscription;

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  get f() {
    return this.myForm.controls;
  }

  submit(): void {
    const formData = new FormData();
    const fileSourceValue = this.myForm.get('fileSource')?.value;
    const commentsValue = this.myForm.get('comments')?.value || ''; // Ensure commentsValue is a string

    if (fileSourceValue) {
      formData.append('myfile', fileSourceValue); // Use 'myfile' as the key
      formData.append('comments', commentsValue); // Append comments value

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.sub$ = this.fileSvc.uploadFile(formData).subscribe({
        next: (result: any) => {
          console.log("Upload result:", result);
          alert("File uploaded!");
        },
        error: (err: HttpErrorResponse) => {
          console.error("HTTP Error:", err);
          alert(`File upload failed: ${err.message}`);
        },
        complete: () => console.log("File upload completed.")
      });

      this.myForm.reset();
    } else {
      console.error("No file selected!");
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      })
    }
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }
}
