import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrl: './upload-post.component.css'
})
export class UploadPostComponent {
  @ViewChild('imgFile') imageFile !: ElementRef<HTMLInputElement>;

  postForm !: FormGroup;

  private readonly formbuilder = inject(FormBuilder);
  private readonly postSvc = inject(PostService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.postForm = this.formbuilder.group({
      comments: this.formbuilder.control<string>('', [Validators.required, Validators.minLength(5)]),
      picture: this.formbuilder.control<string>('', Validators.required)
    })
  }  

  uploadPost() {
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

      this.postSvc.uploadPost(formData)
        .then (response => {
            // console.info(JSON.stringify(response));
            const postId = response['postId']; // coming from http
            this.router.navigate(['/post', postId])
        })
        .catch (error => {        
            console.error(error);
            alert(JSON.stringify(error));
        })
    } else {
      console.log('No file selected');
      return;
    }
  }
}
