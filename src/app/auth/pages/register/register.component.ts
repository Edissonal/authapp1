import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miformulario: FormGroup = this.fb.group({
    name: ['edisson', [Validators.required, Validators.minLength(5)]],
    email: ['edisson@m.com', [Validators.required, Validators.email]],
    password:['aaaaaaaaaaaa',[Validators.required,Validators.minLength(6)]],
  });
  
  
  
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService:AuthService) { }
  

  ngOnInit(): void {
  }

  registro() {


    console.log(this.miformulario.value);
    const { name, email, password } = this.miformulario.value;
    this.authService.registro(name, email, password)
      .subscribe(res => {
        
        console.log(res);
        if (res === true) {
          this.router.navigateByUrl('/dasboard'); 
         } else{
           //error mensaje
           Swal.fire('Error', res, 'error');
         }
      });
    this.router.navigateByUrl('/dasboard');
  }

  
}
