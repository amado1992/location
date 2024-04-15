import { Component, OnInit } from '@angular/core';
import {Usuario} from '../interfaces/usuario';
import {Router} from '@angular/router';
import { MapService } from '../services/map.service';
import { NotifyService } from 'ngx-notify';
import { LostPasswordComponent } from '../manage-user/lost-password/lost-password.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    alias: '',
    pass: ''
  };
  visible_usuar = false;
  visible_pass = false;
  constructor(private route: Router, private mapService: MapService, private _ns: NotifyService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.usuario = {
      alias: '',
      pass: ''
    };
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioInfoRol')

    this._login()
  }

  /*login () {
    localStorage.removeItem('usuario');
    this.visible_usuar = false;
    this.visible_pass = false;
    if (this.usuario.alias === '' || this.usuario.pass === ''){
      if (this.usuario.alias === '') {
        this.visible_usuar =  true;
      }
      if (this.usuario.pass === '') {
        this.visible_pass =  true;
      }
      return;
    }
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
   this.mapService.sendMessage(this.usuario.alias)
    this.route.navigateByUrl('/home');
  }*/

  login () {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioInfoRol')
    this.visible_usuar = false;
    this.visible_pass = false;
    if (this.usuario.alias === '' || this.usuario.pass === ''){
      if (this.usuario.alias === '') {
        this.visible_usuar =  true;
      }
      if (this.usuario.pass === '') {
        this.visible_pass =  true;
      }
      return;
    }

    this.mapService.login(this.usuario).subscribe((next: any) => {
      console.log("Mi login 111 ", next.val_usuario)
      //if (next.val_usuario == 1 || next.val_usuario == 2){
        if (next == 1 || next == 2){
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        localStorage.setItem('usuarioInfoRol', JSON.stringify(next));
        
        //localStorage.setItem('usuarioInfoRol', JSON.stringify(next.val_usuario));
        //localStorage.setItem('tokenApk2Ubic', next.access_token)
        
        this.mapService.sendMessage(this.usuario.alias)
        this.route.navigateByUrl('/home');
      }else {
      this._ns.error(JSON.stringify(next), '', { timeout: 2000 });
      }

    })
    
  }

  _login() {
    this.mapService.login(this.usuario).subscribe(next => {
    })
  }

  lostPassword() {

    const initialState = {
      objUser: {},
      idUser: 1,
      id: 1
    };

    this.modalService.show(LostPasswordComponent, { class: 'modal-md', initialState });
  }
}
