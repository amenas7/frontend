import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: [ '', Validators.required ],
    usuario: [ '', Validators.required ],
    password: [ '', Validators.required ],
    terminos: [ false, Validators.required ],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
      ) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ){
      return;
    }

    // registrar llamando al servicio
    this.usuarioService.crearUsuario( this.registerForm.value )
          .subscribe( resp => {
            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: 'Usuario registrado'
            })
            console.log(resp);
          }, (err) => {
            // error al registrar enviado desde el backend
            Swal.fire('Error', err.error.msg, 'error');
          });

  }

  campoNoValido( campo:string ): boolean{

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

}
