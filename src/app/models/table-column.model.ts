import { TemplateRef } from "@angular/core";

export interface TableColumn {
    def: string;
    title: string;
    dataKey: string;
    dataType?: 'date' | 'object';
    format?: string;
    data?: any[];
    templateForEdit?: TemplateRef<any>;
}
