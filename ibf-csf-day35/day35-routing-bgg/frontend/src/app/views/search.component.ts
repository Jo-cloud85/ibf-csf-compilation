import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ])
    })
  }

  search() {
    console.info(">>> form: ", this.form.value)
    this.router.navigate(['/games'], { queryParams: { q: this.form.value['q'] } })
  }

}
