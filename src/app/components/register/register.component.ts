import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  // Programmatic Navigation in ts
  private readonly _Router = inject(Router);

  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess:boolean = false;


  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null,],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },{validators:[this.confirmPassword]});

  // registerForm:FormGroup=this._FormBuilder.group({ 
  //   name:this._FormBuilder.control(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email:this._FormBuilder.control(null,[Validators.required, Validators.email]),
  //   password:this._FormBuilder.control(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword:this._FormBuilder.control(null,),
  //   phone:this._FormBuilder.control(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  //  },{validators:[this.confirmPassword]});

  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),

  //   email: new FormControl(null, [Validators.required, Validators.email]),

  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  //   // rePassword: new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),

  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // }, this.confirmPassword);


  // service called form builder

  ngOnInit(): void {
    // console.log(this.registerForm);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegisterform(this.registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.isLoading = false;
        if(res.message==="success")
        {
         this.msgSuccess=true;
         setTimeout(() => {
          this._Router.navigate(['/login']);
         },4000)
        }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
          // console.log(err);
        }
      })
      // console.log(this.registerForm);
    }
    // else
    else if (this.registerForm.invalid)
    {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }

  }

  // TODO: custom validation function
  //  ? costume validation
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

}
