import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { CacheUsuario } from './../../cache/cache-usuario';
import { UsuariosService } from './../../services/usuarios.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  status;
  correo;
  password;

  constructor(
    private usuariosService:UsuariosService,
    private router:Router,
    private appComponent:AppComponent,
  ) {
    this.status=true;
   }

   

  ngOnInit() {
  }

  async onLogin(){

    let isEmailAvailable = await this.usuariosService.isEmailAvailable(this.correo);
    if(isEmailAvailable){
      alert('No existe ninguna cuenta asociada a este correo');
      return;
    }

    this.usuariosService.signIn(this.correo,this.password)
    .then(result => {
      let uid = result.user.uid;

      this.usuariosService.getCurrentUser(uid)
      .subscribe(user => {
        CacheUsuario.usuario = user;
        this.appComponent.status='success';
      });

    })
    .catch(error => {
      if(error.code == 'auth/wrong-password')
        alert('Contraseña incorrecta');
    });

  }

}
