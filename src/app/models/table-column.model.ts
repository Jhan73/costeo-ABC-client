import { TemplateRef } from "@angular/core";
import { INPUT_TYPE } from "../enums/input_type.enum";

export interface TableColumn {
    def: string;
    title: string;
    dataKey: string;
    dataType?: 'date' | 'object';
    format?: string;
    controlType?: INPUT_TYPE;
    data?: any[];
    templateForEdit?: TemplateRef<any>;
}
