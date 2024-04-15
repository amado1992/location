import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataProject } from '../interfaces/api_puntos_interes';
import { SaveProjectComponent } from '../save-project/save-project.component';
import { MapService } from '../services/map.service';
import { SecCensalService } from '../services/sec-censal.service';
@Component({
  selector: 'app-open-explorer',
  templateUrl: './open-explorer.component.html',
  styleUrls: ['./open-explorer.component.css']
})
export class OpenExplorerComponent implements OnInit {
  form = this.fb.group({

    name: [''],
    folder: [''],
    description: [''],
    comment: ['']

});
title: string;
closeBtnName: string;
list: any[] = [];
/*projects = [{id: 1, description: "AMAZON_HUB"}, {id: 2, description: "APPLE_ficha"},
{id: 3, description: "APPLE_orden"}]*/
//projects: DataProject

//projects: any = []
projects: any[] = [{
  Nombre: "",
  Descripcion: "",
  Comentario: "",
  Fecha: null,
  Fuente: "",
  Id: 0
}]
/*projects = [{
  Nombre: "Project_1",
  Descripcion: "madrid",
  Comentario: "",
  Fecha: null,
  Fuente: "",
  Id: 1
},
{
  Nombre: "Project_2",
  Descripcion: "madrid",
  Comentario: "",
  Fecha: null,
  Fuente: "",
  Id: 2
}]*/

config = {
  id: 'first',
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: 0
};

locations = [{id: 1, description: "COSTE_MATERIALES_GARANTIA_FICHA"}, {id: 2, description: "COSTE_MATERIALES_SIN_GARANTIA_FICHA"},
{id: 3, description: "CMF-FECHA_SERVICIO"}]

/*locations = [{id: 1, description: "COSTE_MAT"}, {id: 2, description: "COSTE_MAT_SIN"},
{id: 3, description: "CMF-FECHA"}]*/

 loadingProject: boolean = false

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
    private censService: SecCensalService, private modalService: BsModalService,
    private mapService: MapService,) { }

  ngOnInit() {
    this.mapService.subDeleteUpdateObservable$.subscribe((next: any) => {
      console.log("Open exp ", next)
      this.listProjects()
    })
    this.listProjects()
  }
  save(){}

  listProjects(){
    this.loadingProject = false
  this.censService.listProjects().subscribe((next: any) =>{
    this.loadingProject = true
    this.projects = next
    this.config.totalItems = next.length
      
  }, (error) => {
    this.loadingProject = true
    alert('Ha ocurrido un error al cargar el servicio listado de proyectos.');
    console.error(error);
  });
}

editProject(obj) {

  const initialState = {
    objProj: obj,
    idProj: 1,
    id: 1
  };

  this.bsModalRef = this.modalService.show(SaveProjectComponent, { class: 'modal-md', initialState });
  //this.bsModalRef.content.closeBtnName = 'Close';
}

pageChanged(event) {
  this.config.currentPage = event;
}

close(){
  this.bsModalRef.hide()
}

closeModal(modalId?: number){
  this.modalService.hide(modalId);
}

}
