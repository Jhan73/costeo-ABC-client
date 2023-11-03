export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    salary: number;
    hireDate: Date;
    status: string;
    hoursWorked: number;
    directLaborId?: number;
    directLabor: string;
}