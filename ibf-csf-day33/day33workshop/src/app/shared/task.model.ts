export class Task {
    constructor(
        public id: string,
        public description: string,
        public priority: string,
        public dueDate: Date,
        public completed: boolean,
        public editing?: boolean 
    ) {}
}