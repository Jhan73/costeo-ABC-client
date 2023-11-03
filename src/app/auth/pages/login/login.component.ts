import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  formGroup: FormGroup = this.difineFormGroup()

  constructor (private authService: AuthService, private formBuilder: FormBuilder){
    
  }

  difineFormGroup(): FormGroup{
    return this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getErrorMessage() {
    if (this.formGroup.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formGroup.value.email.hasError('email') ? 'Not a valid email' : '';
  }

  setLonIng(){
    // this.authService.isLoged.emit(true)
  }
}
