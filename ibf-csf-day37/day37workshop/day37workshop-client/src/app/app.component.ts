import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild('imgFile') imageFile !: ElementRef<HTMLInputElement>;
  postForm !: FormGroup;
  uploadURL : string = 'http://localhost:8080/api/post';

  constructor(
    private formbuilder: FormBuilder,
    private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.postForm = this.formbuilder.group({
      comments: this.formbuilder.control<string>('', [Validators.required, Validators.minLength(5)]),
      picture: this.formbuilder.control<string>('', Validators.required)
    })
  }  

  uploadImage() {
    if (this.postForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.set('comments', this.postForm.get('comments')?.value);
    const fileInput = this.imageFile.nativeElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.set('picture', file);
    } else {
      console.log('No file selected');
      return;
    }

    firstValueFrom(this.httpClient.post(this.uploadURL, formData))
      .then(() => {
        console.log('Image uploaded successfully');
      })
      .catch((error: HttpErrorResponse)=>{
        console.log('There seems to be an error posting...', error.message)
      })
  }
}
