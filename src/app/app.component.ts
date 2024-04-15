import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersComponent } from './manage-user/users.component';
import { OpenExplorerComponent } from './open-explorer/open-explorer.component';
import { SaveProjectComponent } from './save-project/save-project.component';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'novaQuality';
  modalRef: BsModalRef;
  message: string;
  bsModalRef: BsModalRef;
  userLoging: any = ""

  constructor(private modalService: BsModalService, private mapService: MapService, private route: Router) { }

  ngOnInit() {
    console.log("INIT APP")
    var user = JSON.parse(localStorage.getItem("usuario"))
    if (user) {
      this.userLoging = user.alias
    }
    this.mapService.subObservable$.subscribe((next: any) => {
      this.userLoging = next
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.openModalWithComponent()
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.mapService.sendClearMessage("no")
    this.modalRef.hide();
  }

  openModalWithComponent() {
    const initialState = {
      objProj: {},
      idProj: 0,
      id: 0
    };
    this.bsModalRef = this.modalService.show(SaveProjectComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openModalWithComponentEdit() {
    const initialState = {
      list: [],
      name: 'Guardar como',
      id: 1
    };
    this.bsModalRef = this.modalService.show(SaveProjectComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openModalWithComponentExplorer() {
    const initialState = {
      list: [],
      title: 'Abrir explorador',
    };
    this.bsModalRef = this.modalService.show(OpenExplorerComponent, { class: 'modal-lg', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  logout(){
    if (localStorage.getItem('usuario') != null && localStorage.getItem('usuarioInfoRol') != null) {

      localStorage.removeItem('usuario')
      localStorage.removeItem('usuarioInfoRol')
      this.userLoging = ""
      this.route.navigateByUrl('/login');

    } else {
      this.userLoging = ""
      this.route.navigateByUrl('/login');
    }
  }

  openUsers() {
    this.modalRef = this.modalService.show(UsersComponent, { class: 'modal-lg' });
  }
}
