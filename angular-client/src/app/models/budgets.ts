export default interface Budgets {
    id?: number;
    userId: number;
    estimatedCost: number;
    actualCost: number;
    subscription: string;
    loan: string;
    user?: any;
}