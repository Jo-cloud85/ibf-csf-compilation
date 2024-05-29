import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected searchForm !: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
  }

  search() {
    // console.log(this.searchForm.value);
    const values = this.searchForm.value;
    const queryParams = { q: values['q'] }
    this.router.navigate(['/search'], { queryParams })
    this.searchForm.reset();
  }

  private createSearchForm(): FormGroup {
    return this.fb.group({
      q: this.fb.control<string>('', Validators.required)
    })
  }

  
}
