import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  // use @Input because you want to get the data, item of Items array via *ngFor, from outside/parent
  @Input() item: Item = new Item(); //in strict mode, you have to initialize

  // use @Output because you want the data here, which is addToCart, to be accessed by outside/parent
  // @Output() addToCart: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() addToCart = new Subject<Item>();

  constructor() { }

  addItemToCart(item: Item) {
    this.addToCart.next(item);
  }
}
