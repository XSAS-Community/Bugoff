import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  correo;

  constructor(
    private usuariosService:UsuariosService,
  ) { }

  ngOnInit() {
  }

  async onRecuperar(){

    let isEmailAvailable = await this.usuariosService.isEmailAvailable(this.correo);
    if(isEmailAvailable){
      alert('No existe ninguna cuenta vinculada a este correo');
      return;
    }

    this.usuariosService.recoverPass(this.correo)
    .then(response =>{
      alert('Se ha enviado un correo a su cuenta para restablecer su contraseña');
    })
    .catch(error =>{
      console.log(error);
    });
  }
}
