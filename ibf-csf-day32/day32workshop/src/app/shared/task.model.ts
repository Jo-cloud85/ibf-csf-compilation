// export class Task {
//     constructor(
//         public id: number,
//         public description: string,
//         public priority: string,
//         public dueDate: Date,
//         public completed: boolean,
//         public editing?: boolean 
//     ) {}
// }
 
export interface Task {
    id: number,
    description: string,
    priority: string,
    dueDate: Date,
    completed: boolean,
    editing?: boolean 
}