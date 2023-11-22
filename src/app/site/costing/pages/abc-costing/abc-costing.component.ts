import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { CostObject } from 'src/app/models/cost-object.model';
import { Inductor } from 'src/app/models/inductor.model';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { DataService } from 'src/app/shared/base/services/data.service';

export interface Activity { name: string, cost: number, inductor: string, cant: number[], total: number }

@Component({
  selector: 'app-abc-costing',
  templateUrl: './abc-costing.component.html',
  styleUrls: ['./abc-costing.component.scss']
})
export class AbcCostingComponent {
  indexEditing: number = -1
  tableConfig: TableConfig = {
    showAction: true,
    showFilter: false,
    showPaginator: false,
    showAddButton: false,
  }

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dataService: DataService) {
    // this.indirectCostElementFormGroup = new FormGroup ({})
    this.calcular()
    this.setColumsIndirectCostElement()
    this.setColumsDirectLabor()
    this.setColumsDirectRawMaterial()
    this.setColumsDirectService()
  }

  directCostElementFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });
  directRawFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });
  fourthFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });

  ngOnInit(): void {
    this.setColumsCostObject()
    this.isLoadingTable = false

  }
  ngOnChange(){

  }
  //==================================================================
  //..........................  Objeto de costo ......................
  //==================================================================

  costObjectTableColumns: TableColumn[] = [];
  isCostObtectUpdate: boolean = false
  costObjectButtonText: string = 'Agregar'
  costObjectFormGroup: FormGroup = this.defineCostObjectFormGroup()
  costObjectDataSource: Array<CostObject> = [
    { code: 'KA', cant: 900, name: 'Kayak Amateur', description: 'Kayak Amateur' },
    { code: 'KC', cant: 100, name: 'Kayak de Competencia', description: 'Kayak de Competencia' },
  ];

  showTableIndirectElements: boolean = true

  isLoadingTable: boolean = true
  statusTableRowFrom: string = 'INVALID'


  defineCostObjectFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: ['', Validators.required],
      cant: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    })
  }

  setColumsCostObject() {
    this.costObjectTableColumns = [
      { def: 'code', title: 'Codigo', dataKey: 'code' },
      { def: 'name', title: 'Objeto de costo', dataKey: 'name' },
      { def: 'cant', title: 'Cantidad', dataKey: 'cant' },
      { def: 'description', title: 'Descripción', dataKey: 'description' },
    ]
  }
  onTableActionCostObject(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined) {
          this.onEditRowCostObject(tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRowCostObject(tableAction.rowIndex)
        }
        break;
    }
  }
  onEditRowCostObject(costObject: CostObject, index: number) {
    this.isCostObtectUpdate = true
    this.costObjectButtonText = 'Actualizar'
    this.indexEditing = index
    this.costObjectFormGroup.patchValue({
      code: costObject.code,
      name: costObject.name,
      cant: costObject.cant,
      description: costObject.description,
    })
  }
  onSaveCostObject() {
    if (this.isCostObtectUpdate) {
      this.costObjectDataSource[this.indexEditing] = this.costObjectFormGroup.value
      this.isCostObtectUpdate = false
      this.costObjectButtonText = "Agregar"
    } else {
      this.costObjectDataSource.push(this.costObjectFormGroup.value)
    }
    this.costObjectDataSource = this.costObjectDataSource.map(item => item)
    this.setColumsIndirectCostElement()
    this.costObjectFormGroup.reset()
    this.indirectCostElementFormGroup = this.defineIndirectCostElementFormGroup()
  }
  onDeleteRowCostObject(index: number) {
    this.costObjectDataSource.splice(index, 1)
    this.costObjectDataSource = this.costObjectDataSource.map(item => item)
    this.openSnackBar('Objeto de costo eliminado', 'Cerrar')
  }
  //==================================================================
  //.........  Elementos de costeo Directo - Ditect labor  ...........
  //==================================================================
  
  directLabors: any[] = [
    { labor: 'Mecanico', cost: 25000, criterioReparto: 'Pie2', KA: 6000, KC:1000, total: 7000 },
    { labor: 'Poseer equipo', cost: 25000, criterioReparto: 'Hr-Maq', KA:3400, KC: 600, total: 4000 },
    { labor: 'Ordenar mat', cost: 15000, criterioReparto: '# Ordenes', KA:200, KC: 100, total: 300 },
    { labor: 'Control calid', cost: 10000, criterioReparto: '# Inspec', KA:300, KC: 150, total: 450 },
    { labor: 'Realizar mant', cost: 10000, criterioReparto: 'Pie2', KA:6000, KC: 1000, total: 7000 },
    { labor: 'Prepar planos', cost: 20000, criterioReparto: '# Preparac', KA:20, KC: 40, total: 60 },
    { labor: 'Superv pers', cost: 30000, criterioReparto: 'Cto MOD', KA:90000, KC: 10000, total: 100000 },
  ]

  directLaborTableColumns: TableColumn[] = [];
  isDirectLaborUpdate: boolean = false
  directLaborButtonText: string = 'Agregar'
  directLaborFormGroup: FormGroup = this.defineDirectLaborFormGroup()
  directLaborDataSource: Array<Activity> = this.directLabors
  showTableDirectLabors: boolean = true
  // isLoadingTable: boolean = true
  // statusTableRowFrom: string = 'INVALID'


  defineDirectLaborFormGroup(): FormGroup {
    const groupControls: {[key: string]: AbstractControl} = {
      labor: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      criterioReparto: new FormControl('', Validators.required),
    }
    this.costObjectDataSource.forEach((costObject) => {
      groupControls[costObject.code] = new FormControl('', Validators.required)
    })
    return this.formBuilder.group(groupControls)
  }

  setColumsDirectLabor() {
    this.directLaborTableColumns = [
      { def: 'labor', title: 'Mano de Obra', dataKey: 'labor' },
      { def: 'cost', title: 'Costo', dataKey: 'cost' },
      { def: 'criterioReparto', title: 'Criterio de reparto', dataKey: 'criterioReparto' },
    ]
    this.costObjectDataSource.forEach(item => {
      let costObjectColumn: TableColumn = {def: item.code, title: item.name, dataKey: item.code}
      this.directLaborTableColumns.push(costObjectColumn)
    })
  }
  onTableActionDirectLabor(tableAction: TableAction) {
    console.log('🙇‍♂️', tableAction.row)
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined) {
          this.onEditRowDirectLabor(tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRowDirectLabor(tableAction.rowIndex)
        }
        break;
    }
  }
  onEditRowDirectLabor(directLabor: any, index: number) {
    this.isDirectLaborUpdate = true
    this.directLaborButtonText = 'Actualizar'
    this.indexEditing = index
    this.directLaborFormGroup.patchValue({
      labor: directLabor.labor,
      cost: directLabor.cost,
      criterioReparto: directLabor.criterioReparto
    })
    const dynamicControls = this.costObjectDataSource.map(item => item.code);
    dynamicControls.forEach(code => {
      if (this.directLaborFormGroup.contains(code)) {
        this.directLaborFormGroup.get(code)!.setValue(directLabor[code]);
      } else {
        this.directLaborFormGroup.addControl(code, this.formBuilder.control(directLabor[code], Validators.required));
      }
    });
  }
  onSaveDirectLabor() {
    if (this.isDirectLaborUpdate) {
      this.directLaborDataSource[this.indexEditing] = this.directLaborFormGroup.value
    } else {
      this.directLaborDataSource.push(this.directLaborFormGroup.value)
    }
    console.log('🙄', this.directLaborFormGroup.value)
    this.directLaborDataSource = this.directLaborDataSource.map(item => item)
    this.directLaborFormGroup.reset()
  }
  onDeleteRowDirectLabor(index: number) {
    this.directLaborDataSource.splice(index, 1)
    this.directLaborDataSource = this.directLaborDataSource.map(item => item)
    console.log('👩‍🦱', index)
    this.openSnackBar('Mano de obra directa eliminado', 'Cerrar')
  }
  showTableDirectLabor(){
    this.showTableDirectLabors = !this.showTableDirectLabors
    // this.showTableIndirectElements = !this.showTableIndirectElements
  }

  //==================================================================
  //......  Elementos de costeo Directo - Ditect Raw Material  .......
  //==================================================================
  
  directRawMaterials: any[] = [
    { material: 'Madera', cost: 25000, criterioReparto: 'Pie2', KA: 6000, KC:1000, total: 7000 },
    { material: 'Poseer equipo', cost: 25000, criterioReparto: 'Hr-Maq', KA:3400, KC: 600, total: 4000 },
    { material: 'Ordenar mat', cost: 15000, criterioReparto: '# Ordenes', KA:200, KC: 100, total: 300 },
    { material: 'Control calid', cost: 10000, criterioReparto: '# Inspec', KA:300, KC: 150, total: 450 },
    { material: 'Realizar mant', cost: 10000, criterioReparto: 'Pie2', KA:6000, KC: 1000, total: 7000 },
    { material: 'Prepar planos', cost: 20000, criterioReparto: '# Preparac', KA:20, KC: 40, total: 60 },
    { material: 'Superv pers', cost: 30000, criterioReparto: 'Cto MOD', KA:90000, KC: 10000, total: 100000 },
  ]

  directRawMaterialTableColumns: TableColumn[] = [];
  isDirectRawMaterialUpdate: boolean = false
  directRawMaterialButtonText: string = 'Agregar'
  directRawMaterialFormGroup: FormGroup = this.defineDirectRawMaterialFormGroup()
  directRawMaterialDataSource: Array<Activity> = this.directRawMaterials
  showTableDirectRawMaterials: boolean = true
  // isLoadingTable: boolean = true
  // statusTableRowFrom: string = 'INVALID'


  defineDirectRawMaterialFormGroup(): FormGroup {
    const groupControls: {[key: string]: AbstractControl} = {
      material: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      criterioReparto: new FormControl('', Validators.required),
    }
    this.costObjectDataSource.forEach((costObject) => {
      groupControls[costObject.code] = new FormControl('', Validators.required)
    })
    return this.formBuilder.group(groupControls)
  }

  setColumsDirectRawMaterial() {
    this.directRawMaterialTableColumns = [
      { def: 'material', title: 'Materia Prima', dataKey: 'material' },
      { def: 'cost', title: 'Costo', dataKey: 'cost' },
      { def: 'criterioReparto', title: 'Criterio de reparto', dataKey: 'criterioReparto' },
    ]
    this.costObjectDataSource.forEach(item => {
      let costObjectColumn: TableColumn = {def: item.code, title: item.name, dataKey: item.code}
      this.directRawMaterialTableColumns.push(costObjectColumn)
    })
  }
  onTableActionDirectRawMaterial(tableAction: TableAction) {
    console.log('🙇‍♂️', tableAction.row)
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined) {
          this.onEditRowDirectRawMaterial(tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRowDirectRawMaterial(tableAction.rowIndex)
        }
        break;
    }
  }
  onEditRowDirectRawMaterial(directRawMaterial: any, index: number) {
    this.isDirectRawMaterialUpdate = true
    this.directRawMaterialButtonText = 'Actualizar'
    this.indexEditing = index
    this.directRawMaterialFormGroup.patchValue({
      material: directRawMaterial.material,
      cost: directRawMaterial.cost,
      criterioReparto: directRawMaterial.criterioReparto
    })
    const dynamicControls = this.costObjectDataSource.map(item => item.code);
    dynamicControls.forEach(code => {
      if (this.directRawMaterialFormGroup.contains(code)) {
        this.directRawMaterialFormGroup.get(code)!.setValue(directRawMaterial[code]);
      } else {
        this.directRawMaterialFormGroup.addControl(code, this.formBuilder.control(directRawMaterial[code], Validators.required));
      }
    });
  }
  onSaveDirectRawMaterial() {
    if (this.isDirectRawMaterialUpdate) {
      this.directRawMaterialDataSource[this.indexEditing] = this.directRawMaterialFormGroup.value
    } else {
      this.directRawMaterialDataSource.push(this.directRawMaterialFormGroup.value)
    }
    console.log('🙄', this.directRawMaterialFormGroup.value)
    this.directRawMaterialDataSource = this.directRawMaterialDataSource.map(item => item)
    this.directRawMaterialFormGroup.reset()
  }
  onDeleteRowDirectRawMaterial(index: number) {
    this.directRawMaterialDataSource.splice(index, 1)
    this.directRawMaterialDataSource = this.directRawMaterialDataSource.map(item => item)
    console.log('👩‍🦱', index)
    this.openSnackBar('Mano de obra directa eliminado', 'Cerrar')
  }
  showTableDirectRawMaterial(){
    this.showTableDirectRawMaterials = !this.showTableDirectRawMaterials
    // this.showTableIndirectElements = !this.showTableIndirectElements
  }
  //==================================================================
  //........  Elementos de costeo Directo - Ditect Service  ..........
  //==================================================================
  
  directServices: any[] = [
    { service: 'Mantenimiento', cost: 25000, criterioReparto: 'Pie2', KA: 6000, KC:1000, total: 7000 },
    { service: 'Poseer equipo', cost: 25000, criterioReparto: 'Hr-Maq', KA:3400, KC: 600, total: 4000 },
    { service: 'Ordenar mat', cost: 15000, criterioReparto: '# Ordenes', KA:200, KC: 100, total: 300 },
    { service: 'Control calid', cost: 10000, criterioReparto: '# Inspec', KA:300, KC: 150, total: 450 },
    { service: 'Realizar mant', cost: 10000, criterioReparto: 'Pie2', KA:6000, KC: 1000, total: 7000 },
    { service: 'Prepar planos', cost: 20000, criterioReparto: '# Preparac', KA:20, KC: 40, total: 60 },
    { service: 'Superv pers', cost: 30000, criterioReparto: 'Cto MOD', KA:90000, KC: 10000, total: 100000 },
  ]

  directServiceTableColumns: TableColumn[] = [];
  isDirectServiceUpdate: boolean = false
  directServiceButtonText: string = 'Agregar'
  directServiceFormGroup: FormGroup = this.defineDirectServiceFormGroup()
  directServiceDataSource: Array<Activity> = this.directServices
  showTableDirectServices: boolean = true
  // isLoadingTable: boolean = true
  // statusTableRowFrom: string = 'INVALID'


  defineDirectServiceFormGroup(): FormGroup {
    const groupControls: {[key: string]: AbstractControl} = {
      service: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      criterioReparto: new FormControl('', Validators.required),
    }
    this.costObjectDataSource.forEach((costObject) => {
      groupControls[costObject.code] = new FormControl('', Validators.required)
    })
    return this.formBuilder.group(groupControls)
  }

  setColumsDirectService() {
    this.directServiceTableColumns = [
      { def: 'service', title: 'Materia Prima', dataKey: 'service' },
      { def: 'cost', title: 'Costo', dataKey: 'cost' },
      { def: 'criterioReparto', title: 'Criterio de reparto', dataKey: 'criterioReparto' },
    ]
    this.costObjectDataSource.forEach(item => {
      let costObjectColumn: TableColumn = {def: item.code, title: item.name, dataKey: item.code}
      this.directServiceTableColumns.push(costObjectColumn)
    })
  }
  onTableActionDirectService(tableAction: TableAction) {
    console.log('🙇‍♂️', tableAction.row)
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined) {
          this.onEditRowDirectService(tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRowDirectService(tableAction.rowIndex)
        }
        break;
    }
  }
  onEditRowDirectService(directService: any, index: number) {
    this.isDirectServiceUpdate = true
    this.directServiceButtonText = 'Actualizar'
    this.indexEditing = index
    this.directServiceFormGroup.patchValue({
      service: directService.service,
      cost: directService.cost,
      criterioReparto: directService.criterioReparto
    })
    const dynamicControls = this.costObjectDataSource.map(item => item.code);
    dynamicControls.forEach(code => {
      if (this.directServiceFormGroup.contains(code)) {
        this.directServiceFormGroup.get(code)!.setValue(directService[code]);
      } else {
        this.directServiceFormGroup.addControl(code, this.formBuilder.control(directService[code], Validators.required));
      }
    });
  }
  onSaveDirectService() {
    if (this.isDirectServiceUpdate) {
      this.directServiceDataSource[this.indexEditing] = this.directServiceFormGroup.value
    } else {
      this.directServiceDataSource.push(this.directServiceFormGroup.value)
    }
    console.log('🙄', this.directServiceFormGroup.value)
    this.directServiceDataSource = this.directServiceDataSource.map(item => item)
    this.directServiceFormGroup.reset()
  }
  onDeleteRowDirectService(index: number) {
    this.directServiceDataSource.splice(index, 1)
    this.directServiceDataSource = this.directServiceDataSource.map(item => item)
    console.log('👩‍🦱', index)
    this.openSnackBar('Servicio eliminado', 'Cerrar')
  }
  showTableDirectService(){
    this.showTableDirectServices = !this.showTableDirectServices
    // this.showTableIndirectElements = !this.showTableIndirectElements
  }

  //==================================================================
  //................  Elementos de costeo Indirecto  .................
  //==================================================================

  activities: any[] = [
    { activity: 'Poseer efificio', cost: 25000, inductor: 'Pie2', KA: 6000, KC:1000, total: 7000 },
    { activity: 'Poseer equipo', cost: 25000, inductor: 'Hr-Maq', KA:3400, KC: 600, total: 4000 },
    { activity: 'Ordenar mat', cost: 15000, inductor: '# Ordenes', KA:200, KC: 100, total: 300 },
    { activity: 'Control calid', cost: 10000, inductor: '# Inspec', KA:300, KC: 150, total: 450 },
    { activity: 'Realizar mant', cost: 10000, inductor: 'Pie2', KA:6000, KC: 1000, total: 7000 },
    { activity: 'Prepar planos', cost: 20000, inductor: '# Preparac', KA:20, KC: 40, total: 60 },
    { activity: 'Superv pers', cost: 30000, inductor: 'Cto MOD', KA:90000, KC: 10000, total: 100000 },
  ]

  indirectCostElementsFormGroup: FormGroup = this.formBuilder.group({ secondCtrl: [''] });
  indirectCostElementTableColumns: TableColumn[] = [];
  isIndirectCostElementUpdate: boolean = false
  indirectCostElementButtonText: string = 'Agregar'
  indirectCostElementFormGroup: FormGroup = this.defineIndirectCostElementFormGroup()
  indirectCostElementDataSource: Array<Activity> = this.activities
  inductors: Array<Inductor> = [
    { code: 'Pie2', name: 'Pie 2' },
    { code: 'Hr-Maq', name: 'Hr Maquina' },
    { code: '# Ordenes', name: '# Ordenes' },
    { code: '# Inspec', name: '# Inspecciones' },
    { code: '# Preparac', name: '# Preparaciones' },
    { code: 'Cto MOD', name: 'Cto MOD' },
  ]
  // isLoadingTable: boolean = true
  // statusTableRowFrom: string = 'INVALID'


  defineIndirectCostElementFormGroup(): FormGroup {
    const groupControls: {[key: string]: AbstractControl} = {
      activity: new FormControl('', Validators.required),
      cost: new FormControl ('', Validators.required),
      inductor: new FormControl ('', Validators.required),
      // cant: new FormControl ('', Validators.required),
    }
    this.costObjectDataSource.forEach((costObject) => {
      groupControls[costObject.code] = new FormControl('', Validators.required)
    })
    return this.formBuilder.group(groupControls)
  }

  setColumsIndirectCostElement() {
    this.indirectCostElementTableColumns = [
      { def: 'activity', title: 'Actividad', dataKey: 'activity' },
      { def: 'cost', title: 'Costo', dataKey: 'cost' },
      { def: 'inductor', title: 'Inductor', dataKey: 'inductor' },
    ]
    this.costObjectDataSource.forEach(item => {
      let costObjectColumn: TableColumn = {def: item.code, title: item.name, dataKey: item.code}
      this.indirectCostElementTableColumns.push(costObjectColumn)
    })
  }
  onTableActionIndirectCostElement(tableAction: TableAction) {
    console.log('🙇‍♂️', tableAction.row)
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        if (tableAction.rowIndex != undefined) {
          this.onEditRowIndirectCostElement(tableAction.row, tableAction.rowIndex)
        }
        break;
      case TABLE_ACTION.DELETE:
        if (tableAction.rowIndex != undefined) {
          this.onDeleteRowIndirectCostElement(tableAction.rowIndex)
        }
        break;
    }
  }
  onEditRowIndirectCostElement(activity: any, index: number) {
    this.isIndirectCostElementUpdate = true
    this.indirectCostElementButtonText = 'Actualizar'
    this.indexEditing = index
    this.indirectCostElementFormGroup.patchValue({
      activity: activity.activity,
      cost: activity.cost,
      inductor: activity.inductor,
    })
    const dynamicControls = this.costObjectDataSource.map(item => item.code);
    dynamicControls.forEach(code => {
      if (this.indirectCostElementFormGroup.contains(code)) {
        this.indirectCostElementFormGroup.get(code)!.setValue(activity[code]);
      } else {
        this.indirectCostElementFormGroup.addControl(code, this.formBuilder.control(activity[code], Validators.required));
      }
    });
  }
  onSaveIndirectCostElement() {
    if (this.isIndirectCostElementUpdate) {
      this.indirectCostElementDataSource[this.indexEditing] = this.indirectCostElementFormGroup.value
    } else {
      this.indirectCostElementDataSource.push(this.indirectCostElementFormGroup.value)
    }
    console.log('🙄', this.indirectCostElementFormGroup.value)
    this.indirectCostElementDataSource = this.indirectCostElementDataSource.map(item => item)
    this.indirectCostElementFormGroup.reset()
  }
  onDeleteRowIndirectCostElement(index: number) {
    this.indirectCostElementDataSource.splice(index, 1)
    this.indirectCostElementDataSource = this.indirectCostElementDataSource.map(item => item)
    console.log('👩‍🦱', index)
    this.openSnackBar('Objeto de costo eliminado', 'Cerrar')
  }
  showTable(){
    this.showTableIndirectElements = !this.showTableIndirectElements
    // this.showTableIndirectElements = !this.showTableIndirectElements
  }

  //==================================================================
  //.................  Elementos de costeo Resumen  ..................
  //==================================================================
  ELEMENT_DATA: any[] = [
    {Concepto: "MD", KA: 150, KC: 200, total: 350},
    {Concepto: "MOD", KA: 100, KC: 100, total: 200},
    {Concepto: "CIF", KA: 112.87, KC: 334.17, total: 447.04},
    {Concepto: "Total", KA: 362.87, KC: 634.17, total: 994.04},
  ];
  displayedColumns: string[] = ['Concepto', 'KA', 'KC', 'total'];
  dataSource = this.ELEMENT_DATA;
  //==================================================================
  //............................ General  ............................
  //==================================================================
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
  calcular() {
    // let sum1 = 0
    // let sum2 = 0
    // this.activities.forEach(activity => {
    //   activity.cant[0] = (activity.cost / activity.total) * activity.cant[0];
    //   activity.cant[1] = (activity.cost / activity.total) * activity.cant[1];
    //   sum1 += activity.cant[0];
    //   sum2 += activity.cant[1];
    // });
    // console.log('🤞KA', sum1);
    // console.log('👨KC', sum2);
    // console.log('👴', this.activities)
  }
}
