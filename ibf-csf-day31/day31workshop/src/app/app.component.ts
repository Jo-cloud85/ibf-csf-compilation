import { Component } from '@angular/core';
import { Item } from './shared/item.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	Items: Item[] = [
		new Item('Shoe 1', 'assets/img/shoe1.jpeg', 1, new Date()),
		new Item('Shoe 2', 'assets/img/shoe2.jpeg', 1, new Date()),
		new Item('Shoe 3', 'assets/img/shoe3.jpeg', 1, new Date()),
		new Item('Shoe 4', 'assets/img/shoe4.jpeg', 1, new Date())
	]

	cartItems: Item[] = [];

	addToCart(item: Item) {
		const existingItem = this.cartItems.find(cartItem => cartItem.itemName === item.itemName);
		if (existingItem) {
			if (existingItem.itemQty !== undefined) {
				existingItem.itemQty++;
				existingItem.itemOrderDate = new Date();
			} else {
				existingItem.itemQty=1;
			}
		} else {
			const uuid: string = uuidv4().slice(0,8);
			this.cartItems.push({ ...item, itemId: uuid });
		}
	}

	removeFromCart(item: Item) {
		this.cartItems = this.cartItems.filter(cartItem => cartItem.itemName !== item.itemName);
	}
}
