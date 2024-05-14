import { Component, Input, Output } from '@angular/core';
import { Item } from '../item.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  // use @Input because you want to get the data, item of Items array via *ngFor, from outside/parent
  @Input() cartItem: Item = new Item(); //in strict mode, you have to initialize

  // use @Output because you want the data here, which is removeFromCart, to be accessed by outside/parent
  // @Output() removeFromCart: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() removeFromCart = new Subject<Item>();

  constructor() {}

  removeItemFromCart(item: any) {
    this.removeFromCart.next(item);
  }
}
