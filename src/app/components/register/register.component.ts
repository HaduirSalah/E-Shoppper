import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),

    email: new FormControl(null, [Validators.required, Validators.email]),

    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

    // rePassword: new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),

    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPassword);

  ngOnInit(): void {
    console.log(this.registerForm);

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterform(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
          console.log(err);
        }
      })
      console.log(this.registerForm);
    }

  }

  // TODO: custom validation function
  // hamada ==> RegisterForm
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

}
