  
export default interface Budgets {
    id?: number,
    userId:number,
    estimatedCost:number,
    actualCost:number,
    subscription:string,
    loans:string,
    users?:any,
}