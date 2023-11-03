import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  @Output() isLoged: EventEmitter<boolean> = new EventEmitter()

  constructor() { }
}
