import { Component } from '@angular/core';
import { Item } from './item.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  Items: Item[] = [
		new Item('Acorn Squash', 'assets/fruits/acorn_squash.png', 1, new Date()),
		new Item('Apple', 'assets/fruits/apple.png', 1, new Date()),
		new Item('Bell Pepper', 'assets/fruits/bell_pepper.png', 1, new Date()),
		new Item('Blueberries', 'assets/fruits/blueberries.png', 1, new Date()),
    new Item('Broccoli', 'assets/fruits/broccoli.png', 1, new Date()),
    new Item('Carrot', 'assets/fruits/carrot.png', 1, new Date()),
    new Item('Celery', 'assets/fruits/celery.png', 1, new Date()),
    new Item('Chilli Pepper', 'assets/fruits/chili_pepper.png', 1, new Date()),
    new Item('Corn', 'assets/fruits/corn.png', 1, new Date()),
	]

	cartItems: Item[] = [];

	addToCart(item: Item) {
    // checking if the item exist in cartItems first
		const existingItem = this.cartItems.find(cartItem => cartItem.itemName === item.itemName);
    if (existingItem) {
      if (existingItem.itemQty !== undefined) {
        existingItem.itemQty++;
        existingItem.itemOrderDate = new Date();
      } else {
        existingItem.itemQty = 1;
      }
    } else {
      const uuid: string = uuidv4().slice(0, 8);
      this.cartItems.push({...item, itemId: uuid});
    }
    // console.log(this.cartItems);
    localStorage.setItem('My cart items', JSON.stringify(this.cartItems));
	}

	removeFromCart(item: Item) {
		this.cartItems = this.cartItems.filter(cartItem => cartItem.itemName !== item.itemName);
    localStorage.setItem('My cart items', JSON.stringify(this.cartItems));
	}

  clearCart() {
    this.cartItems.length = 0;
    localStorage.clear();
  }
}
