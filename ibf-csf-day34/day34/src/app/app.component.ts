import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, debounceTime, from, map, tap } from 'rxjs';
import { HttpService } from './http.service';
import { Customer } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  // Method 1 - must be in a class
  // constructor(private formbuilder: FormBuilder) {}

  // Method 2 -- need not be in a class
  private formbuilder = inject(FormBuilder);
  private readonly httpSrv = inject(HttpService);

  form!: FormGroup;

  sub$ !: Subscription;
  status$ !: Subscription;

  formStatus = 'INVALID';

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: this.formbuilder.control<string>('', Validators.required)
    })

    // this.form.valueChanges is an observable that emits events whenever the form's value changes.
    this.sub$ = this.form.valueChanges
      .pipe(
        debounceTime(500),
        map(value => {
          return { ...value, timestamp: new Date()}
        })
      )
      .subscribe({
        next: value => console.log('>>> form value ', value),
        error: error => console.log('>>> error', error),
        complete: () => console.log('observable closed') // You can unsubscribe here also
      })

    this.status$ = this.form.statusChanges.subscribe(
      status => this.formStatus = status
    )
  }
  
  process(){
    console.log('>>> form: ', this.form.value)

    // Using Observable
    this.sub$ = this.httpSrv.getHttpBin(this.form.value['name'])
      .subscribe({
        next: result => console.log('>>>> result ', result),
        error: error => console.log('>>>> observable error: ', error),
        complete: () => this.sub$.unsubscribe()
    })

    // Using Promise
    // this.httpSrv.getHttpBinAsPromise(this.form.value.name)
    //   .then(result => {
    //     console.log('>>>> result from promise: ', result)
    //   })
    //   .catch(error => {
    //     console.log('>>>> ERROR: ', error)
    //   })

    const cust: Customer = {
      name: this.form.value['name'],
      email: this.form.value['name'] + '@gmail.com'
    }

    // this.sub$ = this.httpSrv.postHttpBin(cust)
    //   .subscribe((result: string) => console.info('POST: ', result))

    this.httpSrv.postHttpBinAsPromise(cust)
      .then(result => console.log('POST form result: ', result))
      .catch(error => console.log('ERROR in posting form result: ', error))
    
    // Converting Promise to Observable
    from(this.httpSrv.postHttpBinAsPromise(cust))
      .subscribe({
        next: value =>  console.log('>>>>> promise to observable: ', value),
        error: value => console.log('>>>>> ERROR promise to observable: ', value),
        complete: () => console.log('>>> COMPLETED')
      })
    
    this.form.reset();
  }

  /* You can unsubscribe() here where the Subscription will get unsubscribe() upon destroying the entire component. */
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
