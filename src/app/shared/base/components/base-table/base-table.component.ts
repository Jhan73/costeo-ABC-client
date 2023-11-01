import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TABLE_ACTION } from 'src/app/enums/table-action.enum';
import { TableAction } from 'src/app/models/table-action.model';
import { TableColumn } from 'src/app/models/table-column.model';
import { TableConfig } from 'src/app/models/table-config.model';
import { MatDialog } from '@angular/material/dialog'
import { BaseFormModalComponent } from '../base-form-modal/base-form-modal.component';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})

export class BaseTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  tableConfig?: TableConfig;
  curretFilterValue: string = ''
  currentRowIndex: number | undefined;
  formGroup: FormGroup

  @Input() set data(data: Array<any>) {//==== si se quiere filtrar
    this.dataSource.data = data;
  }

  @Input() set columns(columns: TableColumn[]){
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map(col => col.def)
  }
  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }
  @Input() rowFormGroup!: (item: any) => FormGroup
  @Input() isLoading: boolean = false
  @Input() newRow: any
  @Input() formId: number = 0

  @Output() action: EventEmitter<TableAction> = new EventEmitter();

  @Output() statusRowForm = new EventEmitter<string>();
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matDialog: MatDialog){
    this.formGroup = new FormGroup({});

  }


  ngOnInit(): void {
    if(this.formId === 0){
      // this.onCreate()
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setConfig(config: TableConfig){
    this.tableConfig = config;
    if(this.tableConfig.showAction){
      this.displayedColumns.push('actions')
    }
  }

  onEdit(row: any, index: number){
    this.currentRowIndex = index;
    this.statusRowForm.emit(this.formGroup.status)
    this.action.emit({action: TABLE_ACTION.EDIT, row, rowIndex: index})// === sin edit
    // this.formGroup = this.rowFormGroup(row);
  }

  onDelete(row: any, index: number){
    this.action.emit({action: TABLE_ACTION.DELETE, row, rowIndex: index})// === sin edit
  }

  onCancel(){
    this.currentRowIndex = undefined;
    this.statusRowForm.emit('VALID');
  }

  onSave(index: number, row?: any ){
    if(this.formGroup.status == "VALID"){
      this.currentRowIndex = undefined;
      const editRow = this.formGroup.value
      this.statusRowForm.emit(this.formGroup.status)
      this.action.emit({action: TABLE_ACTION.SAVE, row: editRow, rowIndex: index})
    } else {
      console.log('🤷‍♂️', 'Formulario invalido')
    }
  }
  onCreate(){
    // this.action.emit({action: TABLE_ACTION.CREATE})
    // this.onEdit(this.dataSource.data[this.dataSource.data.length-1],this.dataSource.data.length-1)
    // this.statusRowForm.emit(this.formGroup.status)
  }
  
  openDialog(){
    this.matDialog.open(BaseFormModalComponent, {
      width: '350px',
      height: '400px'
    })

  }

  //=== Aplicar filtro ====
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.curretFilterValue = filterValue
  }
}
