import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../shared/item.model';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
    // use @Input because you want to get the data, cartItem of Items array via *ngFor, from outside/parent
    @Input() cartItem: Item = new Item();

    // use @Output because you want the data here, which is removeFromCart, to be accessed by outside/parent
    @Output() removeFromCart: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    removeItemFromCart(item: any) {
        this.removeFromCart.emit(item);
    }
}

