import { Component } from '@angular/core';

export interface products {
	service_line: string;
	service: string;
	activity: string;
	activity_cost: number;
	service_cost: number;
} 

const ELEMENT_DATA: products[] = [
	{ service_line: 'Consultoria', service: 'Diagnóstico', activity: 'Obtener informacion', activity_cost: 3912.02, service_cost: 11020.74},
	{ service_line: 'Consultoria', service: 'Diagnóstico', activity: 'Realizar entrevista personal', activity_cost: 3182.45, service_cost: 11020.74},
	{ service_line: 'Consultoria', service: 'Diagnóstico', activity: 'Mapear procesos', activity_cost: 669.33, service_cost: 11020.74},
	{ service_line: 'Consultoria', service: 'Diagnóstico', activity: 'Generar informe', activity_cost: 3256.95, service_cost: 11020.74},
	{ service_line: 'Consultoria', service: 'Implementación con diagnostico ajeno', activity: 'Analizar el diagnóstico previo', activity_cost: 7770.68, service_cost: 25210.91},
	{ service_line: 'Consultoria', service: 'Implementación con diagnostico ajeno', activity: 'Generar plan de implementación', activity_cost: 17070.08, service_cost: 25210.91},
	{ service_line: 'Consultoria', service: 'Implementación con diagnostico ajeno', activity: 'Generar hoja de ruta', activity_cost: 370.14, service_cost: 25210.91},
];

const COLUMNS_SCHEMA = [
	{
		key: "service_line",
		type: "text",
		label: "Línea de servicio"
	},
	{
		key: "service",
		type: "text",
		label: "Servicio"
	},
	{
		key: "activity",
		type: "text",
		label: "Actividad"
	},
	{
		key: "activity_cost",
		type: "number",
		label: "Costo/Actividad"
	},
	{
		key: "service_cost",
		type: "number",
		label: "Costo/Servicio"
	}
]

@Component({
    selector: 'app-table-prod-act',
    templateUrl: './table-prod-act.component.html',
    styleUrls: ['./table-prod-act.component.scss']
})



export class TableProdActComponent {
    displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
    dataSource : any = ELEMENT_DATA;
	headers : string[] = COLUMNS_SCHEMA.map(col => col.label);
}

export interface Element {
    service_line: string;
    service: string;
    activity: string;
    cost_activity: string;
    cost_service: string
}



