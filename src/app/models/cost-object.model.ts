export interface CostObject {
    id?: number;
    name: string;
    cant: number;
    code: string;
    description?: string;
    cost?: number;
    state?: boolean;
    expenses?: number;
    profitPercentage?: number;
    salesValue?: number;
    IGV?: number;
    sellingPrice?: number;
}