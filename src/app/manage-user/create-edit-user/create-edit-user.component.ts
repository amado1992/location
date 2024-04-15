import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'ngx-notify';
import { SecCensalService } from 'src/app/services/sec-censal.service';
import { MapService } from 'src/app/services/map.service';
@Component({
  selector: 'create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent implements OnInit {
  findUser: boolean = false
  users: any[] = []

  setting: any = {
    position: ['right', 'bottom'],
    offset: [20, 20],
    lastOnBottom: true,
    zIndex: 1031,
    minWidth: 450,
    maxWidth: 450,
  };

  flagDeleteUpdate: any = "false"

  form = this.fb.group({

    usuario: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
    rol: ['', Validators.required]

  });

  objUser: any
  idUser: any

  name: string;
  id: any;
  closeBtnName: string;
  list: any[] = [];
  options = [{ id: 1, rol: "Administrador" }, { id: 2, rol: "Común" }]
  modalRef: BsModalRef;
  API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';


  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
    private modalService: BsModalService, private http: HttpClient,
    private censService: SecCensalService, private mapService: MapService,
    private _ns: NotifyService) { }

  ngOnInit() {
    this.listUsers()

    if (this.idUser == 1) {

      this.form.patchValue({
        usuario: this.objUser.Usuario,
        password: this.objUser.Password,
        rol: this.objUser.Rol
      })
    }

  }

  save() {
    this.flagDeleteUpdate = "true"
    this.form.get("rol").setValue(JSON.parse(this.form.get("rol").value))

    var _find = this.users.find(element => element.Usuario == this.form.get("usuario").value)
    
    if (_find != undefined) {
      this._ns.info("Ya existe un usuario con ese correo electrónico.", '', { timeout: 2000 });
      this._ns.updateSetting(this.setting);
    }

    if (this.idUser == 0) {
      if (_find == undefined) {
        this.censService.createUser(
          this.form.get("usuario").value,
          this.form.get("password").value,
          this.form.get("rol").value).subscribe(next => {

            this._ns.success(next, '', { timeout: 2000 });
            this._ns.updateSetting(this.setting);

            this.bsModalRef.hide()
            this.mapService.sendCrudUser(this.flagDeleteUpdate)
          }, (error) => {
            alert('Ha ocurrido un error al guardar el usuario.');
            console.error(error);
          });
      }
    }
    /*else {
    this.censService.createUser(
      this.form.value).subscribe(next => {

        this._ns.success("Usuario modificado correctamente.", '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);

        this.bsModalRef.hide()
        this.mapService.sendCrudUser(this.flagDeleteUpdate)
      }, (error) => {
        alert('Ha ocurrido un error al modificar el usuario.');
        console.error(error);
      });
  }*/

  }

  listUsers() {
    this.findUser = false
    this.censService.listUsers().subscribe((next: any) => {
      this.users = next
    }, (error) => {
      alert('Ha ocurrido un error al cargar el servicio listado de usuarios.');
      console.error(error);
    });
  }

}
