import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { nonWhiteSpace, unhealthyFoodCheck } from '../custom-validator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userForm!: FormGroup;
  foodArray!: FormArray;


  user: User = new User('', '', '', []);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.foodArray = this.formBuilder.array([]);
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3), nonWhiteSpace]),
      lastName: this.formBuilder.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control<string>('', [Validators.required, Validators.email]),
      foodList: this.foodArray
    })
  }

  processUserForm(): void {
    console.log(this.userForm.value);
    let formData = this.printFormGroupValue(this.userForm); // See below for printFormGroupValue method
    alert(formData);
    this.foodArray.clear(); // you have to clear the array manually
    this.userForm.reset();
  }

  addNewFood(): void {
    // Method 1
    const foodItemControl = this.formBuilder.group({
      f1: this.formBuilder.control<string>('', [Validators.required], unhealthyFoodCheck)
    })
    this.foodArray.push(foodItemControl);

    // Method 2
    // const control = new FormControl(null, Validators.required);
    // (<FormArray>this.userForm.get('food')).push(control);
  }

  // If you use Method 2
  // getControls() {
  //   return (<FormArray>this.userForm.get('food')).controls;
  // }

  removeFood(i: number) {
    this.foodArray.removeAt(i);
  }

  // Just a helper method for printing data
  printFormGroupValue(formGroup: FormGroup | FormArray): string {
    let formData = "";
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control !== null) {
        if (control instanceof FormGroup || control instanceof FormArray) {
          formData += `${key}: \n${this.printFormGroupValue(control)}\n`;
        } else {
            formData += `${key}: ${control.value}\n`;
        }
      }
    });
    return formData;
  }
}
