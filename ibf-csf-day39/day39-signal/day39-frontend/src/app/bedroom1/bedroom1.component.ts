import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-bedroom1',
  templateUrl: './bedroom1.component.html',
  styleUrl: './bedroom1.component.css'
})
export class Bedroom1Component implements OnInit {

  //counter: WritableSignal<number> = signal(0);

  readonly signalSvc = inject(SignalService);

  ngOnInit(): void {

  }

  increase(): void {
    // Method 1 - using WritableSignal
    // this.counter.set(this.counter() + 1)

    // Method 2 - using WritableSignal
    // this.counter.update(cnt => cnt + 1);

    // Method 3 - using SignalService (the one we created)
    this.signalSvc.updateCounter();
  }
}
