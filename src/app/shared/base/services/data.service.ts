import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() formData: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitFormData(data: any) {
    this.formData.emit(data);
  }
}
