import { Component } from '@angular/core';
import { Item } from './shared/item.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	Items: Item[] = [
		new Item('Shoe 1', 'assets/img/shoe1.jpeg', 1),
		new Item('Shoe 2', 'assets/img/shoe2.jpeg', 1),
		new Item('Shoe 3', 'assets/img/shoe3.jpeg', 1),
		new Item('Shoe 4', 'assets/img/shoe4.jpeg', 1)
	]

	cartItems = [];

	addToCart(item: Item) {
		const existingItem = this.cartItems.find(cartItem => cartItem.itemName === item.itemName);
		if (existingItem) {
			existingItem.itemQty++;
		} else {
			this.cartItems.push({ ...item, itemQty: 1 });
		}
	}

	removeFromCart(item: Item) {
		this.cartItems = this.cartItems.filter(cartItem => cartItem.itemName !== item.itemName);
	}
}
