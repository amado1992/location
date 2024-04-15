import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'ngx-notify';
import { SecCensalService } from 'src/app/services/sec-censal.service';
import { MapService } from 'src/app/services/map.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-user',
  templateUrl: './reset-user.component.html',
  styleUrls: ['./reset-user.component.css']
})
export class ResetUserComponent implements OnInit {
  passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){10,50}$/;
  
  user: any = ""
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

    usuario: [''],
    password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.passwordPattern)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.passwordPattern)]],

  });

  objUser: any
  idUser: any

  name: string;
  id: any;
  closeBtnName: string;
  list: any[] = [];
  options = [{ id: 1, rol: "Administrador" }, { id: 2, rol: "Común" }]
  //modalRef: BsModalRef;
  //API_ENDPOINT = 'http://apiapk2ubic.corp.novaquality.es/geo';
  API_ENDPOINT = ' https://api.ubicaciones.nvqlt.com/geo';//Modo produccion


  constructor(private fb: FormBuilder, //public bsModalRef: BsModalRef,
    private modalService: BsModalService, private http: HttpClient,
    private censService: SecCensalService, private mapService: MapService,
    private _ns: NotifyService, private route: ActivatedRoute, private r: Router) { }

  ngOnInit() {
    
    this.user = this.route.snapshot.queryParamMap.get("usuario");
    this.form.get("usuario").setValue(this.user)

    console.log("Mi usuario test ", this.user)
    /*this.route.queryParams.subscribe(params => {
      this.name = params['user'];
    });*/

    //this.listUsers()

    /*if (this.idUser == 1) {

      this.form.patchValue({
        usuario: this.objUser.Usuario,
        password: this.objUser.Password,
        rol: this.objUser.Rol
      })
    }*/

  }

  save() {

    if (this.form.get("password").value != this.form.get("passwordConfirm").value) {
      this._ns.info("Las contraseñas no coinciden.", '', { timeout: 2000 });
      this._ns.updateSetting(this.setting);
    }

    if (this.form.get("password").value == this.form.get("passwordConfirm").value) {
        this.censService.resetPassword(
          this.form.get("usuario").value,
          this.form.get("password").value).subscribe(next => {

            this._ns.success(next, '', { timeout: 2000 });
            this._ns.updateSetting(this.setting);
            this.r.navigate(['/login']);
          }, (error) => {
            alert('Ha ocurrido un error en el servicio restablecer contraseña del usuario.');
            console.error(error);
          });
    }
    

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
