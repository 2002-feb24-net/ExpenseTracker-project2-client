export default interface Subscriptions {
    id?: number;
    userId: number;
    company: string;
    subscriptionName: string;
    subscriptionMonthCost: number;
    subscriptionDate?: Date;
    subscriptionDueDate?: Date;
    notification: boolean;
    user?: any;
}

