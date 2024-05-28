import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelService } from '../marvel.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../model';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css'
})
export class PostCommentComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly marvelSvc = inject(MarvelService);

  commentForm !: FormGroup;

  characterId!: number;

  character = '';

  sub$ = new Subscription;

  ngOnInit(): void {
    this.characterId = parseInt(this.route.snapshot.params['characterId']);

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  postComment() {
    if (this.commentForm.invalid) {
      return;
    }

    const commentData: Partial<Comment> = {
      characterId: this.characterId,
      text: this.commentForm.get('comment')?.value,
    };

    this.marvelSvc.postComment(commentData).subscribe(
      {
        next: () => {
          this.router.navigate(['/character', this.characterId]);
        },
        error: (err : HttpErrorResponse) => {
          console.error('Error posting comment:', err.message);
        },
        complete: () => {
          this.sub$.unsubscribe()
        }
      }
    )

    this.router.navigate(['/character', this.characterId])
  }
}
