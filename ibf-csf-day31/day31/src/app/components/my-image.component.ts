import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-image',
  templateUrl: './my-image.component.html',
  styleUrl: './my-image.component.css'
})
export class MyImageComponent {
  /* @Input means data comes from parent */

  @Input() imageUrl: string ='./assets/image.jpg'; //just default value, can be overwritten
  @Input() caption: string = "Sea scenery"; //just default value, can be overwritten 

  counter: number = 0;

  @Output() onFigureClicked = new Subject<String>();

  imageClicked(event: any) {
    console.log("My image component is clicked! >>>> " + <PointerEvent>event.target);
    this.counter++;
    this.onFigureClicked.next(this.caption); //means calling next event
  }
}
