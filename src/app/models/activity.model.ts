export interface Activity {
    id: number;
    code: string;//eliminar
    name: string;
    cost?: number;
    description: string;
    costCenterId?: number;
    costCenter?: string;
}