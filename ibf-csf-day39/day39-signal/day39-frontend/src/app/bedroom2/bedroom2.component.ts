import { Component, inject } from '@angular/core';
import { SignalService } from '../signal.service';

@Component({
  selector: 'app-bedroom2',
  templateUrl: './bedroom2.component.html',
  styleUrl: './bedroom2.component.css'
})
export class Bedroom2Component {
  
  readonly signalSvc = inject(SignalService);
}
