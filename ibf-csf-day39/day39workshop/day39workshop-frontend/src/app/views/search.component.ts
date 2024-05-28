import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  form !: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      char: this.fb.control<string>('', [Validators.required])
    })
  }

  process() {
    console.log(">>>>> Form: " + this.form.value);
    this.router.navigate(['/characters'], {queryParams: {char: this.form.value['char'] }})
  }
}
