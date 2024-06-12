import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Post } from '../model';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-post',
  templateUrl: './get-post.component.html',
  styleUrl: './get-post.component.css'
})
export class GetPostComponent implements OnInit, OnDestroy {

  private readonly postSvc = inject(PostService);
  private readonly activatedRoute = inject(ActivatedRoute);

  post: Post | null = null;
  postId!: string;
  sub$ !: Subscription;

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postSvc.getPostById(postId).subscribe({
      next: (result: any) => {
        console.log(result);
        // Map response data to desired fields
        this.post = {
          postId: result.postId,
          comments: result.comments,
          pictureUrl: 'data:image/jpeg;base64,' + result.pictureStr  // Convert Base64 string to data URL
        };
      },
      error: (err: HttpErrorResponse) => console.log(">>> ERROR: ", err),
      complete: () => console.log("Retrieve post success!")
    });
  }

  ngOnDestroy(): void {
      if (this.sub$) {
        this.sub$.unsubscribe();
      }
  }
}
