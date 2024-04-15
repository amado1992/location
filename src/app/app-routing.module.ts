import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MicservEstimadorComponent } from './micserv-estimador/micserv-estimador.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { ResetUserComponent } from './manage-user/reset-user/reset-user.component';

const routes: Route[] = [ 
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MicservEstimadorComponent, canActivate: [AuthGuard]},
  //{path: 'home', component: MicservEstimadorComponent},
  {path: '_home', component: AppComponent},
  {path: 'cambiar_password', component: ResetUserComponent},
  {path: '', component: LoginComponent},
  
  {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
