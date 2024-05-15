export class Item {
    constructor(
        public itemName?: string, 
        public itemImgPath?: string, 
        public itemQty?: number,
        public itemOrderDate?: Date,
        public itemId?: string
    ) {}
}