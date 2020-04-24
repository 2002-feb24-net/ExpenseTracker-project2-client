export default interface Budgets {
    Id?: number,
    UserId: number,
    EstimatedCost: Number,
    ActualCost: Number,
    Subscription: string,
    Loan: string
}