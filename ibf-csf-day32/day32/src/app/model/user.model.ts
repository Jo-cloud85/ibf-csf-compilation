export class User {
    /* Using ! means I don't need a default value, using ? means this field is optional */

    firstName!: string;
    lastName!: string;
    email!: string;
    food!: string[];

    constructor (
        firstName: string,
        lastName: string,
        email: string,
        food: string[]
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.food = food;
    }
}