import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    usuario: [ localStorage.getItem('usuario') || '', Validators.required ],
    password: [ '', Validators.required ],
    remember: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

  login() {
    this.usuarioService.login( this.loginForm.value )
        .subscribe( resp =>{
          console.log(resp);

          if( this.loginForm.get('remember').value ){
            localStorage.setItem('usuario', this.loginForm.get('usuario').value);
          } else {
            localStorage.removeItem('usuario');
          }

          // validado el token todo bien y redireccionando al dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          // error al registrar enviado desde el backend
          Swal.fire('Error', err.error.mensaje, 'error');
        });

  }

}
