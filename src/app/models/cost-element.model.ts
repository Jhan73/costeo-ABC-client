export interface CostElement {
    id: number;
    name: string;
    description?: string;
    type: string;
    unitCost: number;
    unitOfMeasure: string;
    state?: boolean;
}