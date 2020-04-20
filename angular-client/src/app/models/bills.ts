export default interface Bills {
    id?: number;
    userId: number;
    purchaseName: string;
    quantity: number;
    cost: number;
    billDate: Date;
    location: string;
    user?: any;
}