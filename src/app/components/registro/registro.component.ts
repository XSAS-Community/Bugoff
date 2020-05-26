import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  correo:string;
  nombre:string;
  apellidos:string;
  password:string;
  cpassword:string;

  constructor(
    private usuariosService:UsuariosService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  async onRegister(){

    if(this.password != this.cpassword){
      alert('Las contraseñas no coinciden intente de nuevo');
      return;
    }
    let isEmailAvailable = await this.usuariosService.isEmailAvailable(this.correo);
    if(!isEmailAvailable){
      alert('Este correo electronico no está disponible');
      return;
    }
      
    let usuario:Usuario = {
      correo:this.correo,
      nombre:this.nombre,
      apellidos:this.apellidos,
      password:this.password,
    }

    this.usuariosService.registerAuthUser(this.correo,this.password)
    .then(response => {
      console.log(response.user.uid);
      usuario.uid = response.user.uid;
      this.usuariosService.addUser(usuario)
      .then(response =>{
        this.clear();
        alert('Usuario registrado con exito');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        alert('Ha ocurrido un error ' + error);
      });
    })
    .catch(error =>{
      alert('Ha ocurrido un error ' + error);
    });

  }

  clear(){
    this.correo = '';
    this.nombre = '';
    this.apellidos = '';
    this.password = '';
    this.cpassword = '';
    
  }

}
