import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miformulario: FormGroup = this.fb.group({
    email: ['Test3@test.com', [Validators.required, Validators.email]],
    password:['123456',[Validators.required,Validators.minLength(6)]],
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private authService:AuthService) { }



  ngOnInit(): void {
  }

  login() {

    this.authService.validarToken()
      //.subscribe(console.log);
   
    console.log(this.miformulario.value);
    const { email, password } = this.miformulario.value;
    this.authService.login(email, password)
      .subscribe(ok => {
        console.log(ok);
        if (ok === true) {
         this.router.navigateByUrl('/dasboard'); 
        } else{
          //error mensaje
          Swal.fire('Error', ok, 'error');
        }
      });


   // this.router.navigateByUrl('/dasboard');
  
  }



}
