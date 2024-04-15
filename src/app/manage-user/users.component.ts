import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotifyService } from 'ngx-notify';
import { DataProject } from '../interfaces/api_puntos_interes';
import { SaveProjectComponent } from '../save-project/save-project.component';
import { MapService } from '../services/map.service';
import { SecCensalService } from '../services/sec-censal.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  _loggingInfoRol: any
  modalRef: BsModalRef;
  flagDeleteUpdate: boolean = false
  setting: any = {
    position: ['right', 'bottom'],
    offset: [20, 20],
    lastOnBottom: true,
    zIndex: 1031,
    minWidth: 450,
    maxWidth: 450,
  };

  objUser: any

  form = this.fb.group({

    name: [''],
    folder: [''],
    description: [''],
    comment: ['']

  });
  title: string;
  closeBtnName: string;
  list: any[] = [];
  /*users: any[] = [{
    Usuario: "daniel.hernandez@novaquality.es",
    Rol: "Admin",
    IdUsuario: 0
  }]*/

  users: any[] = [/*{
    Usuario: "",
    Rol: "",
    IdUsuario: 0
  }*/]

  config = {
    id: 'first',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  locations = [{ id: 1, description: "COSTE_MATERIALES_GARANTIA_FICHA" }, { id: 2, description: "COSTE_MATERIALES_SIN_GARANTIA_FICHA" },
  { id: 3, description: "CMF-FECHA_SERVICIO" }]

  loading: boolean = false

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
    private censService: SecCensalService, private modalService: BsModalService,
    private mapService: MapService,
    private _ns: NotifyService) { }

  ngOnInit() {
    this._loggingInfoRol = JSON.parse(localStorage.getItem('usuarioInfoRol'))
    this.mapService.subCrudUserObservable$.subscribe((next: any) => {
      this.listUsers()
    })
    this.listUsers()
  }
  save() { }

  listUsers() {
    var logging = localStorage.getItem('usuarioInfoRol')
    var userInfologging = JSON.parse(localStorage.getItem('usuario'))
    this.users = []

    this.loading = false
    this.censService.listUsers().subscribe((next: any) => {
      this.loading = true

      if (next.length > 0) {
        if (JSON.parse(logging) == 1) {
          this.users = next
          this.config.totalItems = this.users.length
        }

        if (JSON.parse(logging) == 2) {
          this.users.push(next.find(element => element.Usuario == userInfologging.alias))
          this.config.totalItems = this.users.length
        }

      }

      //this.users = next
      //this.config.totalItems = next.length

    }, (error) => {
      this.loading = true
      alert('Ha ocurrido un error al cargar el servicio listado de usuarios.');
      console.error(error);
    });
  }

  editUser(obj) {

    const initialState = {
      objUser: obj,
      idUser: 1,
      id: 1
    };

    this.bsModalRef = this.modalService.show(CreateEditUserComponent, { class: 'modal-md', initialState });
  }

  saveUser() {

    const initialState = {
      objUser: {},
      idUser: 0,
      id: 0
    };

    this.bsModalRef = this.modalService.show(CreateEditUserComponent, { class: 'modal-md', initialState });
  }

  changePassword(obj) {

    const initialState = {
      objUser: obj,
      idUser: 1,
      id: 1
    };

    this.modalService.show(ChangePasswordComponent, { class: 'modal-md', initialState });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  close() {
    this.bsModalRef.hide()
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  delete() {
    this.modalRef.hide();
    this.censService.deleteUser(this.objUser.IdUsuario).subscribe(next => {
      this._ns.success(next, '', { timeout: 2000 });
      this._ns.updateSetting(this.setting);

      this.mapService.sendCrudUser(this.flagDeleteUpdate)
    }, (error) => {
      alert('Ha ocurrido un error al eliminar el usuario.');
      console.error(error);
    });
  }

  deleteModal(template: TemplateRef<any>, obj) {
    this.objUser = obj
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(): void {
    this.delete()
  }

  decline(): void {
    this.modalRef.hide();
  }

}
