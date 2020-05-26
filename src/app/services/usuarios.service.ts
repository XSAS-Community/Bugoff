import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable}from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private afa:AngularFireAuth,
    private afs:AngularFirestore,
  ) {}

  registerAuthUser(correo:string,password:string):Promise<any>{
    return this.afa.auth.createUserWithEmailAndPassword(correo,password);
  }

  async isEmailAvailable(correo:string){
    let methods = await this.afa.auth.fetchSignInMethodsForEmail(correo);
    console.log(methods);
    return methods.length == 0;
  }

  addUser(usuario:Usuario):Promise<void>{
    return this.afs.doc<Usuario>(`users/${usuario.uid}`).set(usuario);
  }

  recoverPass(correo:string):Promise<any>{
    return this.afa.auth.sendPasswordResetEmail(correo);
  }

  signIn(correo:string,password:string){
    return this.afa.auth.signInWithEmailAndPassword(correo,password);
  }
  
  getCurrentUser(uid:string){
    return this.afs.doc<Usuario>(`users/${uid}`).valueChanges();
  }
}
