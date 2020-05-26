import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TareaComponent} from './components/tarea/tarea.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"tarea",component:TareaComponent},
  {path:"recuperar",component:RecuperarComponent},
  {path:"registro",component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
