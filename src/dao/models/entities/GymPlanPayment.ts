export interface IGymPlanPayment {
    date: Date;
    monthAmount: number;
    endSubscription: Date;
    pricePerMonth: number;
    planDescription: string;
    isv: number,
    total: number;
    userId?:unknown;
    _id?:unknown;
}