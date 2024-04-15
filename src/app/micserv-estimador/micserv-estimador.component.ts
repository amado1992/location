import { Component, Directive, DoCheck, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MapService } from '../services/map.service';
import { SecCensalService } from '../services/sec-censal.service';
import { FormatoDecimalService } from '../services/formato-decimal.service';
import { GeoInnverseService } from '../services/geo-innverse.service';
import { HttpClient } from '@angular/common/http';
import { MapModel } from '../interfaces/map-model';
import { CensalRadioModel } from '../interfaces/censal-radio';
import { CensalRadioModelMunc } from '../interfaces/censal-radio-mun';
import { DataPuntosInteres } from '../interfaces/api_puntos_interes';
import { CensalModel } from '../interfaces/censal';
import { DataApiModel } from '../interfaces/api-data';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select2Option, Select2Data } from 'ng-select2-component';
import {
  opciones_visual, compet_tamano, compet_ensena, compet_antiguedad, compet_zona, venta_modelo,
  venta_indicador, grid_data, grid_position, indicators, statistics, typesModel, zones, sociodemografico, economicos,
  vivienda, statisticsMenu
} from '../data/data-select';
import { DataApiVisual } from '../interfaces/api-data-visual';
import { Usuario } from '../interfaces/usuario';
import { EstimaVenta } from '../interfaces/estima-ventas';
import { Router } from '@angular/router';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PowerbiClientComponent } from '../powerbi-client/powerbi-client.component';
import * as pbi from 'powerbi-client';
import { AppHrzontGroupNotporcChartComponent } from '../graficos/app-hrzont-group-notporc-chart/app-hrzont-group-notporc-chart.component';
import { BarEchartComponent } from '../graficos/bar-echart/bar-echart.component';
import { BarHrzEchartComponent } from '../graficos/bar-hrz-echart/bar-hrz-echart.component';
import { HorizChartComponent } from '../graficos/horiz-chart/horiz-chart.component';
import { HorizChartPorcComponent } from '../graficos/horiz-chart-porc/horiz-chart-porc.component';
import { HrizntViviendChartComponent } from '../graficos/hriznt-viviend-chart/hriznt-viviend-chart.component';
import { HrizntViviend2ChartComponent } from '../graficos/hriznt-viviend2-chart/hriznt-viviend2-chart.component';
import { HrzontGroupConfigChartComponent } from '../graficos/hrzont-group-config-chart/hrzont-group-config-chart.component';
import { LineEchartComponent } from '../graficos/line-echart/line-echart.component';
import { PieEchartComponent } from '../graficos/pie-echart/pie-echart.component';
import { PieRentaChartComponent } from '../graficos/pie-renta-chart/pie-renta-chart.component';
import { PieViviendChartComponent } from '../graficos/pie-viviend-chart/pie-viviend-chart.component';
import { SimpleChartComponent } from '../graficos/simple-chart/simple-chart.component';
import { VertGroupRentaChartComponent } from '../graficos/vert-group-renta-chart/vert-group-renta-chart.component';
import { VerticGroupChartComponent } from '../graficos/vertic-group-chart/vertic-group-chart.component';
import { VerticViviendChartComponent } from '../graficos/vertic-viviend-chart/vertic-viviend-chart.component';
import { Competidor, ObjData } from '../data/obj-data';
import { ObjPoint } from '../data/obj-point';
import { NotifyService } from 'ngx-notify';

declare var $: any;
//declare var google: any;

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-micserv-estimador',
  templateUrl: './micserv-estimador.component.html',
  styleUrls: ['./micserv-estimador.component.css']
})
export class MicservEstimadorComponent implements OnInit, DoCheck {
  flagTab = false
  setting: any = {
    position: ['right', 'bottom'],
    offset: [20, 20],
    lastOnBottom: true,
    zIndex: 1031,
    minWidth: 450,
    maxWidth: 450,
  };

  messageText = ""
  dirLiteral = new FormControl("")

  /*_competidores = {
    competidores: []
  }*/
  _competidor: Competidor
  _competidores: Competidor[] = []

  /*_competidores = {
    competidores: [[-76.54335737228394, 39.18579907229748],
    [-76.52803659439087, 39.1838364847587],
    [-76.5295386314392, 39.17683392507606],
    [-76.54520273208618, 39.17876344106642]]
  }*/

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  _vPillsHome = true
  _vPillsProfile = false
  _vPillsMessages = false
  _vPillsSettings = false
  _vPillsClima = false
  _vPillsMapa = false
  _vPillsComp = false
  colorEvent = 0
  porc_de_poblacion_mas_65_Zone1 = 0
  textEst = ""
  textLey = ""
  objPoint: ObjPoint

  //oldcode
  /*newFilter = [
    "todos",
    "Politica",
    "Alojamiento",
    "Punto de interes",
    "Establecimiento",
    "Colegio de educacion primaria",
    "Colegio",
    "Joyeria",
    "Tienda",
    "Agencia inmobiliaria",
    "Hospital",
    "Salud",
    "Banco",
    "Cajero automatico",
    "Contabilidad",
    "Finanzas",
    "Discoteca",
    "Bar",
    "Restaurante",
    "Comida",
    "Gimnasio",
    "Entrega de comida",
    "Comida para llevar",
    "Sublocalidad de nivel 1",
    "Sublocalidad",
    "Taller de coches",
    "Venta de coches",
    "Salon de belleza",
    "Cuidado del cabello",
    "Tienda de ropa",
    "Zapateria",
    "Lavanderia",
    "Agencia postal",
    "Tienda de mobiliario",
    "Tienda de hogar",
    "Doctor",
    "Tienda de electronica",
    "grocery_or_supermarket",
    "Contratista",
    "Electricidad",
    "Estacion de gas",
    "Localidad"
  ]*/
  //new code
  newFilter = [
    "Politica",
    "Alojamiento",
    "Colegio de educacion primaria",
    "Colegio",
    "Joyeria",
    "Tienda",
    "Agencia inmobiliaria",
    "Hospital",
    "Salud",
    "Banco",
    "Cajero automatico",
    "Contabilidad",
    "Finanzas",
    "Discoteca",
    "Bar",
    "Restaurante",
    "Comida",
    "Gimnasio",
    "Entrega de comida",
    "Comida para llevar",
    "Sublocalidad de nivel 1",
    "Sublocalidad",
    "Taller de coches",
    "Venta de coches",
    "Salon de belleza",
    "Cuidado del cabello",
    "Tienda de ropa",
    "Zapateria",
    "Lavanderia",
    "Agencia postal",
    "Tienda de mobiliario",
    "Tienda de hogar",
    "Doctor",
    "Tienda de electronica",
    "grocery_or_supermarket",
    "Contratista",
    "Electricidad",
    "Estacion de gas",
    "Localidad"
  ]
  //_dataCopy = [4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 5]
  _dataCopy = []

  dataForZone: any[] = []
  nameZone1 = ""
  nameZone2 = ""
  nameZone3 = ""
  nameZone4 = ""

  /*objZone = {
    name: "",
    values: {},
    color: ""
  }*/

  objZone: ObjData
  _data = []
  //_data = [4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 5]
  loadingPointI = true
  loadingPointIComp = true
  loadingPointICompChart = true
  dataColor: any[] = []

  color_zona1: any
  color_zona2: any
  color_zona3: any
  color_zona4: any

  cens_rad_emergente_modelZone2: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };

  cens_rad_emergente_modelZone3: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };

  cens_rad_emergente_modelZone4: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };


  public getScreenWidth: any;
  public getScreenHeight: any;

  isLoadDataAll: boolean = false
  loadPointInterest: DataPuntosInteres[] = []
  loadPointInterestCopy: DataPuntosInteres[] = []
  loadPointInterestComp: DataPuntosInteres[] = []
  loadPointInterestCompChart: DataPuntosInteres[] = []
  respPois: any[] = []

  //Table
  //config: any;
  collection = { count: 60, data: [] };

  config = {
    id: 'first',
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
  };

  configComp = {
    id: 'second',
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0
  };
  //End table

  isVenta = ""
  isErrorVenta = ""
  isCompetencia = ""
  isErrorCompetencia = ""
  isLocation = ""
  isErrorLocation = ""

  isDir: any = ""
  isErrorDir = ""
  isComboEstVenta = ""
  isErrorComboEstVenta = ""
  isCensal = ""
  isErrorCensal = ""
  isErrorMeteorologia = ""
  isMeteorologia = ""
  isMunicipio = ""
  isErrorMunicipio = ""

  isZone1: any = ""
  isZone2: any = ""
  isZone3: any = ""
  isZone4: any = ""

  isErrorZone1: any = ""
  isErrorZone2: any = ""
  isErrorZone3: any = ""
  isErrorZone4: any = ""

  bsModalRef: BsModalRef;
  modalRef: BsModalRef;

  isSociodemografico: boolean = false
  isEconomicos: boolean = false
  isVivienda: boolean = false

  isNormalizeReverse = false
  isGetParamVentas = false

  countSocio = 0
  countEco = 0
  countVivienda = 0
  selectedTab

  selectedTypeModel = []
  selectedIndicator = []
  selectedZone = []
  selectedStatistic = []
  selectedStatisticCopy = []

  tabOneHomeDataDir: boolean = true
  tabTwoInfluenceZone: boolean = false
  tabThreeCompetition: boolean = false
  tapFourLocationPerformanceEstimation: boolean = false
  tapFiveSearchOptimalLocations: boolean = false
  tapSixSetting: boolean = false

  selectedType: any
  selectedTypeZone2: any
  selectedTypeZone3: any
  selectedTypeZone4: any

  cant = new FormControl('');
  cantZone2 = new FormControl('');
  cantZone3 = new FormControl('');
  cantZone4 = new FormControl('');

  type = new FormControl('');
  typeZone2 = new FormControl('');
  typeZone3 = new FormControl('');
  typeZone4 = new FormControl('');

  options = [{ id: 1, description: "metros" }, { id: 2, description: "minutos andando" }, { id: 3, description: "minutos en coche" }]

  indicators: any[] = JSON.parse(JSON.stringify(indicators));
  statistics: any[] = JSON.parse(JSON.stringify(statistics));
  typesModel: any[] = JSON.parse(JSON.stringify(typesModel));
  zones: any[] = JSON.parse(JSON.stringify(zones));

  sociodemografico: any[] = JSON.parse(JSON.stringify(sociodemografico));
  economicos: any[] = JSON.parse(JSON.stringify(economicos));
  vivienda: any[] = JSON.parse(JSON.stringify(vivienda));
  statisticsMenu: any[] = JSON.parse(JSON.stringify(statisticsMenu));

  map_model: MapModel = {
    cod_municipio_ine: null,
    cod_pais: null,
    cod_postal: null,
    cod_provincia: null,
    confianza: null,
    dir_normalizada: null,
    district: null,
    latitud: null,
    longitud: null,
    municipio: null,
    num_via: null,
    tipo_via: null,
    via: null,
    address: null,
    postal: null,
    salida_ok: null
  };
  censal_model: CensalModel = {
    c_seccion: null,
  };
  // Datos proveniente de Json  de Microservicio con cod censal
  municipio_model: CensalRadioModelMunc = {
    Num_comercios: 0,
    Num_oficinas: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    c_seccion: 0,
    edad_media_poblacion: 0,
    familias: 0,
    fu_de_ing_pensiones: 0,
    fu_de_ing_salario: 0,
    fue_de_ing_prestaciones_por_desempleo: 0,
    fue_de_ingreso_otras_prestaciones: 0,
    fue_de_ingreso_otros_ingresos: 0,
    literal_municipio: '',
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    poblacion: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    porc_de_poblacion_mas_65: 0,
    porc_de_poblacion_menor_18: 0,
    porc_hogares_unipersonales: 0,
    renta_media_por_hogar: 0,
    renta_media_por_persona: 0,
    suma_num_viviendas: 0,
  };
  // Este es el atributo que se va a cargar en el Modal
  cens_rad_emergente_model: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };
  zona = '';

  distancia_estudio = '';
  distancia_estudioZone2 = '';
  distancia_estudioZone3 = '';
  distancia_estudio4 = '';

  // Modelo para la Zona 1
  censal_radio1_model: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };
  // Modelo para la Zona 2
  censal_radio2_model: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };
  // Modelo para la Zona 3
  censal_radio3_model: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };
  // Modelo para la Zona 4
  censal_radio4_model: CensalRadioModel = {
    Edad_media_poblacion: 0,
    Fue_de_ing_pensiones: 0,
    Fue_de_ing_prestaciones_por_desempleo: 0,
    Fue_de_ing_salario: 0,
    Fue_de_ingreso_otras_prestaciones: 0,
    Fue_de_ingreso_otros_ingresos: 0,
    Num_comercios: 0,
    Num_oficinas: 0,
    Porc_de_poblacion_mas_65: 0,
    Porc_de_poblacion_menor_18: 0,
    Porc_de_población_menor_5: 0,
    Porc_hogares_unipersonales: 0,
    Renta_media_por_persona: 0,
    Renta_media_por_hogar: 0,
    Superficie_media: 0,
    Tam_medio_hogar: 0,
    altu_media: 0,
    antiguedad: 0,
    familias: 0,
    num_fincas: 0,
    num_inmuebles: 0,
    num_segunda_vivienda: 0,
    por_poblacion_renta_menor_5000: 0,
    por_poblacion_renta_menor_7500: 0,
    por_poblacion_renta_menor_10000: 0,
    suma_num_viviendas: 0,
    total_poblacion: 0,
    totalViviendas_sin_antig_0: 0,
    total_renta_familiar: 0
  };
  total_metros = 0;
  total_min_andando = 0;
  total_min_coche = 0;
  total_tran_publ = 0;

  zona_influe: FormGroup;
  dir_literal = '';
  // direccion literal dentro del cuadro del mapa
  dir_literal_cuadro = '';

  puntos_interes: DataPuntosInteres = {
    POI_name: '',
    POI_location: [0, 0],
    POI_dist: 0,
    POI_nratings: 0,
    POI_types: [''],
    POI_rating: 0,
    POI_pricelev: 0,
    POI_postaladd: ""
  }

  /// default settings maps
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = null;
  lng = null;
  tipos = 'todos';
  message = 'Hello World!';
  // otros atributos
  reset_c_zona1 = true;
  reset_c_zona2 = true;
  reset_c_zona3 = true;
  reset_c_zona4 = true;
  metros_zona1 = 0;
  metros_zona2 = 0;
  metros_zona3 = 0;
  metros_zona4 = 0;
  texto_zona1 = '';
  texto_zona2 = '';
  texto_zona3 = '';
  texto_zona4 = '';
  // Opciones de Visualizacion Select
  opciones_visual: Select2Data = JSON.parse(JSON.stringify(opciones_visual));
  value_opciones: string[] = [];
  opciones_visual_selected = [];
  compet_tamano: Select2Data = JSON.parse(JSON.stringify(compet_tamano));
  value_tamano: string[] = [];
  compet_ensena: Select2Data = JSON.parse(JSON.stringify(compet_ensena));
  value_ensena: string[] = [];
  compet_antiguedad: Select2Data = JSON.parse(JSON.stringify(compet_antiguedad));
  value_antiguedad: string[] = [];
  compet_zona: Select2Data = JSON.parse(JSON.stringify(compet_zona));
  value_zona: string[] = [];
  venta_modelo: Select2Data = JSON.parse(JSON.stringify(venta_modelo));
  value_modelo: string[] = [];
  venta_indicador: Select2Data = JSON.parse(JSON.stringify(venta_indicador));
  value_indicador: string[] = [];
  grid_data: Select2Data = JSON.parse(JSON.stringify(grid_data));
  value_grid_data: string[] = ['2'];
  grid_position = grid_position;
  // ocultar y mostrar tabla Estmimacion ventas
  // Tipo de Modelo
  visible_n_operac = false;
  visible_t_medio = false;
  visible_v_total = false;
  // Indicadores
  visible_m_enero = false;
  visible_m_febrero = false;
  visible_m_marzo = false;
  visible_m_abril = false;
  visible_m_mayo = false;
  visible_m_junio = false;
  visible_m_julio = false;
  visible_m_agosto = false;
  visible_m_septiembre = false;
  visible_m_octubre = false;
  visible_m_noviembre = false;
  visible_m_diciembre = false;
  visible_12_meses = false;
  // Tipo indicadores Ubicaciones Óptimas
  tipo_modelo_opt = '';
  tipo_modelo_ind = '';
  visible_n_operac_opt = false;
  visible_t_medio_opt = false;
  visible_v_total_opt = false;
  var_interaccion = '';
  var_interaccion_aux = '';
  // Modelo
  visible_enero = false;
  visible_febreo = false;
  visible_marzo = false;
  visible_abril = false;
  visible_mayo = false;
  visible_junio = false;
  visible_julio = false;
  visible_agosto = false;
  visible_septiembre = false
  visible_octubre = false
  visible_noviembre = false
  visible_diciembre = false
  visible_12_meses_opt = false;
  // Mostrar/Ocultar columnas Zona Influencia
  visible_colum_zon_inf = false;
  // obtener coordenadas
  var_cord = false;
  cordenadas1 = [];
  cordenadas2 = [];
  cordenadas3 = [];
  cordenadas4 = [];
  // Extremos del mapa
  noroeste = [];
  noreste = []
  suroeste = [];
  sureste = [];

  // Cordenadas de viviendas
  viviendas_cor = [];
  competencias_cor = [];
  centros_cor = [];
  // interval
  zona_funct: any;
  error_parada = false;
  // Visualizar Viviendas-Competencias-Centros
  visible_vivi = false;
  visible_comp = false;
  visible_cent = false;
  // visualizar cuadro dentro de mapa (textarea y  boton)
  visible_area_dir = false;
  // variable modelo de transito
  transito_table = [];
  //  {categoria: '', nombre: '', direccion: '', distancia: 0},
  //   {categoria: 'Centro de Salud2', nombre: 'Clinica Dental', direccion: 'Calle falsa', distancia: 24},
  //   {categoria: 'Centro de Salud3', nombre: 'Clinica Dental', direccion: 'Calle falsa', distancia: 25}
  // ];
  datatable: any;
  datatable_opt: any;
  transito_table2 = [];
  indices = [];
  transito_grafico = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  visible_leyenda = false;
  //  arreglo de Meteorologia
  meteorologia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // arreglo de Estimacion de Ventas
  estima_interfaz: EstimaVenta = {
    numero_operaciones: null,
    ticket_medio: null,
    venta_total: null,
  };
  estimacion_ventas = {
    '12 meses': this.estima_interfaz,
    'enero': this.estima_interfaz,
    'febrero': this.estima_interfaz,
    'marzo': this.estima_interfaz,
    'abril': this.estima_interfaz,
    'mayo': this.estima_interfaz,
    'junio': this.estima_interfaz,
    'julio': this.estima_interfaz,
    'agosto': this.estima_interfaz,
    'septiembre': this.estima_interfaz,
    'octubre': this.estima_interfaz,
    'noviembre': this.estima_interfaz,
    'diciembre': this.estima_interfaz
  };
  tipo_centro: any = '';
  tipoCentroOptimalLocations: any = ''

  tamano: any = '';
  // Para el tab Ubicaciones optimas
  estima_vent_ubic_opt = {
    '12 meses': this.estima_interfaz,
    'enero': this.estima_interfaz,
    'febrero': this.estima_interfaz,
    'marzo': this.estima_interfaz,
    'abril': this.estima_interfaz,
    'mayo': this.estima_interfaz,
    'junio': this.estima_interfaz,
    'julio': this.estima_interfaz,
    'agosto': this.estima_interfaz,
    'septiembre': this.estima_interfaz,
    'octubre': this.estima_interfaz,
    'noviembre': this.estima_interfaz,
    'diciembre': this.estima_interfaz

  };
  estima_vent_ubic_opt_ref = {
    '12 meses': this.estima_interfaz,
    'enero': this.estima_interfaz,
    'febrero': this.estima_interfaz,
    'marzo': this.estima_interfaz,
    'abril': this.estima_interfaz,
    'mayo': this.estima_interfaz,
    'junio': this.estima_interfaz,
    'julio': this.estima_interfaz,
    'agosto': this.estima_interfaz,
    'septiembre': this.estima_interfaz,
    'octubre': this.estima_interfaz,
    'noviembre': this.estima_interfaz,
    'diciembre': this.estima_interfaz,
  };
  array_estima = [];
  array_address_estima = [];
  indicador_ubic = '';
  model_ubic = '';
  // cambio de icono ejecucion runner
  runner = false;
  runner_ventas = false;
  runner_ubica = false;
  runner_compet = false;
  // variables del grid
  cuadritos = [];
  ctx = null;
  cant_col = 0;
  cant_fil = 0;
  ancho_x = 0;
  altura_y = 0;
  grid_paint = false; // variable para saber si esl grid esta pintado
  visible_btn_ubic = true; // opcion de visulaizar botones en tab ubicaciones
  visible_canva = false; // ocultar canvas
  marker_state = new mapboxgl.Marker();
  // vaiable para datatable ubic optimas
  data_ubic_opt = [];
  // Variables de Competencia
  nombre_compet = '';
  area_busq: any = '';
  list_competencias = [];
  visible_btn_compet = false;
  // Inyeccion de dependencias

  closeBtnName: string;

  zona1: string;
  zona2: string;
  zona3: string;
  zona4: string;

  constructor(private mapService: MapService,
    private censService: SecCensalService,
    private httpClient: HttpClient,
    public formatDecimal: FormatoDecimalService,
    public geoInverse: GeoInnverseService,
    private route: Router,
    private modalService: BsModalService,
    private _ns: NotifyService
  ) {
    this.objZone = new ObjData()

    this.objPoint = new ObjPoint()

    this._competidor = new Competidor()
  }
  // ver(){
  //   this.transito_table = this.transito_table2;
  // }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    //this.getPuntoInteres()
    //this.getPuntoInteresCompetenciaChart()

    localStorage.removeItem("dirLiteral")
    this.dirLiteral.valueChanges.subscribe(next => {
      this.dir_literal = next
      localStorage.setItem("dirLiteral", JSON.stringify(this.dir_literal))
      this.mapService.sendMessageDirLiteral(this.dir_literal)
    });

    this.mapService.subFormObservable$.subscribe((next: any) => {

      this.dir_literal = next
      this.dirLiteral.setValue(next)
      this.loadData()
    })

    this.mapService.subClearObservable$.subscribe((next: any) => {
      if (next == "no") {
        this.dir_literal = ""
        this.dirLiteral.setValue("")
      }
    })

    this.cant.valueChanges.subscribe(next => {
      if (this.selectedType == 1) {
        this.zona_influe.get('metros1').setValue(next);
      }
      if (this.selectedType == 2) {
        this.zona_influe.get('min_andando1').setValue(next);
      }
      if (this.selectedType == 3) {
        this.zona_influe.get('min_coche1').setValue(next)
      }

    })

    this.cantZone2.valueChanges.subscribe(next => {
      console.log("Select Z2")
      if (this.selectedTypeZone2 == 1) {
        this.zona_influe.get('metros2').setValue(next);
      }
      if (this.selectedTypeZone2 == 2) {
        this.zona_influe.get('min_andando2').setValue(next);
        console.log("Minz2 Z2 ", this.zona_influe.get('min_andando2').value)

      }
      if (this.selectedTypeZone2 == 3) {
        this.zona_influe.get('min_coche2').setValue(next)
      }

    })

    this.cantZone3.valueChanges.subscribe(next => {
      if (this.selectedTypeZone3 == 1) {
        this.zona_influe.get('metros3').setValue(next);
      }
      if (this.selectedTypeZone3 == 2) {
        this.zona_influe.get('min_andando3').setValue(next);
      }
      if (this.selectedTypeZone3 == 3) {
        this.zona_influe.get('min_coche3').setValue(next)
      }

    })

    this.cantZone4.valueChanges.subscribe(next => {
      if (this.selectedTypeZone4 == 1) {
        this.zona_influe.get('metros4').setValue(next);
      }
      if (this.selectedTypeZone4 == 2) {
        this.zona_influe.get('min_andando4').setValue(next);
      }
      if (this.selectedTypeZone4 == 3) {
        this.zona_influe.get('min_coche4').setValue(next)
      }

    })

    /*
     * Metodos para el funcionamiento del mapa
     */
    const v_this = this;
    $(document).ready(() => {
      /**
       * Cargar datatable transito
       */
      $.extend($.fn.dataTable.defaults, {
        searching: false,
        //ordering:  false
      });
      v_this.datatable = $('#tabla').DataTable(
        {
          'data': this.transito_table,
          //'paginate' :false,
          "dom": '<"topcustom"lfr>t<"bottomcustom"ip>',
          'lengthChange': false,
          'pageLength': 9,
          'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
          },
          'columns': [
            { title: 'categoria' },
            { title: 'nombre' },
            { title: 'direccion' },
            { title: 'distancia' },
            { tittle: 'valoracion' }
          ],
          'deferRender': true,
          'scrollx': 200,
          'scrollCollapse': true,
          'scroller': true,
          'paging': false,

        }
      );
      /*v_this.datatable_opt = $('#ubic-optim').DataTable(
        {
          //"autoWidth": true,
          'data': this.data_ubic_opt,
          //'paginate' :false,
          //"dom": '<"topcustom"lfr>t<"bottomcustom"ip>',
          'lengthChange': false,
          'pageLength': 3,
          'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
          },
          rowCallback: function (row, data) {
            if (data[3] == "White") {
              $($(row).find("td")).css("background-color", "rgba(255, 255, 255, 0.5)");
            }
            else if (data[3] == "Blue") {
              $($(row).find("td")).css("background-color", "rgb(22, 22, 251, 0.3)");
            }
            else {
              $($(row).find("td")).css("background-color", "rgb(28, 134, 12, 0.3)");
            }
          },
          "columnDefs": [
            { "visible": false, "targets": 3 },
         // { "orderable": false, "targets": 0 }

            { "width": "10%", "targets": 0 },
            { "width": "50%", "targets": 1 },
            { "width": "30%", "targets": 2 },

            { "className": "dt-center", "targets": 0 },
            { "className": "dt-center", "targets": 2 }
          ]
        });*/

      v_this.datatable_opt = $('#ubic-optim').DataTable(
        {
          "autoWidth": false,
          'data': this.data_ubic_opt,
          'lengthChange': false,
          'pageLength': 3,
          'language': {
            'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
          },
          rowCallback: function (row, data) {
            if (data[3] == "White") {
              $($(row).find("td")).css("background-color", "rgba(255, 255, 255, 0.5)");
            }
            else if (data[3] == "Blue") {
              $($(row).find("td")).css("background-color", "rgb(22, 22, 251, 0.3)");
            }
            else {
              $($(row).find("td")).css("background-color", "rgb(28, 134, 12, 0.3)");
            }
          },
          "columnDefs": [
            { "visible": false, "targets": 3 },
            { "width": "10%", "targets": 0 },
            { "width": "85%", "targets": 1 },
            { "width": "5%", "targets": 2 },

            { "className": "dt-center", "targets": 0 },
            { "className": "dt-center", "targets": 2 }
          ]
        });

      /**
       * Misma posicion de los tab
       */
      $('#txt_literal').focus();
      $('a.home').on('click', function (e) {
        e.preventDefault();
        $('a.home').tab('show');
      });
      $('a.renta').on('click', function (e) {
        e.preventDefault();
        $('a.renta').tab('show');
      });
      $('a.habit').on('click', function (e) {
        e.preventDefault();
        $('a.habit').tab('show');
      });
      $('a.compra').on('click', function (e) {
        e.preventDefault();
        $('a.compra').tab('show');
      });
      $('a.clima').on('click', function (e) {
        e.preventDefault();
        $('a.clima').tab('show');
      });
      $('a.mapa').on('click', function (e) {
        e.preventDefault();
        $('a.mapa').tab('show');
      });
      // Cerrar el Modal
      // $('#censalModal').on('hidden.bs.modal', function () {
      //   v_this.resetEmergente();
      //  });
      /**
       * Color Picker New
       */

      const colors = ['#84e2a8', '#00c993', '#84e2a8', '#33FFFF', '#8cccd3', '#9999FF', '#d3bfb7', '#FFFF66'
        , '#CCCC00', '#FF9900', '#FF3333', '#FF9999', '#f2adb2', '#d18e54', '#ccc47c', '#f4dbaa'];

      //$('img#color1').simpleColorPicker({ onChangeColor: function(color) {
      $('div#changeColor1').simpleColorPicker({
        onChangeColor: function (color) {
          const tr_id = $('#zona1-tr');
          tr_id.removeClass('influen-one');
          // tr_id.css('background-color', color);
          //$('#zona1-tr td:first-child input').css('background-color', color);
          //$('#zona1-tr td:first-child div').css('background-color', color);
          $('div#changeColor1').css('background-color', color);
          $('div#zone1Color').css('background-color', color);
          //$('#zona1-tr td:last-child div').css('background-color', color);
          v_this.cambiar_color();
        }, colors: colors, colorsPerLine: 4
      });

      //$('img#color2').simpleColorPicker({ onChangeColor: function(color) {
      $('div#changeColor2').simpleColorPicker({
        onChangeColor: function (color) {
          const tr_id = $('#zona2-tr');
          tr_id.removeClass('influen-one');
          // tr_id.css('background-color', color);
          //$('#zona2-tr td:first-child input').css('background-color', color);
          $('div#changeColor2').css('background-color', color);
          $('div#zone2Color').css('background-color', color);
          v_this.cambiar_color();
        }, colors: colors, colorsPerLine: 4
      });

      //$('img#color3').simpleColorPicker({ onChangeColor: function(color) {
      $('div#changeColor3').simpleColorPicker({
        onChangeColor: function (color) {
          const tr_id = $('#zona3-tr');
          tr_id.removeClass('influen-one');
          //tr_id.css('background-color', color);
          //$('#zona3-tr td:first-child input').css('background-color', color);
          $('div#changeColor3').css('background-color', color);
          $('div#zone3Color').css('background-color', color);
          v_this.cambiar_color();
        }, colors: colors, colorsPerLine: 4
      });

      //$('img#color4').simpleColorPicker({ onChangeColor: function(color) {
      $('div#changeColor4').simpleColorPicker({
        onChangeColor: function (color) {
          const tr_id = $('#zona4-tr');
          tr_id.removeClass('influen-one');
          //tr_id.css('background-color', color);
          //$('#zona4-tr td:first-child input').css('background-color', color);
          $('div#changeColor4').css('background-color', color);
          $('div#zone4Color').css('background-color', color);
          v_this.cambiar_color();
        }, colors: colors, colorsPerLine: 4
      });

      $('[data-toggle="tab"]').tooltip({
        trigger: 'hover',
        placement: 'top',
        animate: true,
        delay: 400,
        container: 'body'
      });
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        placement: 'top',
        animate: true,
        delay: 400,
        container: 'body'
      });
      $('[data-toggle="modal"]').tooltip({
        trigger: 'hover',
        placement: 'top',
        animate: true,
        delay: 400,
        container: 'body'
      });
      const value = getContainerMapHeight();
      $('#map').css('height', value + 'px');
      $('.mapboxgl-canvas').css('height', value + 'px');
      $('#street-view').css('min-height', value + 'px');
      $('.widget-scene-canvas').css('height', value + 'px');

      $('.splitter-horizontal').mouseup(function () {
        const valuert = getContainerMapHeight();

        console.log(valuert);
        $('#map').css('height', valuert + 'px');
        $('.mapboxgl-canvas').css('height', valuert + 'px');
        $('#street-view').css('min-height', valuert + 'px');
        $('.widget-scene-canvas').css('height', value + 'px');
        v_this.map.resize();
        //v_this.loadStreet();

      });
      $('.splitter').mouseup(function () {
        const valuert = getContainerMapHeight();

        console.log(valuert);
        // $('#map').css('height', valuert + 'px');
        // $('.mapboxgl-canvas').css('height', valuert + 'px' );
        // $('#street-view').css('min-height', valuert + 'px');
        // $('.widget-scene-canvas').css('height', value + 'px');
        v_this.map.resize();
        //v_this.loadStreet();    

      });
      $('.panel-left').resizable({
        handleSelector: '.splitter',
        resizeHeight: false
      });
      $('.panel-top').resizable({
        handleSelector: '.splitter-horizontal',
        resizeWidth: false
      });
      $('button.ok').click(function () {
        // v_this.loadZonasColor();
      });
    }); //  end ready

    function getContainerMapHeight() {
      let value = $('#id_panel-top').css('height');
      value = value.replace('px', '');
      value = value - 70;
      return value;
    }
    // ------------------------------------
    this.zona_influe = new FormGroup({
      zona1: new FormControl({ value: '', disabled: true }),
      metros1: new FormControl('', [Validators.pattern('/^[1-9]\d{6,10}$/')]),
      min_andando1: new FormControl(),
      min_coche1: new FormControl(),
      porc_desempleo1: new FormControl(),
      poblacion1: new FormControl({ value: '', disabled: true }),
      familias1: new FormControl({ value: '', disabled: true }),
      ren_media1: new FormControl({ value: '', disabled: true }),
      por_menores1: new FormControl({ value: '', disabled: true }),
      por_mayores1: new FormControl({ value: '', disabled: true }),
      zona2: new FormControl({ value: '', disabled: true }),
      metros2: new FormControl(),
      min_andando2: new FormControl(),
      min_coche2: new FormControl(),
      porc_desempleo2: new FormControl(),
      poblacion2: new FormControl({ value: '', disabled: true }),
      familias2: new FormControl({ value: '', disabled: true }),
      ren_media2: new FormControl({ value: '', disabled: true }),
      por_menores2: new FormControl({ value: '', disabled: true }),
      por_mayores2: new FormControl({ value: '', disabled: true }),
      zona3: new FormControl({ value: '', disabled: true }),
      metros3: new FormControl(),
      min_andando3: new FormControl(),
      min_coche3: new FormControl(),
      porc_desempleo3: new FormControl(),
      poblacion3: new FormControl({ value: '', disabled: true }),
      familias3: new FormControl({ value: '', disabled: true }),
      ren_media3: new FormControl({ value: '', disabled: true }),
      por_menores3: new FormControl({ value: '', disabled: true }),
      por_mayores3: new FormControl({ value: '', disabled: true }),
      zona4: new FormControl({ value: '', disabled: true }),
      metros4: new FormControl(),
      min_andando4: new FormControl(),
      min_coche4: new FormControl(),
      porc_desempleo4: new FormControl(),
      poblacion4: new FormControl({ value: '', disabled: true }),
      familias4: new FormControl({ value: '', disabled: true }),
      ren_media4: new FormControl({ value: '', disabled: true }),
      por_menores4: new FormControl({ value: '', disabled: true }),
      por_mayores4: new FormControl({ value: '', disabled: true }),
    });

    this.resetZona1()
    this.resetZona2()
    this.resetZona3()
    this.resetZona4()
    // localozacion del user
    mapboxgl.accessToken = environment.mapbox.accessToken;

    /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //this.lat = position.coords.latitude;//latitude
        //this.lng = position.coords.longitude;//longitude

        //if (this.lat !== this.lat || this.lng !== this.lng) {//x is NaN.
        this.lat = 40.54824;
        this.lng = -3.63834;
        //}
console.log("Coordenadas " + "latitude " + this.lat + " longitude " + this.lng)
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }*/
    $(document).ready(() => {
      this.lat = 40.54824;
      this.lng = -3.63834;
      console.log("Coordenadas " + "latitude " + this.lat + " longitude " + this.lng)
      this.map.flyTo({
        center: [this.lng, this.lat]
      });
    }
    )
    this.loadMap();
    //this.loadStreet();

  }

  ngDoCheck() {

  }

  onBlurZona1(target) {
    // console.log($(target).css('background-color'));
    const valor = target.value;
    const longitud = valor.trim();
    const attr = target.getAttribute('formcontrolname');
    if (longitud.length > 0) {
      if (isNaN(valor)) {
        alert('El valor introducido debe ser numérico.');
        this.resetZona1();
        return;
      }

      this.zona_influe.controls['zona1'].reset({ value: '1', disabled: true });
      if (attr === 'metros1') {
        this.zona_influe.controls['metros1'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['metros1'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_andando1') {
        this.zona_influe.controls['min_andando1'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_andando1'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_coche1') {
        this.zona_influe.controls['min_coche1'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_coche1'].reset({ value: '', disabled: true });
      }
      if (attr === 'porc_desempleo1') {
        this.zona_influe.controls['porc_desempleo1'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['porc_desempleo1'].reset({ value: '', disabled: true });
      }
      this.calcMetros();
      this.llenarFila1();
      //this.loadZonasColor();
    } else {
      this.resetZona1();
    }

  }
  resetZona1() {
    this.zona_influe.controls['zona1'].reset({ value: '', disabled: true });
    this.zona_influe.controls['metros1'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_andando1'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_coche1'].reset({ value: '', disabled: false });
    this.zona_influe.controls['porc_desempleo1'].reset({ value: '', disabled: false });
    this.zona_influe.controls['poblacion1'].reset({ value: '', disabled: true });
    this.zona_influe.controls['familias1'].reset({ value: '', disabled: true });
    this.zona_influe.controls['ren_media1'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_menores1'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_mayores1'].reset({ value: '', disabled: true });
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio1_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();

  }

  // Fin acciones Zona1
  // Inicio Acciones  Zona 2
  onBlurZona2(target) {
    // console.log($(target).css('background-color'));
    const valor = target.value;
    const longitud = valor.trim();
    const attr = target.getAttribute('formcontrolname');
    if (longitud.length > 0) {
      if (isNaN(valor)) {
        alert('El valor introducido debe ser numérico.');
        this.resetZona2();
        return;
      }

      this.zona_influe.controls['zona2'].reset({ value: '2', disabled: true });
      if (attr === 'metros2') {
        this.zona_influe.controls['metros2'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['metros2'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_andando2') {
        this.zona_influe.controls['min_andando2'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_andando2'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_coche2') {
        this.zona_influe.controls['min_coche2'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_coche2'].reset({ value: '', disabled: true });
      }
      if (attr === 'porc_desempleo2') {
        this.zona_influe.controls['porc_desempleo2'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['porc_desempleo2'].reset({ value: '', disabled: true });
      }
      this.calcMetros();
      this.llenarFila2();
      //this.loadZonasColor();
    } else {
      this.resetZona2();
    }

  }
  resetZona2() {
    this.zona_influe.controls['zona2'].reset({ value: '', disabled: true });
    this.zona_influe.controls['metros2'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_andando2'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_coche2'].reset({ value: '', disabled: false });
    this.zona_influe.controls['porc_desempleo2'].reset({ value: '', disabled: false });
    this.zona_influe.controls['poblacion2'].reset({ value: '', disabled: true });
    this.zona_influe.controls['familias2'].reset({ value: '', disabled: true });
    this.zona_influe.controls['ren_media2'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_menores2'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_mayores2'].reset({ value: '', disabled: true });
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio2_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
    // this.loadZonasColor();
  }
  // Fin acciones Zona2
  // Inicio Acciones  Zona3
  onBlurZona3(target) {
    // console.log($(target).css('background-color'));
    const valor = target.value;
    const longitud = valor.trim();
    const attr = target.getAttribute('formcontrolname');
    if (longitud.length > 0) {
      if (isNaN(valor)) {
        alert('El valor introducido debe ser numérico.');
        this.resetZona3();
        return;
      }

      this.zona_influe.controls['zona3'].reset({ value: '3', disabled: true });
      if (attr === 'metros3') {
        this.zona_influe.controls['metros3'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['metros3'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_andando3') {
        this.zona_influe.controls['min_andando3'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_andando3'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_coche3') {
        this.zona_influe.controls['min_coche3'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_coche3'].reset({ value: '', disabled: true });
      }
      if (attr === 'porc_desempleo3') {
        this.zona_influe.controls['porc_desempleo3'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['porc_desempleo3'].reset({ value: '', disabled: true });
      }
      this.calcMetros();
      this.llenarFila3();
      //this.loadZonasColor();
    } else {
      this.resetZona3();
    }

  }
  resetZona3() {
    this.zona_influe.controls['zona3'].reset({ value: '', disabled: true });
    this.zona_influe.controls['metros3'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_andando3'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_coche3'].reset({ value: '', disabled: false });
    this.zona_influe.controls['porc_desempleo3'].reset({ value: '', disabled: false });
    this.zona_influe.controls['poblacion3'].reset({ value: '', disabled: true });
    this.zona_influe.controls['familias3'].reset({ value: '', disabled: true });
    this.zona_influe.controls['ren_media3'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_menores3'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_mayores3'].reset({ value: '', disabled: true });
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio3_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
    // this.loadZonasColor();
  }
  // Fin acciones Zona3
  // Inicio Acciones  Zona3
  onBlurZona4(target) {
    // console.log($(target).css('background-color'));
    const valor = target.value;
    const longitud = valor.trim();
    const attr = target.getAttribute('formcontrolname');
    if (longitud.length > 0) {
      if (isNaN(valor)) {
        alert('El valor introducido debe ser numérico.');
        this.resetZona4();
        return;
      }

      this.zona_influe.controls['zona4'].reset({ value: '4', disabled: true });
      if (attr === 'metros4') {
        this.zona_influe.controls['metros4'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['metros4'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_andando4') {
        this.zona_influe.controls['min_andando4'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_andando4'].reset({ value: '', disabled: true });
      }
      if (attr === 'min_coche4') {
        this.zona_influe.controls['min_coche4'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['min_coche4'].reset({ value: '', disabled: true });
      }
      if (attr === 'porc_desempleo4') {
        this.zona_influe.controls['porc_desempleo4'].reset({ value: valor, disabled: false });
      } else {
        this.zona_influe.controls['porc_desempleo4'].reset({ value: '', disabled: true });
      }
      this.calcMetros();
      this.llenarFila4();
      //  this.loadZonasColor();
    } else {
      this.resetZona4();
    }

  }
  resetZona4() {
    this.zona_influe.controls['zona4'].reset({ value: '', disabled: true });
    this.zona_influe.controls['metros4'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_andando4'].reset({ value: '', disabled: false });
    this.zona_influe.controls['min_coche4'].reset({ value: '', disabled: false });
    this.zona_influe.controls['porc_desempleo4'].reset({ value: '', disabled: false });
    this.zona_influe.controls['poblacion4'].reset({ value: '', disabled: true });
    this.zona_influe.controls['familias4'].reset({ value: '', disabled: true });
    this.zona_influe.controls['ren_media4'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_menores4'].reset({ value: '', disabled: true });
    this.zona_influe.controls['por_mayores4'].reset({ value: '', disabled: true });
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio4_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
    // this.loadZonasColor();
  }
  // Fin acciones Zona4
  // Llenar datos
  llenarZonasOriginal() {
    // Icono de runner Zona Influencia
    this.runner = true;
    this.resetCanvas();
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.runner = false;
      return;
    }
    // Acciones sobre las zonas
    this.calcMetros();
    // console.log(this.metros_zona1 + ' zona 1');
    // console.log(this.metros_zona2 + ' zona 2');
    this.cordenadas1 = [];
    this.cordenadas2 = [];
    this.cordenadas3 = [];
    this.cordenadas4 = [];
    this.error_parada = false;

    console.log("Metros Z1 ", this.metros_zona1)
    if (this.metros_zona1 > 0) {
      this.llenarFila1();
    }
    if (this.metros_zona2 > 0) {
      this.llenarFila2();
    }
    if (this.metros_zona3 > 0) {
      this.llenarFila3();
    }
    if (this.metros_zona4 > 0) {
      this.llenarFila4();
    }
    this.zona_funct = setInterval(() => {
      if (this.error_parada) {
        clearInterval(this.zona_funct);
      }
      if ((this.metros_zona1 > 0 && this.cordenadas1.length === 0) || (this.metros_zona2 > 0 && this.cordenadas2.length === 0)
        || (this.metros_zona3 > 0 && this.cordenadas3.length === 0) || (this.metros_zona4 > 0 && this.cordenadas4.length === 0)) {
        // console.log('Interval en ejecucion');
        // Icono de runner Zona Influencia
        // this.runner = false;
        return;
      } else {
        // if (layers['mine']) {
        //   this.map.removeLayer('mine');
        //   this.map.removeSource('mine');
        //   console.log(layers['mine']);
        //   }
        this.loadZonasColor();
        clearInterval(this.zona_funct);
        this.runner = false;
      }
    }, 800);
    //this.loadZonasColor();
    // this.loadPoli();
  }

  llenarZonas() {
    this.dataForZone = []
    this.objZone = new ObjData()
    this.nameZone1 = ""
    this.nameZone2 = ""
    this.nameZone3 = ""
    this.nameZone4 = ""
    this.textEst = ""

    // Icono de runner Zona Influencia
    this.runner = true;
    this.resetCanvas();
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.runner = false;
      return;
    }
    // Acciones sobre las zonas
    this.calcMetros();

    this.cordenadas1 = [];
    this.cordenadas2 = [];
    this.cordenadas3 = [];
    this.cordenadas4 = [];
    this.error_parada = false;

    if (this.metros_zona1 > 0) {
      this.llenarFila1();
    }
    if (this.metros_zona2 > 0) {
      this.llenarFila2();
    }
    if (this.metros_zona3 > 0) {
      this.llenarFila3();
    }
    if (this.metros_zona4 > 0) {
      this.llenarFila4();
    }

    this.zona_funct = setInterval(() => {
      if (this.error_parada) {
        clearInterval(this.zona_funct);
      }
      if ((this.metros_zona1 > 0 && this.cordenadas1.length === 0) || (this.metros_zona2 > 0 && this.cordenadas2.length === 0)
        || (this.metros_zona3 > 0 && this.cordenadas3.length === 0) || (this.metros_zona4 > 0 && this.cordenadas4.length === 0)) {
        console.log('Interval in execution');
        return;
      } else {
        //new code
        if (this.metros_zona1 > 0 && this.cordenadas1.length > 0) {
          this.objZone = new ObjData()
          this.color_zona1 = $('div#changeColor1').css('background-color');
          this.objZone.name = this.nameZone1
          this.objZone.values = this.censal_radio1_model
          this.objZone.color = this.color_zona1
          this.objZone.municipio = this.municipio_model
          this.dataForZone.push(this.objZone)

        }

        if (this.metros_zona2 > 0 && this.cordenadas2.length > 0) {
          this.objZone = new ObjData()
          this.color_zona2 = $('div#changeColor2').css('background-color');
          this.objZone.name = this.nameZone2
          this.objZone.values = this.censal_radio2_model
          this.objZone.color = this.color_zona2
          this.objZone.municipio = this.municipio_model
          this.dataForZone.push(this.objZone)

        }

        if (this.metros_zona3 > 0 && this.cordenadas3.length > 0) {
          this.objZone = new ObjData()
          this.color_zona3 = $('div#changeColor3').css('background-color');
          this.objZone.name = this.nameZone3
          this.objZone.values = this.censal_radio3_model
          this.objZone.color = this.color_zona3
          this.objZone.municipio = this.municipio_model
          this.dataForZone.push(this.objZone)

        }

        if (this.metros_zona4 > 0 && this.cordenadas4.length > 0) {
          this.objZone = new ObjData()
          this.color_zona4 = $('div#changeColor4').css('background-color');
          this.objZone.name = this.nameZone4
          this.objZone.values = this.censal_radio4_model
          this.objZone.color = this.color_zona4
          this.objZone.municipio = this.municipio_model
          this.dataForZone.push(this.objZone)

        }
          //clear
          if(this.dataForZone.length > 4){
            this.dataForZone = []
          } 
          //end clear
          
        var separator = ', '
        this.zoneSeparatorEst(separator)
        //End new code

        this.loadZonasColor();
        clearInterval(this.zona_funct);
        this.runner = false;
      }
    }, 800);

  }

  llenarZonasAll() {
    // Icono de runner Zona Influencia
    this.runner = false;
    this.resetCanvas();
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.runner = false;
      return;
    }
    // Acciones sobre las zonas
    this.calcMetros();

    this.cordenadas1 = [];
    this.cordenadas2 = [];
    this.cordenadas3 = [];
    this.cordenadas4 = [];
    this.error_parada = false;

    if (this.metros_zona1 > 0) {
      this.llenarFila1();
    }

    if (this.metros_zona2 > 0) {
      this.llenarFila2();
    }
    if (this.metros_zona3 > 0) {
      this.llenarFila3();
    }
    if (this.metros_zona4 > 0) {
      this.llenarFila4();
    }

    this.zona_funct = setInterval(() => {
      if (this.error_parada) {
        clearInterval(this.zona_funct);
      }
      if ((this.metros_zona1 > 0 && this.cordenadas1.length === 0) || (this.metros_zona2 > 0 && this.cordenadas2.length === 0)
        || (this.metros_zona3 > 0 && this.cordenadas3.length === 0) || (this.metros_zona4 > 0 && this.cordenadas4.length === 0)) {
        console.log('Interval in execution');
        return;
      } else {
        this.loadZonasColor();
        clearInterval(this.zona_funct);
        this.runner = false;
      }
    }, 800);

  }

  // Llenar Vebntana Emergente
  llenarEmergente(zona: number) {
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      return;
    }
    $('a.home').tab('show');

    switch (zona) {
      case 1:
        this.cens_rad_emergente_model = this.censal_radio1_model;
        this.zona = 'Zona 1';
        this.distancia_estudio = this.texto_zona1;

        break;
      case 2:
        this.cens_rad_emergente_model = this.censal_radio2_model;
        this.zona = 'Zona 2';
        this.distancia_estudio = this.texto_zona2;

        break;
      case 3:
        this.cens_rad_emergente_model = this.censal_radio3_model;
        this.zona = 'Zona 3';
        this.distancia_estudio = this.texto_zona3;

        break;
      case 4:
        this.cens_rad_emergente_model = this.censal_radio4_model;
        this.zona = 'Zona 4';
        this.distancia_estudio = this.texto_zona4;

        break;
      default:
        break;
    }
    //  probando transito ********************----- TEMPORAL
    this.transito_table = [];
    this.transito_grafico = [];
    this.transito_grafico = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.indices = [];
    // Vovle a Cargar DataTable
    this.datatable.clear();
    this.datatable.rows.add(this.transito_table);
    this.datatable.draw();
    this.censService.getPuntosInteres(this.lat, this.lng, 200, this.tipos).subscribe((data_puntos: any) => {

      this.transito_table2 = data_puntos;
      this.llenarTransito();
    }, (error) => {
      alert('Ha ocurrido un error al cargar el servicio puntos de interés.');
      console.log(error);
    });


  }


  // LLenar cada fila de las Zonas
  llenarFila1() {
    this.isZone1 = "false"
    this.isErrorZone1 = "false"

    if (this.metros_zona1 === 0) {
      this.isZone1 = ""
      this.isErrorZone1 = ""
      return;
    }
    const metros1 = this.zona_influe.get('metros1').value;
    const min_andando1 = this.zona_influe.get('min_andando1').value;
    const min_coche1 = this.zona_influe.get('min_coche1').value;
    const data_api: DataApiModel = {
      x: 0,
      y: 0,
      recorrido: 0,
      unidad: null,
      medio: null,
    };
    data_api.x = this.lat;
    data_api.y = this.lng;
    if (metros1 !== '') {
      data_api.recorrido = parseInt(metros1);
      data_api.unidad = 'met';
      data_api.medio = 'w';

      this.nameZone1 = data_api.recorrido + " metros"

    } else if (min_andando1 !== '') {
      data_api.recorrido = parseInt(min_andando1);
      data_api.unidad = 'min';
      data_api.medio = 'w';

      this.nameZone1 = data_api.recorrido + " minutos andando"

    } else if (min_coche1 !== '') {
      data_api.recorrido = parseInt(min_coche1);
      data_api.unidad = 'min';
      data_api.medio = 'c';

      this.nameZone1 = data_api.recorrido + " minutos en coche"

    }

    // Llamada al microservicio censal-radio
    this.censService.getDataZona(data_api).subscribe((data: any) => {
      if (data.Error) {
        this._ns.info(data.Error, '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
      }

      this.isZone1 = "true"

      if (!data.Error) {
        console.log("Data error Z1 ")
        this.cordenadas1 = data['perimetro'];

        this.censal_radio1_model = data['registro'];
        this.censal_radio1_model.Porc_de_poblacion_mas_65 = data['registro']['Porc_de_población_mas_65'];
        this.censal_radio1_model.Porc_de_poblacion_menor_18 = data['registro']['Porc_de_población_menor_18'];
      }
      // Levando escala 100
      this.censal_radio1_model.Fue_de_ing_pensiones = this.censal_radio1_model.Fue_de_ing_pensiones * 100;
      this.censal_radio1_model.Fue_de_ing_prestaciones_por_desempleo = this.censal_radio1_model.Fue_de_ing_prestaciones_por_desempleo * 100;
      this.censal_radio1_model.Fue_de_ing_salario = this.censal_radio1_model.Fue_de_ing_salario * 100;
      this.censal_radio1_model.Fue_de_ingreso_otras_prestaciones = this.censal_radio1_model.Fue_de_ingreso_otras_prestaciones * 100;
      this.censal_radio1_model.Fue_de_ingreso_otros_ingresos = this.censal_radio1_model.Fue_de_ingreso_otros_ingresos * 100;
      this.censal_radio1_model.Porc_de_poblacion_mas_65 = this.censal_radio1_model.Porc_de_poblacion_mas_65 * 100;
      this.censal_radio1_model.Porc_de_poblacion_menor_18 = this.censal_radio1_model.Porc_de_poblacion_menor_18 * 100;
      this.censal_radio1_model.Porc_hogares_unipersonales = this.censal_radio1_model.Porc_hogares_unipersonales * 100;
      this.censal_radio1_model.por_poblacion_renta_menor_5000 = this.censal_radio1_model.por_poblacion_renta_menor_5000 * 100;
      this.censal_radio1_model.por_poblacion_renta_menor_7500 = this.censal_radio1_model.por_poblacion_renta_menor_7500 * 100;
      this.censal_radio1_model.por_poblacion_renta_menor_10000 = this.censal_radio1_model.por_poblacion_renta_menor_10000 * 100;

      this.zona_influe.controls['ren_media1'].reset({
        value: this.formatDecimal.formatear(this.censal_radio1_model.Renta_media_por_persona), disabled: true
      });

      this.zona_influe.controls['poblacion1'].reset({
        value: this.formatDecimal.formatear(this.censal_radio1_model.total_poblacion), disabled: true
      });

      this.zona_influe.controls['familias1'].reset({
        value: this.formatDecimal.formatear(
          Math.round((this.censal_radio1_model.total_poblacion / this.censal_radio1_model.Tam_medio_hogar))), disabled: true
      });
      this.zona_influe.controls['por_menores1'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio1_model.Porc_de_poblacion_menor_18), disabled: true
      });
      this.zona_influe.controls['por_mayores1'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio1_model.Porc_de_poblacion_mas_65), disabled: true
      });
      this.zona_influe.controls['porc_desempleo1'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio1_model.Fue_de_ing_prestaciones_por_desempleo), disabled: true
      });

      //this.loadZoneColor()
    }, (error) => {
      alert('Ha ocurrido un error al llenar la zona 1.');
      this.error_parada = true;
      this.isErrorZone1 = "true"
      console.log(error);
    });

  }
  // Fila 2
  llenarFila2() {
    this.isZone2 = "false"
    this.isErrorZone2 = "false"

    if (this.metros_zona2 === 0) {
      this.isZone2 = ""
      this.isErrorZone2 = ""
      return;
    }
    const metros2 = this.zona_influe.get('metros2').value;
    const min_andando2 = this.zona_influe.get('min_andando2').value;
    const min_coche2 = this.zona_influe.get('min_coche2').value;
    const data_api: DataApiModel = {
      x: 0,
      y: 0,
      recorrido: 0,
      unidad: null,
      medio: null,
    };
    data_api.x = this.lat;
    data_api.y = this.lng;
    if (metros2 !== '') {
      data_api.recorrido = parseInt(metros2);
      data_api.unidad = 'met';
      data_api.medio = 'w';

      this.nameZone2 = data_api.recorrido + " metros"

    } else if (min_andando2 !== '') {
      data_api.recorrido = parseInt(min_andando2);
      data_api.unidad = 'min';
      data_api.medio = 'w';

      this.nameZone2 = data_api.recorrido + " minutos andando"

    } else if (min_coche2 !== '') {
      data_api.recorrido = parseInt(min_coche2);
      data_api.unidad = 'min';
      data_api.medio = 'c';

      this.nameZone2 = data_api.recorrido + " minutos en coche"
    }

    // Llamada al microservicio censal-radio
    this.censService.getDataZona(data_api).subscribe((data: any) => {
      if (data.Error) {
        this._ns.info(data.Error, '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
      }

      this.isZone2 = "true"

      if (!data.Error) {
        console.log("Data error Z2 ")
        this.cordenadas2 = data['perimetro'];

        this.censal_radio2_model = data['registro'];

        this.censal_radio2_model.Porc_de_poblacion_mas_65 = data['registro']['Porc_de_población_mas_65'];
        this.censal_radio2_model.Porc_de_poblacion_menor_18 = data['registro']['Porc_de_población_menor_18'];
      }
      // Levando escala 100
      this.censal_radio2_model.Fue_de_ing_pensiones = this.censal_radio2_model.Fue_de_ing_pensiones * 100;
      this.censal_radio2_model.Fue_de_ing_prestaciones_por_desempleo = this.censal_radio2_model.Fue_de_ing_prestaciones_por_desempleo * 100;
      this.censal_radio2_model.Fue_de_ing_salario = this.censal_radio2_model.Fue_de_ing_salario * 100;
      this.censal_radio2_model.Fue_de_ingreso_otras_prestaciones = this.censal_radio2_model.Fue_de_ingreso_otras_prestaciones * 100;
      this.censal_radio2_model.Fue_de_ingreso_otros_ingresos = this.censal_radio2_model.Fue_de_ingreso_otros_ingresos * 100;
      this.censal_radio2_model.Porc_de_poblacion_mas_65 = this.censal_radio2_model.Porc_de_poblacion_mas_65 * 100;
      this.censal_radio2_model.Porc_de_poblacion_menor_18 = this.censal_radio2_model.Porc_de_poblacion_menor_18 * 100;
      this.censal_radio2_model.Porc_hogares_unipersonales = this.censal_radio2_model.Porc_hogares_unipersonales * 100;
      this.censal_radio2_model.por_poblacion_renta_menor_5000 = this.censal_radio2_model.por_poblacion_renta_menor_5000 * 100;
      this.censal_radio2_model.por_poblacion_renta_menor_7500 = this.censal_radio2_model.por_poblacion_renta_menor_7500 * 100;
      this.censal_radio2_model.por_poblacion_renta_menor_10000 = this.censal_radio2_model.por_poblacion_renta_menor_10000 * 100;

      this.zona_influe.controls['ren_media2'].reset({
        value: this.formatDecimal.formatear(this.censal_radio2_model.Renta_media_por_persona), disabled: true
      });

      this.zona_influe.controls['poblacion2'].reset({
        value: this.formatDecimal.formatear(this.censal_radio2_model.total_poblacion), disabled: true
      });

      this.zona_influe.controls['familias2'].reset({
        value: this.formatDecimal.formatear(
          Math.round((this.censal_radio2_model.total_poblacion / this.censal_radio2_model.Tam_medio_hogar))), disabled: true
      });
      this.zona_influe.controls['por_menores2'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio2_model.Porc_de_poblacion_menor_18), disabled: true
      });
      this.zona_influe.controls['por_mayores2'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio2_model.Porc_de_poblacion_mas_65), disabled: true
      });
      this.zona_influe.controls['porc_desempleo2'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio2_model.Fue_de_ing_prestaciones_por_desempleo), disabled: true
      });

      //this.loadZoneColor()
    }, (error) => {
      alert('Ha ocurrido un error al llenar la zona 2.');
      this.error_parada = true;
      this.isErrorZone2 = "true"
      console.log(error);
    });

  }


  llenarFila3() {
    this.isZone3 = "false"
    this.isErrorZone3 = "false"

    if (this.metros_zona3 === 0) {
      this.isZone3 = ""
      this.isErrorZone3 = ""
      return;
    }
    const metros3 = this.zona_influe.get('metros3').value;
    const min_andando3 = this.zona_influe.get('min_andando3').value;
    const min_coche3 = this.zona_influe.get('min_coche3').value;
    const data_api: DataApiModel = {
      x: 0,
      y: 0,
      recorrido: 0,
      unidad: null,
      medio: null,
    };
    data_api.x = this.lat;
    data_api.y = this.lng;
    if (metros3 !== '') {
      data_api.recorrido = parseInt(metros3);
      data_api.unidad = 'met';
      data_api.medio = 'w';

      this.nameZone3 = data_api.recorrido + " metros"

    } else if (min_andando3 !== '') {
      data_api.recorrido = parseInt(min_andando3);
      data_api.unidad = 'min';
      data_api.medio = 'w';

      this.nameZone3 = data_api.recorrido + " minutos andando"

    } else if (min_coche3 !== '') {
      data_api.recorrido = parseInt(min_coche3);
      data_api.unidad = 'min';
      data_api.medio = 'c';

      this.nameZone3 = data_api.recorrido + " minutos en coche"
    }

    // Llamada al microservicio censal-radio
    this.censService.getDataZona(data_api).subscribe((data: any) => {

      if (data.Error) {
        this._ns.info(data.Error, '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
      }

      this.isZone3 = "true"

      if (!data.Error) {
        this.cordenadas3 = data['perimetro'];

        this.censal_radio3_model = data['registro'];

        this.censal_radio3_model.Porc_de_poblacion_mas_65 = data['registro']['Porc_de_población_mas_65'];
        this.censal_radio3_model.Porc_de_poblacion_menor_18 = data['registro']['Porc_de_población_menor_18'];
      }
      // Levando escala 100
      this.censal_radio3_model.Fue_de_ing_pensiones = this.censal_radio3_model.Fue_de_ing_pensiones * 100;
      this.censal_radio3_model.Fue_de_ing_prestaciones_por_desempleo = this.censal_radio3_model.Fue_de_ing_prestaciones_por_desempleo * 100;
      this.censal_radio3_model.Fue_de_ing_salario = this.censal_radio3_model.Fue_de_ing_salario * 100;
      this.censal_radio3_model.Fue_de_ingreso_otras_prestaciones = this.censal_radio3_model.Fue_de_ingreso_otras_prestaciones * 100;
      this.censal_radio3_model.Fue_de_ingreso_otros_ingresos = this.censal_radio3_model.Fue_de_ingreso_otros_ingresos * 100;
      this.censal_radio3_model.Porc_de_poblacion_mas_65 = this.censal_radio3_model.Porc_de_poblacion_mas_65 * 100;
      this.censal_radio3_model.Porc_de_poblacion_menor_18 = this.censal_radio3_model.Porc_de_poblacion_menor_18 * 100;
      this.censal_radio3_model.Porc_hogares_unipersonales = this.censal_radio3_model.Porc_hogares_unipersonales * 100;
      this.censal_radio3_model.por_poblacion_renta_menor_5000 = this.censal_radio3_model.por_poblacion_renta_menor_5000 * 100;
      this.censal_radio3_model.por_poblacion_renta_menor_7500 = this.censal_radio3_model.por_poblacion_renta_menor_7500 * 100;
      this.censal_radio3_model.por_poblacion_renta_menor_10000 = this.censal_radio3_model.por_poblacion_renta_menor_10000 * 100;

      this.zona_influe.controls['ren_media3'].reset({
        value: this.formatDecimal.formatear(this.censal_radio3_model.Renta_media_por_persona), disabled: true
      });

      this.zona_influe.controls['poblacion3'].reset({
        value: this.formatDecimal.formatear(this.censal_radio3_model.total_poblacion), disabled: true
      });

      this.zona_influe.controls['familias3'].reset({
        value: this.formatDecimal.formatear(
          Math.round((this.censal_radio3_model.total_poblacion / this.censal_radio3_model.Tam_medio_hogar))), disabled: true
      });
      this.zona_influe.controls['por_menores3'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio3_model.Porc_de_poblacion_menor_18), disabled: true
      });
      this.zona_influe.controls['por_mayores3'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio3_model.Porc_de_poblacion_mas_65), disabled: true
      });
      this.zona_influe.controls['porc_desempleo3'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio3_model.Fue_de_ing_prestaciones_por_desempleo), disabled: true
      });

      //this.loadZoneColor()
    }, (error) => {
      alert('Ha ocurrido un error al llenar la zona 3.');
      this.error_parada = true;
      this.isErrorZone3 = "true"
      console.log(error);
    });

  }
  // Fila 4
  llenarFila4() {

    this.isZone4 = "false"
    this.isErrorZone4 = "false"

    if (this.metros_zona4 === 0) {
      this.isZone4 = ""
      this.isErrorZone4 = ""
      return;
    }
    const metros4 = this.zona_influe.get('metros4').value;
    const min_andando4 = this.zona_influe.get('min_andando4').value;
    const min_coche4 = this.zona_influe.get('min_coche4').value;
    const data_api: DataApiModel = {
      x: 0,
      y: 0,
      recorrido: 0,
      unidad: null,
      medio: null,
    };
    data_api.x = this.lat;
    data_api.y = this.lng;
    if (metros4 !== '') {
      data_api.recorrido = parseInt(metros4);
      data_api.unidad = 'met';
      data_api.medio = 'w';

      this.nameZone4 = data_api.recorrido + " metros"

    } else if (min_andando4 !== '') {
      data_api.recorrido = parseInt(min_andando4);
      data_api.unidad = 'min';
      data_api.medio = 'w';

      this.nameZone4 = data_api.recorrido + " minutos en coche"

    } else if (min_coche4 !== '') {
      data_api.recorrido = parseInt(min_coche4);
      data_api.unidad = 'min';
      data_api.medio = 'c';

      this.nameZone4 = data_api.recorrido + " minutos en coche"

    }
    // Llamada al microservicio censal-radio
    this.censService.getDataZona(data_api).subscribe((data: any) => {
      if (data.Error) {
        this._ns.info(data.Error, '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
      }

      this.isZone4 = true

      if (data.Error) {
        this.cordenadas4 = data['perimetro'];
        this.censal_radio4_model = data['registro'];

        this.censal_radio4_model.Porc_de_poblacion_mas_65 = data['registro']['Porc_de_población_mas_65'];
        this.censal_radio4_model.Porc_de_poblacion_menor_18 = data['registro']['Porc_de_población_menor_18'];
      }
      // Levando escala 100
      this.censal_radio4_model.Fue_de_ing_pensiones = this.censal_radio4_model.Fue_de_ing_pensiones * 100;
      this.censal_radio4_model.Fue_de_ing_prestaciones_por_desempleo = this.censal_radio4_model.Fue_de_ing_prestaciones_por_desempleo * 100;
      this.censal_radio4_model.Fue_de_ing_salario = this.censal_radio4_model.Fue_de_ing_salario * 100;
      this.censal_radio4_model.Fue_de_ingreso_otras_prestaciones = this.censal_radio4_model.Fue_de_ingreso_otras_prestaciones * 100;
      this.censal_radio4_model.Fue_de_ingreso_otros_ingresos = this.censal_radio4_model.Fue_de_ingreso_otros_ingresos * 100;
      this.censal_radio4_model.Porc_de_poblacion_mas_65 = this.censal_radio4_model.Porc_de_poblacion_mas_65 * 100;
      this.censal_radio4_model.Porc_de_poblacion_menor_18 = this.censal_radio4_model.Porc_de_poblacion_menor_18 * 100;
      this.censal_radio4_model.Porc_hogares_unipersonales = this.censal_radio4_model.Porc_hogares_unipersonales * 100;
      this.censal_radio4_model.por_poblacion_renta_menor_5000 = this.censal_radio4_model.por_poblacion_renta_menor_5000 * 100;
      this.censal_radio4_model.por_poblacion_renta_menor_7500 = this.censal_radio4_model.por_poblacion_renta_menor_7500 * 100;
      this.censal_radio4_model.por_poblacion_renta_menor_10000 = this.censal_radio4_model.por_poblacion_renta_menor_10000 * 100;

      // console.log('Censal LOcal', this.censal_radio4_model);

      this.zona_influe.controls['ren_media4'].reset({
        value: this.formatDecimal.formatear(this.censal_radio4_model.Renta_media_por_persona), disabled: true
      });

      this.zona_influe.controls['poblacion4'].reset({
        value: this.formatDecimal.formatear(this.censal_radio4_model.total_poblacion), disabled: true
      });

      this.zona_influe.controls['familias4'].reset({
        value: this.formatDecimal.formatear(
          Math.round((this.censal_radio4_model.total_poblacion / this.censal_radio4_model.Tam_medio_hogar))), disabled: true
      });
      this.zona_influe.controls['por_menores4'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio4_model.Porc_de_poblacion_menor_18), disabled: true
      });
      this.zona_influe.controls['por_mayores4'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio4_model.Porc_de_poblacion_mas_65), disabled: true
      });
      this.zona_influe.controls['porc_desempleo4'].reset({
        value: this.formatDecimal.formatearPorc(this.censal_radio4_model.Fue_de_ing_prestaciones_por_desempleo), disabled: true
      });

      //this.loadZoneColor()
    }, (error) => {
      alert('Ha ocurrido un error en la zona 4.');
      this.error_parada = true;
      this.isErrorZone4 = "true"
      console.log(error);
    });


  }
  // Cargar Extremos mapa
  loadExtremos() {
    // console.log(data);
    const v_this = this;
    //  this.map.on('load', function(e) {
    // Extremos sw and ne del mapa
    const map_cor = v_this.map.getBounds();
    v_this.sureste = map_cor.getSouthEast();
    v_this.noroeste = map_cor.getNorthWest();
    // console.log('Punto',v_this.noroeste['lat']);
    // });
  }

  // Cargar el mapa
  loadMap() {

    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.lng, this.lat]
    });
    // full screen
    this.map.addControl(new mapboxgl.FullscreenControl());

    // // Add map controls
    this.marker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
    this.loadCordenada();
  }
  // cargar coordenadas cuando se hece click
  loadCordenada() {
    this.isNormalizeReverse = false
    // Marcar Coordenadas mapa
    const _var_cord = this.var_cord;
    const v_this = this;
    this.map.on('click', function (e) {
      if (v_this.var_cord === true) {
        //  console.log(e.lngLat.wrap()['lat']);
        const dir_literal = e.lngLat.wrap();
        //  console.log(dir_literal);
        v_this.censService.getNormalizaInversa(dir_literal['lat'], dir_literal['lng']).subscribe((data: any) => {
          // console.log(data);
          v_this.dir_literal_cuadro = data['direccion'];
          v_this.visible_area_dir = true;
          $('#txt_literal').focus();

          this.isNormalizeReverse = true
        }, (error) => {
          alert('Ha ocurrido un error.');
          //   console.log(error);
        });
        //   v_this.geoInverse.getDirecc(dir_literal).subscribe((data: any) => {
        //     v_this.dir_literal = data.features[0].place_name;
        //   }, (error) => {
        //     alert('Ha ocurrido un error!! ');
        //     console.log(error);
        // });
      }
    });
  }
  // Cagar street View
  /*loadStreet() {
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'),
      {
        position: {lat: this.lat, lng: this.lng},
        pov: {heading: 165, pitch: 0},
        zoom: 1
      });
  }*/
  // Cargar el mapa y llamar a dos microservicios
  loadDataTxt() {
    this.dir_literal = this.dir_literal_cuadro;
    this.visible_area_dir = false;
    this.dir_literal_cuadro = '';
    //console.log('AQUI');
    this.loadData();
  }
  onBlurTxt() {
    const v_this = this;
    setTimeout(function () {
      v_this.visible_area_dir = false;
      v_this.dir_literal_cuadro = '';
      //  console.log('Se perdio');
    }, 400);


  }
  loadData(event?) {
    localStorage.setItem("dirLiteral", JSON.stringify(this.dir_literal))
    this.mapService.sendMessageDirLiteral(this.dir_literal)

    this.isDir = "false"
    this.isErrorDir = "false"
    this.isComboEstVenta = "false"
    this.isErrorComboEstVenta = "false"
    this.isCensal = "false"
    this.isErrorCensal = "false"
    this.isErrorMeteorologia = "false"
    this.isMeteorologia = "false"
    this.isMunicipio = "false"
    this.isErrorMunicipio = "false"


    if (event !== undefined) {
      if (event.keyCode !== 13) {
        this.isDir = ""
        this.isErrorDir = ""
        this.isComboEstVenta = ""
        this.isErrorComboEstVenta = ""
        this.isCensal = ""
        this.isErrorCensal = ""
        this.isErrorMeteorologia = ""
        this.isMeteorologia = ""
        this.isMunicipio = ""
        this.isErrorMunicipio = ""
        return;
      }
    }
    if (this.dir_literal.trim() === '') {
      this.isDir = ""
      this.isErrorDir = ""
      this.isComboEstVenta = ""
      this.isErrorComboEstVenta = ""
      this.isCensal = ""
      this.isErrorCensal = ""
      this.isErrorMeteorologia = ""
      this.isMeteorologia = ""
      this.isMunicipio = ""
      this.isErrorMunicipio = ""
      alert('Debe ingresar una dirección literal.');
      return;
    }
    const usuario: Usuario = {
      alias: '',
      pass: ''
    };
    if (localStorage.length > 0) {


      if (localStorage.getItem('usuario') !== null) {
        usuario.alias = JSON.parse(localStorage.getItem('usuario')).alias;
        usuario.pass = JSON.parse(localStorage.getItem('usuario')).pass;

      } else {
        alert('Debe Autenticarse');
        this.route.navigateByUrl('/login');
        return;
      }
    } else {

      alert('Debe Autenticarse');
      this.route.navigateByUrl('/login');
      return;
    }

    this.mapService.getAttrPrivate(this.dir_literal, usuario).subscribe((data: MapModel) => {
      this.isDir = "true"

      if (data.salida_ok === false) {
        this.isDir = ""
        this.isErrorDir = ""
        this.isComboEstVenta = ""
        this.isErrorComboEstVenta = ""
        this.isCensal = ""
        this.isErrorCensal = ""
        this.isErrorMeteorologia = ""
        this.isMeteorologia = ""
        this.isMunicipio = ""
        this.isErrorMunicipio = ""

        this._ns.info('No se pudo normalizar la direccón ingresada', '', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
        //alert('No se pudo normalizar la direccón ingresada');
        return;
      }
      //resetaer Elementos de Ubicaciones
      this.resetGridValues();
      this.resetCanvas();
      this.resetTableUbic();
      this.var_interaccion = '';
      this.visible_canva = false;
      //-----------------------------

      this.map_model = data;
      this.lat = Number(this.map_model.latitud);
      this.lng = Number(this.map_model.longitud);

      this.getPuntoInteres()
      //this.getPuntoInteresCompetenciaChart()

      this.area_busq = "300"
      this.getPuntoInteresCompetencia()

      mapboxgl.accessToken = environment.mapbox.accessToken;
      this.loadMap();

      // Para cargar los combos de Estimacion de ventas  -----********-----
      this.censService.getParamVentas(usuario.alias).subscribe((dataVenta: any) => {

        this.isComboEstVenta = "true"

        this.llenarComboCompetencia(dataVenta);
      }, (error) => {
        this.isErrorComboEstVenta = "true"
        alert('Ha ocurrido un error al cargar el servicio estimación de ventas.');
        console.log(error);
      });
      /**
       * Cargando Censal Get
       */
      this.censService.getCensalAttr(this.lng, this.lat).subscribe((censal: CensalModel | any) => {
        this.isCensal = "true"
        this.censal_model = censal;

        //para cargar Opciones de Visualizacion
        this.metros_zona1 = 0;
        this.metros_zona2 = 0;
        this.metros_zona3 = 0;
        this.metros_zona4 = 0;
        this.cordenadas1 = [];
        this.cordenadas2 = [];
        this.cordenadas3 = [];
        this.cordenadas4 = [];

        //new code
        this.visible_comp = false
        this.visible_vivi = false
        this.viviendas_cor = []
        this.competencias_cor = []
        //End new code
        this.loadOpcionesVisual();

        const cod = this.censal_model.c_seccion.substring(0, 5);
        // Se carga valores de municipio
        this.censService.getCensalMunic(cod).subscribe((municipio: CensalRadioModelMunc | any) => {

        }, (error) => {
          alert('Ha ocurrido un error al cargar el servicio censal municipio.');
          console.log(error);
        });
        // llamado a nuevo api Municipio
        this.censService.getCensalMunicipio(cod).subscribe((municipio: CensalRadioModelMunc | any) => {
          this.isMunicipio = "true"

          this.municipio_model = municipio;
          this.municipio_model.fu_de_ing_pensiones = this.municipio_model.fu_de_ing_pensiones * 100;
          this.municipio_model.fue_de_ing_prestaciones_por_desempleo = this.municipio_model.fue_de_ing_prestaciones_por_desempleo * 100;
          this.municipio_model.fu_de_ing_salario = this.municipio_model.fu_de_ing_salario * 100;
          this.municipio_model.fue_de_ingreso_otras_prestaciones = this.municipio_model.fue_de_ingreso_otras_prestaciones * 100;
          this.municipio_model.fue_de_ingreso_otros_ingresos = this.municipio_model.fue_de_ingreso_otros_ingresos * 100;
          this.municipio_model.porc_de_poblacion_mas_65 = this.municipio_model.porc_de_poblacion_mas_65 * 100;
          this.municipio_model.porc_de_poblacion_menor_18 = this.municipio_model.porc_de_poblacion_menor_18 * 100;
          this.municipio_model.porc_hogares_unipersonales = this.municipio_model.porc_hogares_unipersonales * 100;
          this.municipio_model.por_poblacion_renta_menor_5000 = this.municipio_model.por_poblacion_renta_menor_5000 * 100;
          this.municipio_model.por_poblacion_renta_menor_7500 = this.municipio_model.por_poblacion_renta_menor_7500 * 100;
          this.municipio_model.por_poblacion_renta_menor_10000 = this.municipio_model.por_poblacion_renta_menor_10000 * 100;

        }, (error) => {
          this.isErrorMunicipio = "true"
          alert('Ha ocurrido un error al cargar el servicio censal municipio');
          console.log(error);
        });
        // end de censal

        // Datos meteorologia
        /*this.censService.getMeteoroloia(this.censal_model.c_seccion).subscribe((meteoro: any) => {
          this.isMeteorologia = "true"
          this.construirMetoro(meteoro);

        }, (error) => {

          this.isErrorMeteorologia = "true"

          alert('Ha ocurrido un error al cargar el servicio datos meteorológico.');
          console.log(error);
        });*/
      }, (error) => {
        this.isErrorCensal = "true"
        alert('Ha ocurrido un error al cargar el servicio sección censal.');
        console.log(error);
      });
    }, (msgError) => {
      this.isErrorDir = "true"
      this.isDir = ""
      this.isComboEstVenta = ""
      this.isErrorComboEstVenta = ""
      this.isCensal = ""
      this.isErrorCensal = ""
      this.isErrorMeteorologia = ""
      this.isMeteorologia = ""
      this.isMunicipio = ""
      this.isErrorMunicipio = ""

      console.log(msgError.error.text);
      if (msgError.error.text === 'No existe el usuario') {
        alert('No existe el usuario.');
        this.route.navigateByUrl('/login');
      } else {
        alert('Ha ocurrido un error aquí.');
        console.log(msgError.error.text);
      }

    });
    /*this.resetZona1();
    this.resetZona2();
    this.resetZona3();
    this.resetZona4();*/
  }
  construirMetoro(meteoro: any) {
    this.meteorologia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const v_this = this;
    meteoro.forEach(function (elemento, indice, array) {
      //console.log(elemento, indice);
      let key = Object.keys(elemento);
      let pos = key[0];
      pos = pos.substr(-2);
      let pos_int = parseInt(pos);

      v_this.meteorologia[pos_int - 1] = elemento[key[0]];
      //  this.meteorologia.push(elemento);
      //console.log('Meteoro',v_this.meteorologia);
    });
  }
  /**
  * Metodo para pintar las zonas en el mapa
  *
 /**
  *
  *
  * @memberof MicservEstimadorComponent
  */
  llenarComboCompetencia(dataVenta: any) {

    let data_indicador = [];
    let data_modelo = [];
    dataVenta.indicadores.forEach(function (elemento, indice, array) {
      data_indicador.push({ value: elemento, label: elemento });
    });
    dataVenta.tipo_modelo.forEach(function (elemento, indice, array) {
      data_modelo.push({ value: elemento, label: elemento });
    });
    this.venta_modelo = data_modelo;
    //this.venta_indicador = data_indicador;// new correction

  }
  /**
   * Metodo para pintar las zonas en el mapa
   *
  /**
   *
   *
   * @memberof MicservEstimadorComponent
   */
  loadZonasColorOriginal() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.lng, this.lat]
    });
    // full screen
    this.map.addControl(new mapboxgl.FullscreenControl());

    // // Add map controls
    this.marker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
    const lat = this.lat;
    const lng = this.lng;
    const map = this.map;
    const _viviendas_cor = this.viviendas_cor;
    const _competencias_cor = this.competencias_cor;
    const _centros_cor = this.centros_cor;

    // const cordenadas = this.cordenadas;
    /*const color_zona1 = $('#zona1-tr td:first-child input').css('background-color');
    const color_zona2 = $('#zona2-tr td:first-child input').css('background-color');
    const color_zona3 = $('#zona3-tr td:first-child input').css('background-color');
    const color_zona4 = $('#zona4-tr td:first-child input').css('background-color');*/

    const color_zona1 = $('div#changeColor1').css('background-color');
    const color_zona2 = $('div#changeColor2').css('background-color');
    const color_zona3 = $('div#changeColor3').css('background-color');
    const color_zona4 = $('div#changeColor4').css('background-color');

    const changeCord = function (list) {
      const new_list = [];
      list.forEach(element => {
        new_list.push(element.reverse());
      });
      return new_list;
    };

    let cordenadas1 = JSON.stringify(changeCord(this.cordenadas1));
    cordenadas1 = JSON.parse(cordenadas1);
    let cordenadas2 = JSON.stringify(changeCord(this.cordenadas2));
    cordenadas2 = JSON.parse(cordenadas2);
    let cordenadas3 = JSON.stringify(changeCord(this.cordenadas3));
    cordenadas3 = JSON.parse(cordenadas3);
    let cordenadas4 = JSON.stringify(changeCord(this.cordenadas4));
    cordenadas4 = JSON.parse(cordenadas4);

    const metrosZ1 = this.metros_zona1;
    const metrosZ2 = this.metros_zona2;
    const metrosZ3 = this.metros_zona3;
    const metrosZ4 = this.metros_zona4;
    // Construyendo arreglo para ordenar
    const circulos = [
      { metros: metrosZ1, color: color_zona1, id: 'Zona1', recurso: 'Circ_Zona1', cordenadas: cordenadas1 },
      { metros: metrosZ2, color: color_zona2, id: 'Zona2', recurso: 'Circ_Zona2', cordenadas: cordenadas2 },
      { metros: metrosZ3, color: color_zona3, id: 'Zona3', recurso: 'Circ_Zona3', cordenadas: cordenadas3 },
      { metros: metrosZ4, color: color_zona4, id: 'Zona4', recurso: 'Circ_Zona4', cordenadas: cordenadas4 },
    ];
    circulos.sort(function (a, b) {
      //return b.metros - a.metros ;
      return b.cordenadas.length - a.cordenadas.length;
    });
    // console.log(circulos);
    // console.log('Antes map On Cor1', cordenadas1);
    // console.log('Antes map On Cor2', cordenadas2);
    /**
     * PIntar Puntos de visualizacion
    */
    const puntos_viviendas = this.viviendas_cor;
    const pintar_poligonos = function () {
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': { 'c': 'Uno' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [circulos[0].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Dos' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[1].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Tres' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[2].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Cuatro' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[3].cordenadas
                ]
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'c',
            type: 'categorical',
            stops: [
              ['Uno', circulos[0].color],
              ['Dos', circulos[1].color],
              ['Tres', circulos[2].color],
              ['Cuatro', circulos[3].color]]
          },
          'fill-opacity': 0.5
        }
      });
    };
    const pintar_puntos = function (color, cord, id, recurso) {
      // if(metros1 != ''|| min_andando1 != '' || min_coche1!= ''){
      // console.log(recurso);
      var list = {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          "features": []
        }
      };
      cord.forEach(element => {
        list.data.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [element[0], element[1]]
          }
        });
      });
      var json = JSON.stringify(list);
      // console.log('normal', json);
      json = JSON.parse(json);
      // console.log('parse',json);
      map.addSource(recurso, json);

      map.addLayer({
        'id': id,
        'type': 'circle',
        'source': recurso,
        'paint': {
          'circle-radius': 3,
          'circle-color': color,
          'circle-opacity': 0.8
        }
      });
    }; // end function

    // Pintar los diferentes elementos
    //  pintar_poligonos();
    // if (_viviendas_cor.length > 0) {
    //   pintar_puntos('blue', _viviendas_cor, 'layer_viviendas', 'rec_viviendas' );
    // }
    // if (_centros_cor.length > 0) {
    //   pintar_puntos('#FFFFFF', _centros_cor, 'layer_centros', 'rec_centros' );
    //   }
    // if (_competencias_cor.length > 0) {
    //   pintar_puntos('red', _competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor' );
    // }
    //-----------------------------------------
    this.map.on('load', function () {

      // centros propios
      if (_viviendas_cor.length > 0) {
        pintar_puntos('blue', _viviendas_cor, 'layer_viviendas', 'rec_viviendas');
      }
      if (_centros_cor.length > 0) {
        pintar_puntos('#FFFFFF', _centros_cor, 'layer_centros', 'rec_centros');
      }
      if (_competencias_cor.length > 0) {
        pintar_puntos('red', _competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor');
      }


      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': { 'c': 'Uno' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [circulos[0].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Dos' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[1].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Tres' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[2].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Cuatro' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[3].cordenadas
                ]
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'c',
            type: 'categorical',
            stops: [
              ['Uno', circulos[0].color],
              ['Dos', circulos[1].color],
              ['Tres', circulos[2].color],
              ['Cuatro', circulos[3].color]]
          },
          'fill-opacity': 0.5
        }
      });
      // Pintar puntos viviendas
      // var i = 0;
      // puntos_viviendas.forEach(element => {      // console.log(element);
      //     if(i<100){
      //       pintar_puntos('#B42222', element, 'Point_' + i, 'vivienda'+ i);
      //     }

      //     i++;
      //   });
    });   // end load
  }

  loadZonasColor() {

    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.lng, this.lat]
    });
    // full screen
    this.map.addControl(new mapboxgl.FullscreenControl());

    // // Add map controls
    this.marker = new mapboxgl.Marker()
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
    const lat = this.lat;
    const lng = this.lng;
    const map = this.map;
    const _viviendas_cor = this.viviendas_cor;
    const _competencias_cor = this.competencias_cor;
    const _centros_cor = this.centros_cor;

    const color_zona1 = $('div#changeColor1').css('background-color');
    const color_zona2 = $('div#changeColor2').css('background-color');
    const color_zona3 = $('div#changeColor3').css('background-color');
    const color_zona4 = $('div#changeColor4').css('background-color');

    const changeCord = function (list) {
      const new_list = [];
      list.forEach(element => {
        new_list.push(element.reverse());
      });
      return new_list;
    };

    let cordenadas1 = JSON.stringify(changeCord(this.cordenadas1));
    cordenadas1 = JSON.parse(cordenadas1);
    let cordenadas2 = JSON.stringify(changeCord(this.cordenadas2));
    cordenadas2 = JSON.parse(cordenadas2);
    let cordenadas3 = JSON.stringify(changeCord(this.cordenadas3));
    cordenadas3 = JSON.parse(cordenadas3);
    let cordenadas4 = JSON.stringify(changeCord(this.cordenadas4));
    cordenadas4 = JSON.parse(cordenadas4);

    const metrosZ1 = this.metros_zona1;
    const metrosZ2 = this.metros_zona2;
    const metrosZ3 = this.metros_zona3;
    const metrosZ4 = this.metros_zona4;
    // Construyendo arreglo para ordenar
    const circulos = [
      { metros: metrosZ1, color: color_zona1, id: 'Zona1', recurso: 'Circ_Zona1', cordenadas: cordenadas1 },
      { metros: metrosZ2, color: color_zona2, id: 'Zona2', recurso: 'Circ_Zona2', cordenadas: cordenadas2 },
      { metros: metrosZ3, color: color_zona3, id: 'Zona3', recurso: 'Circ_Zona3', cordenadas: cordenadas3 },
      { metros: metrosZ4, color: color_zona4, id: 'Zona4', recurso: 'Circ_Zona4', cordenadas: cordenadas4 },
    ];
    circulos.sort(function (a, b) {

      return b.cordenadas.length - a.cordenadas.length;
    });

    /**
     * PIntar Puntos de visualizacion
    */
    const puntos_viviendas = this.viviendas_cor;
    const pintar_poligonos = function () {
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': { 'c': 'Uno' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [circulos[0].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Dos' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[1].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Tres' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[2].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Cuatro' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[3].cordenadas
                ]
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'c',
            type: 'categorical',
            stops: [
              ['Uno', circulos[0].color],
              ['Dos', circulos[1].color],
              ['Tres', circulos[2].color],
              ['Cuatro', circulos[3].color]]
          },
          'fill-opacity': 0.5
        }
      });
    };
    const pintar_puntos = function (color, cord, id, recurso) {

      var list = {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          "features": []
        }
      };
      cord.forEach(element => {
        list.data.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [element[0], element[1]]
          }
        });
      });
      var json = JSON.stringify(list);

      json = JSON.parse(json);

      map.addSource(recurso, json);

      map.addLayer({
        'id': id,
        'type': 'circle',
        'source': recurso,
        'paint': {
          'circle-radius': 3,
          'circle-color': color,
          'circle-opacity': 0.8
        }
      });
    };
    //-----------------------------------------
    this.map.on('load', function () {

      // centros propios
      if (_viviendas_cor.length > 0) {
        pintar_puntos('blue', _viviendas_cor, 'layer_viviendas', 'rec_viviendas');
      }
      if (_centros_cor.length > 0) {
        pintar_puntos('#FFFFFF', _centros_cor, 'layer_centros', 'rec_centros');
      }
      if (_competencias_cor.length > 0) {
        pintar_puntos('red', _competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor');
      }


      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'properties': { 'c': 'Uno' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [circulos[0].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Dos' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[1].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Tres' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[2].cordenadas
                ]
              }
            },
            {
              'type': 'Feature',
              'properties': { 'c': 'Cuatro' },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  circulos[3].cordenadas
                ]
              }
            }
          ]
        }
      });

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'c',
            type: 'categorical',
            stops: [
              ['Uno', circulos[0].color],
              ['Dos', circulos[1].color],
              ['Tres', circulos[2].color],
              ['Cuatro', circulos[3].color]]
          },
          'fill-opacity': 0.5
        }
      });
    });
  }

  /**
   * Pintar Opciones de visualizacion
   */
  cambiar_color() {
    this.map.removeLayer('maine');
    // this.map.removeSource('maine');

    // const cordenadas = this.cordenadas;
    //const color_zona1 = $('#zona1-tr td:first-child input').css('background-color');
    //const color_zona1 = $('#zona1-tr td:first-child div').css('background-color');
    //const color_zona1 = $('#zona1-tr td:last-child div').css('background-color');
    const color_zona1 = $('div#changeColor1').css('background-color');
    const color_zona2 = $('div#changeColor2').css('background-color');
    const color_zona3 = $('div#changeColor3').css('background-color');
    const color_zona4 = $('div#changeColor4').css('background-color');

    /*const color_zona2 = $('#zona2-tr td:first-child input').css('background-color');
    const color_zona3 = $('#zona3-tr td:first-child input').css('background-color');
    const color_zona4 = $('#zona4-tr td:first-child input').css('background-color');*/

    const changeCord = function (list) {
      const new_list = [];
      list.forEach(element => {
        new_list.push(element.reverse());
      });
      return new_list;
    };

    let cordenadas1 = JSON.stringify(changeCord(this.cordenadas1));
    cordenadas1 = JSON.parse(cordenadas1);
    let cordenadas2 = JSON.stringify(changeCord(this.cordenadas2));
    cordenadas2 = JSON.parse(cordenadas2);
    let cordenadas3 = JSON.stringify(changeCord(this.cordenadas3));
    cordenadas3 = JSON.parse(cordenadas3);
    let cordenadas4 = JSON.stringify(changeCord(this.cordenadas4));
    cordenadas4 = JSON.parse(cordenadas4);

    const metrosZ1 = this.metros_zona1;
    const metrosZ2 = this.metros_zona2;
    const metrosZ3 = this.metros_zona3;
    const metrosZ4 = this.metros_zona4;
    // Construyendo arreglo para ordenar
    const circulos = [
      { metros: metrosZ1, color: color_zona1, id: 'Zona1', recurso: 'Circ_Zona1', cordenadas: cordenadas1 },
      { metros: metrosZ2, color: color_zona2, id: 'Zona2', recurso: 'Circ_Zona2', cordenadas: cordenadas2 },
      { metros: metrosZ3, color: color_zona3, id: 'Zona3', recurso: 'Circ_Zona3', cordenadas: cordenadas3 },
      { metros: metrosZ4, color: color_zona4, id: 'Zona4', recurso: 'Circ_Zona4', cordenadas: cordenadas4 },
    ];

    circulos.sort(function (a, b) {
      return b.cordenadas.length - a.cordenadas.length;
    });


    //   this.map.addSource('maine', {
    //   'type': 'geojson',
    //   'data': {
    //       'type': 'FeatureCollection',
    //       'features': [
    //         {
    //           'type': 'Feature',
    //           'properties': {'c': 'Uno'},
    //           'geometry': {
    //             'type': 'Polygon',
    //             'coordinates': [circulos[0].cordenadas
    //             ]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'properties': {'c': 'Dos'},
    //           'geometry': {
    //             'type': 'Polygon',
    //             'coordinates': [
    //               circulos[1].cordenadas
    //             ]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'properties': {'c': 'Tres'},
    //           'geometry': {
    //             'type': 'Polygon',
    //             'coordinates': [
    //               circulos[2].cordenadas
    //             ]
    //           }
    //         },
    //         {
    //           'type': 'Feature',
    //           'properties': {'c': 'Cuatro'},
    //           'geometry': {
    //             'type': 'Polygon',
    //             'coordinates': [
    //               circulos[3].cordenadas
    //             ]
    //           }
    //         }
    //     ]
    //   }
    // });

    this.map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': 'maine',
      'layout': {},
      'paint': {
        'fill-color': {
          property: 'c',
          type: 'categorical',
          stops: [
            ['Uno', circulos[0].color],
            ['Dos', circulos[1].color],
            ['Tres', circulos[2].color],
            ['Cuatro', circulos[3].color]]
        },
        'fill-opacity': 0.5
      }
    });
  }
  pintar_puntos(color: string, cord: any, id: string, recurso: string, r?: number) {
    var list = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        "features": []
      }
    };
    cord.forEach(element => {
      list.data.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [element[0], element[1]]
        }
      });
    });
    let json = JSON.stringify(list);

    json = JSON.parse(json);

    let radius = r != null ? r : 3;
    this.map.addSource(recurso, json);
    this.map.addLayer({
      'id': id,
      'type': 'circle',
      'source': recurso,
      'paint': {
        'circle-radius': radius,
        'circle-color': color,
        'circle-opacity': 0.8
      }
    });

  }

  pintar_puntosComp(color: string, cord: any, id: string, recurso: string, r?: number) {
    var list = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        "features": []
      }
    };

    /*cord.forEach(element => {
      list.data.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [element[1], element[0]]
        }
      });
    });*/

    cord.forEach(element => {

      list.data.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [element.cord[1], element.cord[0]]
        },
        'properties': {
          'title': element.dir
        }
      });
    });

    let json = JSON.stringify(list);

    json = JSON.parse(json);

    let radius = r != null ? r : 3;
    this.map.addSource(recurso, json);
    this.map.addLayer({
      'id': id,
      'type': 'circle',
      'source': recurso,
      'paint': {
        'circle-radius': radius,
        'circle-color': color,
        'circle-opacity': 0.8
      }
    });

  }

  pintar_puntosCompText(color: string, cord: any, id: string, recurso: string, r?: number) {
    var list = {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        "features": []
      }
    };

    cord.forEach(element => {
      list.data.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [element.cord[1], element.cord[0]]
        },
        'properties': {
          'title': element.dir
        }
      });
    });

    let json = JSON.stringify(list);

    json = JSON.parse(json);

    let radius = r != null ? r : 3;
    this.map.addSource("points", json);

    this.map.addLayer({
      'id': 'idpoints',
      'type': 'symbol',
      'source': 'points',
      'layout': {
        //'icon-image': 'custom-marker',
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        /*'text-font': [
        'Open Sans Semibold',
        'Arial Unicode MS Bold'
        ],*/

        'text-offset': [0, 1.25],
        'text-anchor': 'top',
        'text-size': 10,
        //'text-size': 9
      }
    });

  }

  loadOpcVisual() {
    const _viviendas_cor = this.viviendas_cor;
    const _competencias_cor = this.competencias_cor;
    const _centros_cor = this.centros_cor;
    const map = this.map;
    const pintar_puntos = function (color, cord, id, recurso) {
      // if(metros1 != ''|| min_andando1 != '' || min_coche1!= ''){
      // console.log(recurso);
      var list = {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          "features": []
        }
      };
      cord.forEach(element => {
        list.data.features.push({
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [element[0], element[1]]
          }
        });
      });
      var json = JSON.stringify(list);
      // console.log('normal', json);
      json = JSON.parse(json);
      // console.log('parse',json);
      map.addSource(recurso, json);

      map.addLayer({
        'id': id,
        'type': 'circle',
        'source': recurso,
        'paint': {
          'circle-radius': 3,
          'circle-color': color,
          'circle-opacity': 0.8
        }
      });
    }; // end function
    //Pintar los diferentes elementos

    if (_viviendas_cor.length > 0) {
      pintar_puntos('blue', _viviendas_cor, 'layer_viviendas', 'rec_viviendas');
    }
    if (_centros_cor.length > 0) {
      pintar_puntos('#FFFFFF', _centros_cor, 'layer_centros', 'rec_centros');
    }
    if (_competencias_cor.length > 0) {
      pintar_puntos('red', _competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor');
    }
  }

  /**
   * Dibujar grid
   */
  llenarGrid() {

    if (this.runner_ubica == true) {
      this.runner_ubica == true
    } else {
      this.runner_ubica = false;
    }
    this.runner = false;
    this.runner_compet = false
    this.runner_ventas = false;

    this.tabOneHomeDataDir = false
    this.tabTwoInfluenceZone = false
    this.tabThreeCompetition = false
    this.tapFourLocationPerformanceEstimation = false
    this.tapFiveSearchOptimalLocations = true
    this.tapSixSetting = false

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: none');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: #43aa36');

    //this.visible_canva = false;
    //  if (this.var_interaccion.trim() !== '') {

    this.resetCanvas();
    this.visible_canva = false;
    const lat = this.lat;
    const lng = this.lng;
    const map = this.map;
    let x = 0;
    let y = 0;
    let interaccion = parseInt(this.var_interaccion);
    let valor = Math.sqrt(interaccion);

    if (valor % 1 === 0) {
      x = valor;
      y = valor;
    } else if (interaccion % 10 === 0 && interaccion > 10) {
      x = 10;
      y = interaccion / 10;
    } else if (interaccion % 11 === 0 && interaccion !== 11) {
      x = 11;
      y = interaccion / 11;
    } else if (interaccion % 12 === 0 && interaccion !== 12) {
      x = 12;
      y = interaccion / 12;
    } else if (interaccion % 9 === 0 && interaccion !== 9) {
      x = 9;
      y = interaccion / 9;
    } else if (interaccion % 8 === 0 && interaccion !== 8) {
      x = 8;
      y = interaccion / 8;
    } else if (interaccion % 7 === 0) {
      x = 7;
      y = interaccion / 7;
    } else if (interaccion % 6 === 0 && interaccion !== 6) {
      x = 6;
      y = interaccion / 6;
    } else if (interaccion % 5 === 0) {
      x = 5;
      y = interaccion / 5;
    } else if (interaccion % 4 === 0 && interaccion !== 4) {
      x = 4;
      y = interaccion / 4;
    } else if (interaccion % 3 === 0) {
      x = 3;
      y = interaccion / 3;
    } else if (interaccion % 2 === 0) {
      y = 2;
      x = interaccion / 2;
    } else if (interaccion % 2 !== 0) {
      let temp = Math.trunc(valor);

      for (let index = temp; index > 1; index--) {
        if ((interaccion - 1) % index === 0) {
          x = index;
          y = (interaccion - 1) / index;

          break;
        } else if ((interaccion + 1) % index === 0) {
          x = index;
          y = (interaccion + 1) / index;
          console.log('ENTRO AQUI', index, 'MAS');
          break;
        }
      }
      //  if ((interaccion - 1) % temp === 0) {

      //   x = temp;
      //   y = (interaccion - 1) / temp;

      //  } else if ((interaccion + 1) % temp === 0) {
      //   x = temp;
      //   y = (interaccion + 1) / temp;
      //  } 
    }
    const y_temp = y;
    y = x > y ? y : x;
    x = y_temp > x ? y_temp : x;

    const cntcolumn = x;
    const cntFilas = y;
    this.cant_col = cntcolumn;
    this.cant_fil = cntFilas;
    //  console.log('la y:' + y);
    //   x = Math.round(300 / (x));
    //   y = Math.round(260 / ((y * 14) / 8));
    //   this.ancho_x = x;
    //   this.altura_y = y;
    // console.log('la y:' + y);
    const c = <HTMLCanvasElement>document.querySelector('.micanvas');
    c.setAttribute('style', 'z-index: 1');
    const contenedor = document.getElementById('Contenedor');
    //  console.log('Obejto camva',c);
    const ctx = c.getContext('2d');
    var s = getComputedStyle(c);
    var w = s.width;
    var h = s.height;
    c.width = parseInt(w.split('px')[0]);
    c.height = parseInt(h.split('px')[0]);

    x = Math.round(c.width / (x));
    y = Math.round(c.height / (y));
    this.ancho_x = x;
    this.altura_y = y;
    //alert('ANCHO  '+ c.width);

    this.ctx = ctx;
    console.log(contenedor);
    // c.width = contenedor.offsetWidth - 400;
    // c.height = contenedor.offsetHeight - 400;
    let columnas = [];
    let filas = [];
    if (ctx) {
      this.dibujaGrid(c, ctx, x, y, cntFilas, cntcolumn, 1, 'red');
      console.log(this.cuadritos.length);
      this.grid_paint = true;
    } else {
      alert('Error para cargar grid (Contexto)');
    }

    //}
    // this.calcularExtremosCentro(14);

    if (this.array_estima.length > 0) {
      this.loadGridLocal();
    }

  }

  fillGridOptLocation() {

    this.resetCanvas();
    this.visible_canva = false;
    const lat = this.lat;
    const lng = this.lng;
    const map = this.map;
    let x = 0;
    let y = 0;
    let interaccion = parseInt(this.var_interaccion);
    let valor = Math.sqrt(interaccion);

    if (valor % 1 === 0) {
      x = valor;
      y = valor;
    } else if (interaccion % 10 === 0 && interaccion > 10) {
      x = 10;
      y = interaccion / 10;
    } else if (interaccion % 11 === 0 && interaccion !== 11) {
      x = 11;
      y = interaccion / 11;
    } else if (interaccion % 12 === 0 && interaccion !== 12) {
      x = 12;
      y = interaccion / 12;
    } else if (interaccion % 9 === 0 && interaccion !== 9) {
      x = 9;
      y = interaccion / 9;
    } else if (interaccion % 8 === 0 && interaccion !== 8) {
      x = 8;
      y = interaccion / 8;
    } else if (interaccion % 7 === 0) {
      x = 7;
      y = interaccion / 7;
    } else if (interaccion % 6 === 0 && interaccion !== 6) {
      x = 6;
      y = interaccion / 6;
    } else if (interaccion % 5 === 0) {
      x = 5;
      y = interaccion / 5;
    } else if (interaccion % 4 === 0 && interaccion !== 4) {
      x = 4;
      y = interaccion / 4;
    } else if (interaccion % 3 === 0) {
      x = 3;
      y = interaccion / 3;
    } else if (interaccion % 2 === 0) {
      y = 2;
      x = interaccion / 2;
    } else if (interaccion % 2 !== 0) {
      let temp = Math.trunc(valor);

      for (let index = temp; index > 1; index--) {
        if ((interaccion - 1) % index === 0) {
          x = index;
          y = (interaccion - 1) / index;

          break;
        } else if ((interaccion + 1) % index === 0) {
          x = index;
          y = (interaccion + 1) / index;

          break;
        }
      }

    }
    const y_temp = y;
    y = x > y ? y : x;
    x = y_temp > x ? y_temp : x;

    const cntcolumn = x;
    const cntFilas = y;
    this.cant_col = cntcolumn;
    this.cant_fil = cntFilas;

    const c = <HTMLCanvasElement>document.querySelector('.micanvas');
    c.setAttribute('style', 'z-index: 1');
    const contenedor = document.getElementById('Contenedor');

    const ctx = c.getContext('2d');
    var s = getComputedStyle(c);
    var w = s.width;
    var h = s.height;
    c.width = parseInt(w.split('px')[0]);
    c.height = parseInt(h.split('px')[0]);

    x = Math.round(c.width / (x));
    y = Math.round(c.height / (y));
    this.ancho_x = x;
    this.altura_y = y;

    this.ctx = ctx;

    let columnas = [];
    let filas = [];
    if (ctx) {
      this.dibujaGrid(c, ctx, x, y, cntFilas, cntcolumn, 1, 'red');
      console.log(this.cuadritos.length);
      this.grid_paint = true;
    } else {
      alert('Error para cargar grid (Contexto)');
    }

    if (this.array_estima.length > 0) {
      this.loadGridLocal();
    }
  }

  // cargar la pocision desde el  click
  loadPos(e) {
    const c = <HTMLCanvasElement>document.querySelector('.micanvas');
    var canvaspos = c.getBoundingClientRect();
    //fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
    //console.log('Valores del canva',e.clientX,canvaspos.left,e.clientY , canvaspos.top);
    const x = e.clientX - canvaspos.left,
      y = e.clientY - canvaspos.top;
    for (let i = 0; i < this.cuadritos.length; i++) {
      const cuadro = this.cuadritos[i];
      // console.log(cuadro);
      // console.log('Pos: '+ i + 'X and Y: ',x,y );
      if (
        x > cuadro[0] &&
        x < cuadro[0] + cuadro[3] + 200 &&
        y > cuadro[1] &&
        y < cuadro[1] + cuadro[2] + 300
      ) {
        //  console.log('Nos encontramos en el cuadro'+ (i+1)+' DEL GRID');
        break;
      }
    }
  }

  // funcion para dibujar grid
  dibujaGrid(canvas, ctx, x, y, cntFilas, cntcolumn, anchoLinea, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = anchoLinea;
    let columnas = [];
    let filas = [];

    // for (let i = disX; i < canvas.width; i += disX) {
    //   ctx.beginPath();
    //   ctx.moveTo(i, 0);
    //   ctx.lineTo(i, canvas.height);
    //   ctx.stroke();
    //   columnas.push(i);
    // }
    // for (let i = disY; i < canvas.height; i += disY) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, i);
    //   ctx.lineTo(ctx.canvas.width, i);
    //   ctx.stroke();
    //   filas.push(i);
    // }
    //---------------
    let cont = 0;
    console.log('LAS X ', canvas.width);

    for (let _x = 0; _x <= canvas.width; _x = _x + x) { //30
      if (cntcolumn == cont)
        break;
      ctx.moveTo(_x, 0);
      ctx.lineWidth = .8;
      ctx.lineTo(_x, canvas.height);
      //ctx.strokeStyle = '#8B8880';
      //ctx.stroke();
      columnas.push(_x);
      cont++;

      // ctx.font="10pt Verdana";
      // ctx.strokeStyle="green";
      // ctx.lineWidth = 2;
      // ctx.strokeText(cont+1,_x+10,40);
    }
    cont = 0;
    for (let _y = 0; _y <= canvas.height; _y = _y + y) { //y
      if (cntFilas == cont)
        break;
      ctx.moveTo(0, _y);
      ctx.lineWidth = .8;
      ctx.lineTo(canvas.width, _y);
      //ctx.strokeStyle = '#8B8880';
      //ctx.stroke();
      filas.push(_y);
      cont++;
    }
    console.log('Columnas', columnas.length);
    console.log('Filas', filas.length);
    ctx.strokeStyle = "#8B8880";
    //  // ctx.strokeRect(10, 10, 100, 100);
    //  // ctx.lineWidth= 1;
    ctx.stroke();
    // columnas.push(0);
    // filas.push(0);
    console.log('Cuadritos', this.cuadritos);
    for (let _y = 0; _y < filas.length; _y++) {
      for (let _x = 0; _x < columnas.length; _x++) {
        this.cuadritos.push([columnas[_x], filas[_y], y, x]);
      }
    }
  }
  // Cargar el grid
  onChange(value) {
    this.resetGridValues();
    this.resetCanvas();
    this.llenarGrid();
  }
  loadGrid(event) {
    // console.log('TECLA TOCADA', event);
    // si la tecla no es un numero no hacer nada
    if (event.keyCode !== 8 && (event.keyCode < 48 || event.keyCode > 57)) {
      event.preventDefault();
      return;
    }
    if (event.keyCode !== 8) {
      this.var_interaccion = this.var_interaccion + event.key;
    } else if (event.keyCode === 8) {
      this.var_interaccion = this.var_interaccion.substring(0, this.var_interaccion.length - 1);

      // console.log(this.var_interaccion_aux,'AUXiliar');  
      // console.log(  $('#txt-interacc').val(),'Desde ID');  
    }
    //alert(this.var_interaccion.trim());
    if (this.var_interaccion.trim() === '0') {
      event.preventDefault();
      this.var_interaccion = '';
      return;
    }
    if (this.var_interaccion.trim() !== '') {
      this.resetGridValues();
      this.llenarGrid();
    } else {
      this.resetGridValues();
      this.resetCanvas();
    }
    this.test();
  }
  test() {
    console.log(this.var_interaccion.trim());
  }
  // resetear valores de grid
  resetGridValues() {
    this.estima_vent_ubic_opt_ref = {
      '12 meses': this.estima_interfaz,
      'enero': this.estima_interfaz,
      'febrero': this.estima_interfaz,
      'marzo': this.estima_interfaz,
      'abril': this.estima_interfaz,
      'mayo': this.estima_interfaz,
      'junio': this.estima_interfaz,
      'julio': this.estima_interfaz,
      'agosto': this.estima_interfaz,
      'septiembre': this.estima_interfaz,
      'octubre': this.estima_interfaz,
      'noviembre': this.estima_interfaz,
      'diciembre': this.estima_interfaz
    };
    this.array_estima = [];
    this.array_address_estima = [];
  }
  resetCanvas() {
    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];
    // this.visible_canva = false;
    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  executeRuner() {
    if (this.isLoadDataAll == true) {
      this.isLoadDataAll = false

      this.runner = false;
      this.runner_ventas = false;
      this.runner_ubica = false;
      this.runner_compet = false;

      /*this.tabOneHomeDataDir = true
      this.tabTwoInfluenceZone = false
      this.tabThreeCompetition = false
      this.tapFourLocationPerformanceEstimation = false
      this.tapFiveSearchOptimalLocations = false
      this.tapSixSetting = false*/
    }

    if (this.tabOneHomeDataDir == true) {
      console.log("En dir...")
      //En dir
      this.loadData()
    }

    if (this.tabTwoInfluenceZone == true) {
      console.log("Influence zone...")
      this.llenarZonas()
    }

    if (this.tabThreeCompetition == true) {
      console.log("Competition...")
      //Competition
      //this.ejecutarCompetenciaTab()
      this.getPuntoInteresCompetencia()
    }
    if (this.tapFourLocationPerformanceEstimation == true) {
      console.log("Estimación de rendimiento de la ubicación...")
      //Estimación de rendimiento de la ubicación
      this.ejecutarEstVentas()
    }
    if (this.tapFiveSearchOptimalLocations == true) {
      //Search optimal locations
      console.log("Search optimal locations...")
      this.ejecutarUbicaciones()
    }

    if (this.tapSixSetting == true) {
      console.log("Ajustes...")
    }

  }

  resetCanvasOne() {
    this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.tabOneHomeDataDir = true
    this.tabTwoInfluenceZone = false
    this.tabThreeCompetition = false
    this.tapFourLocationPerformanceEstimation = false
    this.tapFiveSearchOptimalLocations = false
    this.tapSixSetting = false

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: #43aa36');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: none');

    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  resetCanvasTwo() {
    console.log("My new change of test.")
    if (this.runner == true) {
      this.runner == true
    } else {
      this.runner = false;
    }
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.tabOneHomeDataDir = false
    this.tabTwoInfluenceZone = true
    this.tabThreeCompetition = false
    this.tapFourLocationPerformanceEstimation = false
    this.tapFiveSearchOptimalLocations = false
    this.tapSixSetting = false

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: #43aa36');

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: none');

    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  resetCanvasThree() {

    if (this.runner_compet == true) {
      this.runner_compet == true
    } else {
      this.runner_compet = false;
    }
    this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;

    this.tabOneHomeDataDir = false
    this.tabTwoInfluenceZone = false
    this.tabThreeCompetition = true
    this.tapFourLocationPerformanceEstimation = false
    this.tapFiveSearchOptimalLocations = false
    this.tapSixSetting = false

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: #none');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: #43aa36');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: none');


    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  resetCanvasFour() {
    if (this.runner_ventas == true) {
      this.runner_ventas == true
    } else {
      this.runner_ventas = false;
    }
    this.runner = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.tabOneHomeDataDir = false
    this.tabTwoInfluenceZone = false
    this.tabThreeCompetition = false
    this.tapFourLocationPerformanceEstimation = true
    this.tapFiveSearchOptimalLocations = false
    this.tapSixSetting = false

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: none');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: #43aa36');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: none');

    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  resetCanvasSeven() {
    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: none');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: none');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: #43aa36');


    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  resetCanvasSetting() {
    this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.tabOneHomeDataDir = false
    this.tabTwoInfluenceZone = false
    this.tabThreeCompetition = false
    this.tapFourLocationPerformanceEstimation = false
    this.tapFiveSearchOptimalLocations = false
    this.tapSixSetting = true

    const tabOne = document.getElementById('tabOne');
    tabOne.setAttribute('style', 'background: none');

    const tabTwo = document.getElementById('tabTwo');
    tabTwo.setAttribute('style', 'background: none');

    const tabThree = document.getElementById('tabThree');
    tabThree.setAttribute('style', 'background: none');

    const tabFive = document.getElementById('tabFive');
    tabFive.setAttribute('style', 'background: none');

    const tabSix = document.getElementById('tabSix');
    tabSix.setAttribute('style', 'background: #43aa36');

    const tabSeven = document.getElementById('tabSeven');
    tabSeven.setAttribute('style', 'background: none');


    const c = <HTMLCanvasElement>document.getElementById('micanvas');
    this.cuadritos = [];

    c.setAttribute('style', 'z-index: -1');
    if (c != null) {
      c.width = c.width;
    }
  }

  //Ubicaciones Optimas boton ejecutar runnner
  ejecutarUbicaciones() {

    this.isLocation = "false"
    this.isErrorLocation = "false"

    if (this.map_model.salida_ok !== true) {
      this.isLocation = ""
      this.isErrorLocation = ""
      alert('No se ha procesado ninguna dirección literal.');
      return;
    }
    /*if (this.indicador_ubic === '' || this.model_ubic === '' || !this.grid_paint || this.var_interaccion === '') {
      this.isLocation = ""
      this.isErrorLocation = ""
      alert('Debe llenar los campos correspondientes');
      return;
    }*/
    //dehabilitar los btn
    this.enabledBtns(true);

    this.visible_btn_ubic = false;
    this.resetGridValues();
    this.resetTableUbic();
    this.resetCanvas();
    // this.var_interaccion = this.var_interaccion_aux;
    //this.llenarGrid();
    this.fillGridOptLocation();

    this.runner_ubica = true;
    let estima_vent_ubic_opt = {
      '12 meses': this.estima_interfaz,
      'enero': this.estima_interfaz,
      'febrero': this.estima_interfaz,
      'marzo': this.estima_interfaz,
      'abril': this.estima_interfaz,
      'mayo': this.estima_interfaz,
      'junio': this.estima_interfaz,
      'julio': this.estima_interfaz,
      'agosto': this.estima_interfaz,
      'septiembre': this.estima_interfaz,
      'octubre': this.estima_interfaz,
      'noviembre': this.estima_interfaz,
      'diciembre': this.estima_interfaz
    };
    //-- Llamada inicial del api etimacion ventas
    this.censService.getEstimacionVentas(this.lng, this.lat, this.tipoCentroOptimalLocations, this.tamano, this.respPois).subscribe((data: any) => {
      this.isLocation = "true"
      this.estima_vent_ubic_opt_ref = data['modelos_resultado'];
      console.log(this.estima_vent_ubic_opt_ref);
      this.procesoGrid();
    },
      (error) => {
        this.isErrorLocation = "true"
        console.log(error);
        alert('Ha ocurrido un error calculando datos de referencia.');
        this.runner_ubica = false;
        this.visible_btn_ubic = true;
        this.enabledBtns(true);
      });


  }

  ejecutarUbicacionesAll() {
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      return;
    }
    if (this.indicador_ubic === '' || this.model_ubic === '' || !this.grid_paint || this.var_interaccion === '') {
      alert('Debe llenar los campos correspondientes');
      return;
    }
    //dehabilitar los btn
    this.enabledBtns(true);

    this.visible_btn_ubic = false;
    this.resetGridValues();
    this.resetTableUbic();
    this.resetCanvas();

    this.llenarGrid();
    this.runner_ubica = false;
    let estima_vent_ubic_opt = {
      '12 meses': this.estima_interfaz,
      'enero': this.estima_interfaz,
      'febrero': this.estima_interfaz,
      'marzo': this.estima_interfaz,
      'abril': this.estima_interfaz,
      'mayo': this.estima_interfaz,
      'junio': this.estima_interfaz,
      'julio': this.estima_interfaz,
      'agosto': this.estima_interfaz,
      'septiembre': this.estima_interfaz,
      'octubre': this.estima_interfaz,
      'noviembre': this.estima_interfaz,
      'diciembre': this.estima_interfaz
    };
    //-- Llamada inicial del api etimacion ventas
    this.censService.getEstimacionVentas(this.lng, this.lat, this.tipo_centro, this.tamano, this.respPois).subscribe((data: any) => {

      this.estima_vent_ubic_opt_ref = data['modelos_resultado'];

      this.procesoGrid();
    },
      (error) => {
        console.log(error);
        alert('Ha ocurrido un error calculando datos de referencia.');
        this.runner_ubica = false;
        this.visible_btn_ubic = true;
        this.enabledBtns(true);
      });


  }
  // proceso de recorrido grid
  procesoGrid() {
    const v_this = this;
    let estima_vent_ubic_opt = {
      '12 meses': this.estima_interfaz,
      'enero': this.estima_interfaz,
      'febrero': this.estima_interfaz,
      'marzo': this.estima_interfaz,
      'abril': this.estima_interfaz,
      'mayo': this.estima_interfaz,
      'junio': this.estima_interfaz,
      'julio': this.estima_interfaz,
      'agosto': this.estima_interfaz,
      'septiembre': this.estima_interfaz,
      'octubre': this.estima_interfaz,
      'noviembre': this.estima_interfaz,
      'diciembre': this.estima_interfaz
    };
    console.log('se pinta');
    let color = 'blue';
    this.ctx.fillStyle = color;
    let estima_stop = false;
    let address_stop = false;
    let begin_grid = true;
    let pos = 0;
    let error_stop = false;
    const stop = setInterval(() => {
      if (pos === this.cuadritos.length || error_stop) {
        clearInterval(stop);
        this.runner_ubica = false;
        this.visible_btn_ubic = true;
        this.enabledBtns(false);
        //LLenar arreglo para la tabla
        console.log('PARA LLENAR TABLA', v_this.array_estima);
        // v_this.array_estima.forEach(function (element, indice, array) {
        //   v_this.data_ubic_opt.push(
        //     [indice + 1, v_this.array_address_estima[indice] , element[v_this.model_ubic][v_this.indicador_ubic]]
        //   );
        //   });
        //     // Vovle a Cargar DataTable 
        //   this.datatable_opt.clear();
        //   this.datatable_opt.rows.add(v_this.data_ubic_opt);
        //   this.datatable_opt.draw();
        //   console.log('VALORES DE TABLA OPTIMA',v_this.data_ubic_opt);

      } else {
        if (begin_grid) {
          const cord = this.calcularExtremosCentro(pos + 1);
          console.log('Entro en servicios ', pos);
          this.censService.getEstimacionVentas(cord[0], cord[1], this.tipo_centro, this.tamano, this.respPois).subscribe((data: any) => {
            // console.log(data);
            estima_vent_ubic_opt = data['modelos_resultado'];
            this.array_estima.push(estima_vent_ubic_opt);
            console.log(this.array_estima);
            estima_stop = true;
          },
            (error) => {
              console.log(error);
              estima_stop = true;
              error_stop = true;
              this.enabledBtns(false);
            });
          this.censService.getNormalizaInversa(cord[1], cord[0]).subscribe((data: any) => {
            // console.log(data);
            this.array_address_estima.push(data['direccion']);
            console.log(this.array_address_estima);
            address_stop = true;
          }, (error) => {
            alert('Ha ocurrido un error.');
            console.log(error);
            address_stop = true;
            error_stop = true;
            this.enabledBtns(false);
          });
          begin_grid = false;
          // let imagen = new Image();
          // imagen.src="assets/img/iconos/X.gif";
          // this.ctx.beginPath();
          // const v_this = this;
          const cuadro = this.cuadritos[pos];
          // imagen.onload = function() { //la nueva imagen tiene que haberse cargado
          //   v_this.ctx.drawImage(imagen, cuadro[0], cuadro[1], 20, 20); //insertar imagen en canvas
          //   console.log("Pixeles",cuadro[0], cuadro[1], v_this.ancho_x, v_this.altura_y);
          //   };

        } else {
          const cuadro = this.cuadritos[pos];
          if (address_stop && estima_stop) {

            const referencia = this.estima_vent_ubic_opt_ref[this.model_ubic][this.indicador_ubic];
            const porc = (referencia * 10) / 100;
            //   calculado_menor = , calculado_mayor = 0;
            const valor_actual = this.array_estima[pos];
            console.log(this.marker_state);
            this.marker_state.remove();

            let color = '';
            let color_row = '';
            if (valor_actual[this.model_ubic][this.indicador_ubic] < referencia - porc) {
              color = 'rgba(255, 255, 255, 0.5)';
              color_row = 'White';
            } else if (valor_actual[this.model_ubic][this.indicador_ubic] > referencia - porc &&
              valor_actual[this.model_ubic][this.indicador_ubic] < referencia + porc) {
              color = 'rgb(22, 22, 251, 0.3)';
              color_row = 'Blue';
            } else {
              color = 'rgb(28, 134, 12, 0.3)';
              color_row = 'Green';
            }

            console.log('Valores del Calculo', referencia, valor_actual, porc, color);
            //v_this.data_ubic_opt = [];
            // v_this.array_estima.forEach(function (element, indice, array) {

            /*v_this.data_ubic_opt.push(
              [pos + 1, v_this.array_address_estima[pos], v_this.formatDecimal.formatear(valor_actual[v_this.model_ubic][v_this.indicador_ubic]), color_row]
            );*/
            v_this.data_ubic_opt.push(
              [pos + 1, v_this.array_address_estima[pos], v_this.formatDecimal.formatearPorcExcl(valor_actual[v_this.model_ubic][v_this.indicador_ubic]), color_row]
            );
            // });
            // Vovle a Cargar DataTable 
            this.datatable_opt.clear();
            this.datatable_opt.rows.add(v_this.data_ubic_opt);
            this.datatable_opt.draw();
            console.log('VALORES DE TABLA OPTIMA', v_this.data_ubic_opt);
            //pintando la celda
            /**
             * 'rgba(255, 255, 255, 0.5)'; grey
             * rgb(22, 22, 251, 0.5) blue
             * rgb(28, 134, 12, 05) green
             */
            // Haciendo calculao para pintar segun valores
            this.ctx.fillStyle = color; // or 'transparent' rey 
            this.ctx.fillRect(
              cuadro[0],
              cuadro[1],
              this.ancho_x,
              this.altura_y
            );
            this.ctx.font = "15pt Verdana";
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.strokeText(pos + 1, cuadro[0] + 7, cuadro[1] + 20);
            begin_grid = true;
            pos++;
            estima_stop = false;
            address_stop = false;
          }
        }
      }
      console.log('Espera grid' + pos);
    }, 800);

  }

  // resetear tabla Ubicciones
  resetTableUbic() {
    this.data_ubic_opt = [];
    // });
    // Vovle a Cargar DataTable 
    this.datatable_opt.clear();
    this.datatable_opt.rows.add(this.data_ubic_opt);
    this.datatable_opt.draw();
  }
  loadGridLocal() {
    for (let i = 0; i < this.cuadritos.length; i++) {
      const cuadro = this.cuadritos[i];
      const referencia = this.estima_vent_ubic_opt_ref[this.model_ubic][this.indicador_ubic];
      const porc = (referencia * 10) / 100;
      //   calculado_menor = , calculado_mayor = 0;
      const valor_actual = this.array_estima[i];
      let color = '';
      if (valor_actual[this.model_ubic][this.indicador_ubic] < referencia - porc) {
        color = 'rgba(255, 255, 255, 0.5)';
      } else if (valor_actual[this.model_ubic][this.indicador_ubic] > referencia - porc &&
        valor_actual[this.model_ubic][this.indicador_ubic] < referencia + porc) {
        color = 'rgb(22, 22, 251, 0.5)';
      } else {
        color = 'rgb(28, 134, 12, 0.5)';
      }
      console.log('Valores del Calculo', referencia, valor_actual, porc, color);
      //pintando la celda
      /**
       * 'rgba(255, 255, 255, 0.5)'; grey
       * rgb(22, 22, 251, 0.5) blue
       * rgb(28, 134, 12, 05) green
       */
      // Haciendo calculao para pintar segun valores
      this.ctx.fillStyle = color; // or 'transparent'
      this.ctx.fillRect(
        cuadro[0],
        cuadro[1],
        this.ancho_x,
        this.altura_y
      );
      this.ctx.font = "15pt Verdana";
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 1;
      this.ctx.strokeText(i + 1, cuadro[0] + 7, cuadro[1] + 20);
    }
  }
  calcularExtremosCentro(pos) {
    console.log("poniendo POS:", pos);
    const map_cor = this.map.getBounds();
    this.sureste = map_cor.getSouthEast();
    this.noroeste = map_cor.getNorthWest(); // x1
    this.noreste = map_cor.getNorthEast();  // x2
    this.suroeste = map_cor.getSouthWest(); // x3
    const x1 = this.noroeste;
    const x2 = this.noreste;
    const x3 = this.suroeste;

    let a = (x1['lng'] - x2['lng']) / (2 * this.cant_col);
    if (a < 0) {
      a = a * (-1);
    }
    console.log("cantidad columnas", this.cant_col);
    console.log("cantidad filas", this.cant_fil);
    let b = (x1['lat'] - x3['lat']) / (2 * this.cant_fil);
    if (b < 0) {
      b = b * (-1);
    }
    console.log('Este es X1 ', x1);
    console.log('Este es X2 ', x2);
    console.log('Este es X3 ', x3);

    console.log('Este es a', a);
    console.log('Este es b', b);
    // let pos = 15;
    const posic = pos % this.cant_col === 0 ? 0 : 1;

    const m = Math.trunc(pos / this.cant_col) + posic;
    let n = 0;
    if (pos % this.cant_col === 0) {
      n = this.cant_col;
    } else {
      n = (((pos / this.cant_col) - Math.trunc(pos / this.cant_col)) * this.cant_col);
    }

    console.log('Este es m', m);
    console.log('Este es n', n);

    const cordLong = x1['lng'] + a * (2 * n - 1);

    const cordLat = x1['lat'] - b * (2 * m - 1);

    console.log('Este es longitud central', cordLong);
    console.log('Este es latitus central', cordLat);
    //   let imagen = new Image();
    // imagen.src="assets/img/iconos/X.gif";
    let el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(/assets/img/iconos/map_runner.gif)';
    el.style.width = '45px';
    el.style.height = '45px';
    this.marker_state = new mapboxgl.Marker(el)
      .setLngLat([cordLong, cordLat])
      .addTo(this.map);
    // //marker_state
    // const marker = new mapboxgl.Marker()
    // .setLngLat([cordLong, cordLat])
    // .addTo(this.map);
    return [cordLong, cordLat];
  }
  // OCultar Mostrar canvas
  hideShowCanvas() {
    this.visible_canva = !this.visible_canva;

    if (this.visible_canva) {
      this.resetCanvas();
    } else {
      this.llenarGrid();
    }
  }

  // calcular metros
  calcMetros() {
    const metros1 = this.zona_influe.get('metros1').value;
    const min_andando1 = this.zona_influe.get('min_andando1').value;
    const min_coche1 = this.zona_influe.get('min_coche1').value;

    const metros2 = this.zona_influe.get('metros2').value;
    const min_andando2 = this.zona_influe.get('min_andando2').value;
    const min_coche2 = this.zona_influe.get('min_coche2').value;

    const metros3 = this.zona_influe.get('metros3').value;
    const min_andando3 = this.zona_influe.get('min_andando3').value;
    const min_coche3 = this.zona_influe.get('min_coche3').value;

    const metros4 = this.zona_influe.get('metros4').value;
    const min_andando4 = this.zona_influe.get('min_andando4').value;
    const min_coche4 = this.zona_influe.get('min_coche4').value;

    const metrosMinAndando = function (min: number) {

      return (min / 60) * 4800;
    };
    const metrosMinCoche = function (min: number) {
      return (min / 60) * 4500;
    };


    // zona 1 metros para graficar por orden y texto para el modal
    const metrosZ1 = metros1 !== '' ? metros1 : (min_andando1 !== '' ? metrosMinAndando(min_andando1) :
      (min_coche1 !== '' ? metrosMinCoche(min_coche1) : 0));
    const texto_zona1 = metros1 !== '' ? metros1 + ' metros andando ' : (min_andando1 !== '' ? min_andando1 + ' minutos andando' :
      (min_coche1 !== '' ? min_coche1 + ' minutos en coche' : 'Sin calcular'));

    // zona 2 metros para graficar por orden y texto para el modal
    const metrosZ2 = metros2 !== '' ? metros2 : (min_andando2 !== '' ? metrosMinAndando(min_andando2) :
      (min_coche2 !== '' ? metrosMinCoche(min_coche2) : 0));

    const texto_zona2 = metros2 !== '' ? metros2 + ' metros andando ' : (min_andando2 !== '' ? min_andando2 + ' minutos andando' :
      (min_coche2 !== '' ? min_coche2 + ' minutos en coche' : 'Sin calcular'));

    // zona 3 metros para graficar por orden y texto para el modal
    const metrosZ3 = metros3 !== '' ? metros3 : (min_andando3 !== '' ? metrosMinAndando(min_andando3) :
      (min_coche3 !== '' ? metrosMinCoche(min_coche3) : 0));
    const texto_zona3 = metros3 !== '' ? metros3 + ' metros andando ' : (min_andando3 !== '' ? min_andando3 + ' minutos andando' :
      (min_coche3 !== '' ? min_coche3 + ' minutos en coche' : 'Sin calcular'));

    // zona 4 metros para graficar por orden y texto para el modal
    const metrosZ4 = metros4 !== '' ? metros4 : (min_andando4 !== '' ? metrosMinAndando(min_andando4) :
      (min_coche4 !== '' ? metrosMinCoche(min_coche4) : 0));
    const texto_zona4 = metros4 !== '' ? metros4 + ' metros andando ' : (min_andando4 !== '' ? min_andando4 + ' minutos andando' :
      (min_coche4 !== '' ? min_coche4 + ' minutos en coche' : 'Sin calcular'));


    // Asgnando atributo
    this.texto_zona1 = texto_zona1;
    this.texto_zona2 = texto_zona2;
    this.texto_zona3 = texto_zona3;
    this.texto_zona4 = texto_zona4;
    this.metros_zona1 = metrosZ1;
    this.metros_zona2 = metrosZ2;
    this.metros_zona3 = metrosZ3;
    this.metros_zona4 = metrosZ4;
  }
  // Calcular % de Diferencia
  porcDiff(zona: string, mncipio: string) {
    const _zona = Number(zona);
    const _mncipio = Number(mncipio);
    // console.log('% diff');
    // console.log(zona);
    // console.log(mncipio);
    return ((_zona - _mncipio) * 100) / _zona;
  }
  // Resetaer Atributos
  resetEmergente() {
    this.cens_rad_emergente_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.zona = '';
    this.distancia_estudio = '';
  }

  // Evento de Select pagina principal
  updateSelect1(value: string[]) {
    if (value !== undefined || this.map_model.salida_ok === true) {
      // console.log('Marcado Select Uno:' + value);
      // console.log('Valores selecionados:' + this.opciones_visual_selected);
      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };
      if (value.includes('Viviendas')) {
        this.censService.getDataViviendas(data_api).subscribe((data: DataApiVisual | any) => {
          this.viviendas_cor = data['viviendas'];
          // console.log(this.viviendas_cor);
          this.loadZonasColor();
        }, (error) => {
          alert('Ha ocurrido un error datos vivienda.');
          console.log(error);
        });
      }
      else {
        this.viviendas_cor = [];
      }
      if (value.includes('Competencia')) {
        // console.log('Entro Competencia');
        this.censService.getDataCompetencia(data_api).subscribe((data: DataApiVisual | any) => {
          // console.log(data);
          this.competencias_cor = data['top_competidores'];
          // console.log(this.viviendas_cor);
          this.loadZonasColor(); //top_competidoresCentros Propios
        }, (error) => {
          alert('Ha ocurrido un error datos competencia.');
          console.log(error);
        });
      }
      else {
        this.competencias_cor = [];
      }
      // Centros Propios
      if (value.includes('Centros Propios')) {
        // console.log('Entro Centros Propios');
        this.censService.getDataCentrosPropios(data_api).subscribe((data: DataApiVisual | any) => {
          // console.log(data);
          this.centros_cor = data['centros_propios'];
          // this.viviendas_cor = data['top_competidores'];
          this.loadZonasColor();
        }, (error) => {
          alert('Ha ocurrido un error datos centros propios.');
          console.log(error);
        });
      }
      else {
        this.centros_cor = [];
      }
      if (value.length === 0) {
        this.loadZonasColor();
      }
    }
  }
  updateSelectTamano(value: string) {
    //  console.log('Marcado ' + value);
  }
  updateSelectEnsena(value: string[]) {
    //  console.log('Marcado ' + value);
  }
  updateSelectAntiguedad(value: string) {
    //   console.log('Marcado ' + value);
  }
  updateSelectZona(value: string[]) {
    //   console.log('Marcado ' + value);
  }
  updateSelectIndicador(value: string[]) {
    console.log("VALUE INDIC ", value)
    if (value !== undefined) {
      console.log("VALUE INDIC 2 ", value)
      // Se comprueban las filas seleccionadas
      if (value.includes('Número de operaciones')) {
        this.visible_n_operac = true;
        console.log("Número de operaciones ", value)
      } else {
        this.visible_n_operac = false;
      }
      if (value.includes('Ticket medio')) {
        this.visible_t_medio = true;
      } else {
        this.visible_t_medio = false;
      }
      if (value.includes('Venta total')) {
        this.visible_v_total = true;
      } else {
        this.visible_v_total = false;
      }
    }
    // console.log('Marcado ' + value);
  }
  updateSelectModelo(value: string[]) {
    if (value !== undefined) {
      // Se comprueban las filas seleccionadas
      if (value.includes('enero')) {
        this.visible_m_enero = true;
      } else {
        this.visible_m_enero = false;
      }
      if (value.includes('febrero')) {
        this.visible_m_febrero = true;
      } else {
        this.visible_m_febrero = false;
      }
      if (value.includes('marzo')) {
        this.visible_m_marzo = true;
      } else {
        this.visible_m_marzo = false;
      }
      if (value.includes('abril')) {
        this.visible_m_abril = true;
      } else {
        this.visible_m_abril = false;
      }
      if (value.includes('mayo')) {
        this.visible_m_mayo = true;
      } else {
        this.visible_m_mayo = false;
      }
      if (value.includes('junio')) {
        this.visible_m_junio = true;
      } else {
        this.visible_m_junio = false;
      }
      if (value.includes('julio')) {
        this.visible_m_julio = true;
      } else {
        this.visible_m_julio = false;
      }
      if (value.includes('agosto')) {
        this.visible_m_agosto = true;
      } else {
        this.visible_m_agosto = false;
      }
      if (value.includes('septiembre')) {
        this.visible_m_septiembre = true;
      } else {
        this.visible_m_septiembre = false;
      }
      if (value.includes('octubre')) {
        this.visible_m_octubre = true;
      } else {
        this.visible_m_octubre = false;
      }
      if (value.includes('noviembre')) {
        this.visible_m_noviembre = true;
      } else {
        this.visible_m_noviembre = false;
      }
      if (value.includes('diciembre')) {
        this.visible_m_diciembre = true;
      } else {
        this.visible_m_diciembre = false;
      }
      if (value.includes('12 meses')) {
        this.visible_12_meses = true;
      } else {
        this.visible_12_meses = false;
      }
    }
  }
  //Grid Data
  updateSelectGridData(value: string) {
    if (value !== undefined) {
      // Aqui se va a cambiar el grid
    }
  }
  // Ubicaciones óptimas
  updateSelectIndicadorUbic(value: string) {
    if (value !== undefined) {
      this.resetCanvas();
      this.llenarGrid();
      this.tipo_modelo_ind = value;

      // Se comprueban las filas seleccionadas
      if (value.includes('% Ocupación')) {
        this.visible_n_operac_opt = true;
        this.indicador_ubic = 'numero_operaciones';
      } else {
        this.visible_n_operac_opt = false;
      }

      if (value.includes('Número de operaciones')) {
        this.visible_n_operac_opt = true;
        this.indicador_ubic = 'numero_operaciones';
      } else {
        this.visible_n_operac_opt = false;
      }
      if (value.includes('Ticket medio')) {
        this.visible_t_medio_opt = true;
        this.indicador_ubic = 'ticket_medio';
      } else {
        this.visible_t_medio_opt = false;
      }
      if (value.includes('Venta total')) {
        this.visible_v_total_opt = true;
        this.indicador_ubic = 'venta_total';
      } else {
        this.visible_v_total_opt = false;
      }
    }
    //console.log('Marcado ' + value);
  }
  updateSelectModeloUbic(value: string) {
    value = value.toLowerCase()
    if (value !== undefined) {
      this.resetCanvas();
      this.llenarGrid();
      this.tipo_modelo_opt = value;
      // Se comprueban las filas seleccionadas

      if (value.includes('enero')) {
        this.visible_enero = true;
        this.model_ubic = 'enero';
      } else {
        this.visible_enero = false;
      }
      if (value.includes('febrero')) {
        this.visible_febreo = true;
        this.model_ubic = 'febrero';
      } else {
        this.visible_febreo = false;
      }
      if (value.includes('marzo')) {
        this.visible_marzo = true;
        this.model_ubic = 'marzo';
      } else {
        this.visible_marzo = false;
      }
      if (value.includes('abril')) {
        this.visible_abril = true;
        this.model_ubic = 'abril';
      } else {
        this.visible_abril = false;
      }
      if (value.includes('mayo')) {
        this.visible_mayo = true;
        this.model_ubic = 'mayo';
      } else {
        this.visible_mayo = false;
      }
      if (value.includes('junio')) {
        this.visible_junio = true;
        this.model_ubic = 'junio';
      } else {
        this.visible_junio = false;
      }
      if (value.includes('julio')) {
        this.visible_julio = true;
        this.model_ubic = 'julio';
      } else {
        this.visible_julio = false;
      }
      if (value.includes('agosto')) {
        this.visible_agosto = true;
        this.model_ubic = 'agosto';
      } else {
        this.visible_agosto = false;
      }
      if (value.includes('septiembre')) {
        this.visible_septiembre = true;
        this.model_ubic = 'septiembre';
      } else {
        this.visible_septiembre = false;
      }
      if (value.includes('octubre')) {
        this.visible_octubre = true;
        this.model_ubic = 'octubre';
      } else {
        this.visible_octubre = false;
      }
      if (value.includes('noviembre')) {
        this.visible_noviembre = true;
        this.model_ubic = 'noviembre';
      } else {
        this.visible_noviembre = false;
      }
      if (value.includes('diciembre')) {
        this.visible_diciembre = true;
        this.model_ubic = 'diciembre';
      } else {
        this.visible_diciembre = false;
      }
      if (value.includes('12 meses')) {
        this.visible_12_meses_opt = true;
        this.model_ubic = '12 meses';
      } else {
        this.visible_12_meses_opt = false;
      }
    }
  }
  // selectores de punteros
  pointerSelect() {
    const canvas = this.map.getCanvasContainer();
    canvas.style.cursor = 'default';
    this.var_cord = true;
    this.loadCordenada();
  }

  handSelect() {
    const canvas = this.map.getCanvasContainer();
    canvas.style.cursor = 'grabbing';
    this.var_cord = false;
    this.loadCordenada();
  }
  ShowColumnasZonas() {
    this.visible_colum_zon_inf = !this.visible_colum_zon_inf;
  }

  // Pintar zonas desde Eventos
  loadOpcionesVisual() {
    const value = this.opciones_visual_selected;
    if (value !== undefined) {

      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };
      if (this.visible_vivi) {
        this.censService.getDataViviendas(data_api).subscribe((data: DataApiVisual | any) => {
          this.viviendas_cor = data['viviendas'];

          this.loadZonasColor();
        }, (error) => {
          alert('Ha ocurrido un error datos vivienda.');
          this.visible_vivi = false;

        });
      }
      if (this.visible_comp) {

        this.censService.getDataCompetencia(data_api).subscribe((data: DataApiVisual | any) => {

          this.competencias_cor = data['competidores'];
          this.loadZonasColor();
        }, (error) => {
          alert('Ha ocurrido un error datos competencia.');
          this.visible_comp = false;
          console.log(error);
        });
      }
      // Centros Propios
      if (this.visible_cent) {

        this.censService.getDataCentrosPropios(data_api).subscribe((data: DataApiVisual | any) => {

          this.centros_cor = data['centros_propios'];
          this.loadZonasColor();
        }, (error) => {
          alert('Ha ocurrido un error datos centros propios.');
          this.visible_cent = false;
          console.log(error);
        });
      }
    }
  }
  // Opciones de visualizacion
  visibleViviendas() {
    this.visible_vivi = !this.visible_vivi;
    if (this.map_model.salida_ok === true && this.visible_vivi) {
      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };
      this.censService.getDataViviendas(data_api).subscribe((data: DataApiVisual | any) => {
        this.viviendas_cor = data['viviendas'];
        console.log('VIVIENDAS DATOS:', data_api);
        console.log('VIVIENDAS RESULTADOS:', data);
        // console.log(this.viviendas_cor);
        // this.loadOpcVisual();
        if (this.viviendas_cor.length > 0) {
          this.pintar_puntos('blue', this.viviendas_cor, 'layer_viviendas', 'rec_viviendas');
        }
      }, (error) => {
        alert('Ha ocurrido un error datos vivienda.');
        this.visible_vivi = false;
        console.log(error);
      });
    } else if (this.map_model.salida_ok) {
      this.viviendas_cor = [];
      this.map.removeLayer('layer_viviendas');
      this.map.removeSource('rec_viviendas');

      // this.loadZonasColor(); layer_viviendas', 'rec_viviendas

    } else {
      this.viviendas_cor = [];
    }
  }

  /*visibleCompetencias() {
    console.log("Visible variable www ", this.visible_comp)
    this.visible_comp = !this.visible_comp;
    if (this.map_model.salida_ok === true && this.visible_comp) {
      // this.loadExtremos();
      // const  data_api: DataApiVisual = {
      //   latX: this.noroeste['lat'],
      //   lngX: this.noroeste['lng'],
      //   latY: this.sureste['lat'],
      //   lngY: this.sureste['lng']
      // };
      // this.censService.getDataCompetencia(data_api).subscribe(( data: DataApiVisual) => {
      //   this.competencias_cor = data['competidores'];
      //   console.log('COMPETENCIAS DATOS:',data_api);
      //   console.log('COMPETENCIAS RESULTADOS:',data);
      //   // console.log(this.viviendas_cor);
      //   // this.loadOpcVisual();
      //   if (this.competencias_cor.length > 0) {
      //     this.pintar_puntos('red', this.competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor',9 );
      //   }
      // }, (error) => {
      //   alert('Ha ocurrido un error Datos Competencia!! ');
      //   this.visible_comp = false;
      //   console.log(error);
      //   });

      if (this.competencias_cor.length > 0) {
        this.pintar_puntos('red', this.competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor', 9);
      }
    } else if (this.map_model.salida_ok) {
      // this.competencias_cor = [];
      this.map.removeLayer('layer_competencias_cor');
      this.map.removeSource('rec_competencias_cor');

    } else {
      this.competencias_cor = [];
    }
  }*/

  visibleCompetenciasOld() {
    console.log("Visible variable www ", this.visible_comp)
    this.visible_comp = !this.visible_comp;
    if (this.map_model.salida_ok === true && this.visible_comp) {
      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };
      this.censService.getDataCompetencia(data_api).subscribe((data: DataApiVisual | any) => {
        this.competencias_cor = data['competidores'];
        console.log('COMPETENCIAS DATOS:', data_api);
        console.log('COMPETENCIAS RESULTADOS:', data);
        if (this.competencias_cor.length > 0) {
          this.pintar_puntos('red', this.competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor', 9);
        }
      }, (error) => {
        alert('Ha ocurrido un error durante la carga de los datos del servicio datos competencia.');
        this.visible_comp = false;
        console.error(error);
      });

    } else if (this.map_model.salida_ok) {
      this.competencias_cor = [];
      this.map.removeLayer('layer_competencias_cor');
      this.map.removeSource('rec_competencias_cor');

    } else {
      this.competencias_cor = [];
    }
  }


  visibleCompetencias() {

    this.visible_comp = !this.visible_comp;
    if (this.map_model.salida_ok === true && this.visible_comp) {
      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };

      //this.competencias_cor = this._competidores['competidores'];
      this.competencias_cor = this._competidores;

      if (this.competencias_cor.length > 0) {
        this.pintar_puntosComp('red', this.competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor', 9);
        this.pintar_puntosCompText('red', this.competencias_cor, 'layer_competencias_cor', 'rec_competencias_cor', 9);
      }

    } else if (this.map_model.salida_ok) {
      this.competencias_cor = [];
      this.map.removeLayer('layer_competencias_cor');
      this.map.removeSource('rec_competencias_cor');

      this.map.removeLayer('idpoints');
      this.map.removeSource('points');


    } else {
      this.competencias_cor = [];
    }
  }

  visibleCentros() {
    this.visible_cent = !this.visible_cent;
    if (this.map_model.salida_ok === true && this.visible_cent) {
      this.loadExtremos();
      const data_api: DataApiVisual = {
        latX: this.noroeste['lat'],
        lngX: this.noroeste['lng'],
        latY: this.sureste['lat'],
        lngY: this.sureste['lng']
      };
      this.censService.getDataCentrosPropios(data_api).subscribe((data: DataApiVisual | any) => {
        this.centros_cor = data['centros_propios'];
        // console.log(data['centros_propios']);
        // this.loadOpcVisual();
        if (this.centros_cor.length > 0) {
          this.pintar_puntos('#FFFFFF', this.centros_cor, 'layer_centros', 'rec_centros');
        }
      }, (error) => {
        alert('Ha ocurrido un error datos centros propios.');
        this.visible_cent = false;
        console.log(error);
      });
    } else if (this.map_model.salida_ok) {
      this.centros_cor = [];
      this.map.removeLayer('layer_centros');
      this.map.removeSource('rec_centros');

    } else {
      this.centros_cor = [];
    }
  }
  /**
   *Metodos para transito
   */
  llenarTransito() {
    var llaves_api
    if (this.transito_table2['POI_type'] != undefined) {
      llaves_api = Object.keys(this.transito_table2['POI_type'][0]);
    } else {
      llaves_api = ""
    }
    //const llaves_api = Object.keys(this.transito_table2['POI_type'][0]);

    // console.log('LLAVES', llaves_api);
    // console.log('Tiene: ', llaves_api.includes('eat-drink'), this.transito_table2['eat-drink']);
    // console.log('ARREGLO TABLA', this.transito_table);

    // Limpiando la Variable
    // this.transito_table = [];
    // this.transito_grafico = [];
    // this.transito_grafico = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // this.indices = [];
    // Key --> eat-drink
    if (llaves_api.includes('eat-drink')) {
      this.transito_grafico[14] = this.transito_table2['eat-drink']['Cantidad'];
    } // End if
    // Key --> going-out
    if (llaves_api.includes('going-out')) {
      this.transito_grafico[13] = this.transito_table2['going-out']['Cantidad'];
    } // End if
    // Key --> transport
    if (llaves_api.includes('transport')) {
      this.transito_grafico[12] = this.transito_table2['transport']['Cantidad'];
    } // End if
    // Key --> shopping
    if (llaves_api.includes('shopping')) {
      this.transito_grafico[11] = this.transito_table2['shopping']['Cantidad'];
    } // End if
    // Key --> bussiness-services
    if (llaves_api.includes('bussiness-services')) {
      this.transito_grafico[10] = this.transito_table2['bussiness-services']['Cantidad'];
    } // End if
    // Key --> accommodation
    if (llaves_api.includes('accommodation')) {
      this.transito_grafico[9] = this.transito_table2['accommodation']['Cantidad'];
    } // End if
    // Key --> facilities
    if (llaves_api.includes('facilities')) {
      this.transito_grafico[8] = this.transito_table2['facilities']['Cantidad'];
    } // End if
    // Key --> hospital-health-care-facility
    if (llaves_api.includes('hospital-health-care-facility')) {
      this.transito_grafico[7] = this.transito_table2['hospital-health-care-facility']['Cantidad'];
    } // End if
    // Key --> sights-museums
    if (llaves_api.includes('sights-museums')) {
      this.transito_grafico[6] = this.transito_table2['sights-museums']['Cantidad'];
    } // End if
    // Key --> leisure-outdoor
    if (llaves_api.includes('leisure-outdoor')) {
      this.transito_grafico[5] = this.transito_table2['leisure-outdoor']['Cantidad'];
    } // End if
    // Key --> administrative-areas-buildings
    if (llaves_api.includes('administrative-areas-buildings')) {
      this.transito_grafico[4] = this.transito_table2['administrative-areas-buildings']['Cantidad'];
    } // End if
    // Key --> petrol-station
    if (llaves_api.includes('petrol-station')) {
      this.transito_grafico[3] = this.transito_table2['petrol-station']['Cantidad'];
    } // End if
    // Key --> atm-bank-exchange
    if (llaves_api.includes('atm-bank-exchange')) {
      this.transito_grafico[2] = this.transito_table2['atm-bank-exchange']['Cantidad'];
    } // End if
    // Key --> toilet-rest-area
    if (llaves_api.includes('toilet-rest-area')) {
      this.transito_grafico[1] = this.transito_table2['toilet-rest-area']['Cantidad'];
    } // End if
    // Key --> natural-geographical
    if (llaves_api.includes('natural-geographical')) {
      this.transito_grafico[0] = this.transito_table2['natural-geographical']['Cantidad'];
    } // End if
  }
  filtrarTransito(e) {
    console.log('Emitido', e);
    this.transito_table = [];
    this.indices = e;
    // Incluir indice
    if (this.indices.includes(14)) {
      console.log('Incluye 14');
      this.transito_table2['eat-drink']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Restaurantes/Cafeterías', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 14
    if (this.indices.includes(13)) {
      console.log('Incluye 13');
      this.transito_table2['going-out']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Locales de ocio', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 13
    if (this.indices.includes(12)) {
      console.log('Incluye 12');
      this.transito_table2['transport']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Transporte', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 12
    if (this.indices.includes(11)) {
      console.log('Incluye 11');
      this.transito_table2['shopping']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Tiendas', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 11
    // Incluir indice 10
    if (this.indices.includes(10)) {
      this.transito_table2['bussiness-services']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Servicios de negocios', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 10
    // Incluir indice 9
    if (this.indices.includes(9)) {
      this.transito_table2['accommodation']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Alojamientos', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.9
    // Incluir indice 8
    if (this.indices.includes(8)) {
      this.transito_table2['facilities']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Centros de salud/Academias', element.Nombre,
            element.Direccion, element.Distancia]
        );
      });
    } // End if indc. 8
    // Incluir indice 7
    if (this.indices.includes(7)) {
      this.transito_table2['hospital-health-care-facility']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Centros de salud /Clínicas', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.7
    // Incluir indice 6
    if (this.indices.includes(6)) {
      this.transito_table2['sights-museums']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Museos o centros Culturales', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.6
    // Incluir indice 5
    if (this.indices.includes(5)) {
      this.transito_table2['leisure-outdoor']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Parques', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.5
    // Incluir indice 4
    if (this.indices.includes(4)) {
      this.transito_table2['administrative-areas-buildings']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Organismos administrativos', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.4
    // Incluir indice 3
    if (this.indices.includes(3)) {
      this.transito_table2['petrol-station']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Gasolineras', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.3
    // Incluir indice 2
    if (this.indices.includes(2)) {
      this.transito_table2['atm-bank-exchange']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Oficinas bancarias', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.2
    // Incluir indice 1
    if (this.indices.includes(1)) {
      this.transito_table2['toilet-rest-area']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Oficinas bancarias', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.1
    // Incluir indice 0
    if (this.indices.includes(0)) {
      this.transito_table2['natural-geographical']['Lugares'].forEach(element => {
        this.transito_table.push(
          ['Naturaleza', element.Nombre, element.Direccion, element.Distancia]
        );
      });
    } // End if indc.0

    // Vovle a Cargar DataTable
    this.datatable.clear();
    this.datatable.row.add(this.transito_table);
    this.datatable.draw();

  }
  // Metodo para ejecutar Tab Estimacion ventas
  ejecutarEstVentas() {

    this.isVenta = "false"
    this.isErrorVenta = "false"

    this.runner_ventas = true;
    if (this.map_model.salida_ok !== true) {
      this.isVenta = ""
      this.isErrorVenta = ""
      alert('No se ha procesado ninguna dirección literal.');
      this.runner_ventas = false;
      return;
    }

    //this.censService.getEstimacionVentas(this.lng, this.lat, this.tipo_centro, this.tamano)
    this.censService.getEstimacionVentas(this.lng, this.lat, this.tipo_centro, this.tamano, this.respPois).subscribe((data: any) => {
      this.isVenta = "true"
      this.estimacion_ventas = data['modelos_resultado'];
      console.log(this.estimacion_ventas);
      this.runner_ventas = false;
    },
      (error) => {
        this.isErrorVenta = "true"
        alert('Ha ocurrido un error con datos de estimación de ventas.');
        this.runner_ventas = false;
        console.log(error);
      });
  }

  ejecutarEstVentasAll() {

    this.runner_ventas = false;
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.runner_ventas = false;
      return;
    }
    //this.censService.getEstimacionVentas(this.lng, this.lat, this.tipo_centro, this.tamano)
    this.censService.getEstimacionVentas(this.lng, this.lat, this.tipo_centro, this.tamano, this.respPois).subscribe((data: any) => {

      this.estimacion_ventas = data['modelos_resultado'];

      this.runner_ventas = false;
    },
      (error) => {
        alert('Ha ocurrido un error con datos de estimación de ventas.');
        this.runner_ventas = false;
        console.log(error);
      });
  }
  /**
   * Apartado de Competencias
   */
  ejecutarCompetenciaTab() {
    this.isCompetencia = "false"
    this.isErrorCompetencia = "false"

    this.runner_compet = true;
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.isCompetencia = ""
      this.isErrorCompetencia = ""
      this.runner_compet = false;
      return;
    }
    // validando los campos
    const nombre = this.nombre_compet.trim();
    const area = this.area_busq.trim();
    if (area.length < 1) {
      this.isCompetencia = ""
      this.isErrorCompetencia = ""
      alert('Debe introducir un valor numérico en Área de búsqueda');
      this.runner_compet = false;
      return;
    } else if (isNaN(parseInt(area))) {
      this.isCompetencia = ""
      this.isErrorCompetencia = ""
      alert('El valor introducido en Área de búsqueda debe ser numérico.');
      this.runner_compet = false;
      return;
    }
    // Llamando a APi Punto Clave
    this.censService.getPuntoInteresPalClave(this.lat, this.lng, this.area_busq, nombre).subscribe((data: any) => {
      this.isCompetencia = "true"

      if (data.length === 0) {
        alert('No se encontraron Resultados para estos valores');
        this.runner_compet = false;
        return;
      }

      const v_this = this;
      this.list_competencias = data[0]['Lugares'];
      const usuario: Usuario = {
        alias: '',
        pass: ''
      };
      if (localStorage.getItem('usuario') !== null) {
        usuario.alias = JSON.parse(localStorage.getItem('usuario')).alias;
        usuario.pass = JSON.parse(localStorage.getItem('usuario')).pass;

      } else {
        alert('Debe Autenticarse');
        this.route.navigateByUrl('/login');
        return;
      }
      // determinar las coordenadas de cada direccion
      this.list_competencias.forEach(function (elemento, indice, array) {
        // llamada a APi Direccion en cada posicion

        v_this.mapService.getAttrPrivate(elemento['Direccion'], usuario).subscribe((dataMap: MapModel) => {

          v_this.competencias_cor.push([dataMap.longitud, dataMap.latitud]);
          v_this.runner_compet = false;
          v_this.visible_btn_compet = true;
          $('#btn-compt').prop('disabled', false);
        }, (error) => {
          this.isErrorCompetencia = "true"
          alert('Ha ocurrido un error con microsevicio competencia.');
          console.log(error);
          this.runner_compet = false;
          this.visible_btn_compet = false;
        });
      });

      //  this.runner_compet = false;
      //  this.visible_btn_compet = true;

    }, (error) => {
      alert('Ha ocurrido un error con microsevicio competencia.');
      console.log(error);
      this.runner_compet = false;
      this.visible_btn_compet = false;
    });
  }

  ejecutarCompetenciaTabAll() {
    this.runner_compet = false;
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      this.runner_compet = false;
      return;
    }
    // validando los campos
    const nombre = this.nombre_compet.trim();
    const area = this.area_busq.trim();
    if (area.length < 1) {
      alert('Debe introducir un valor numérico en Área de búsqueda');
      this.runner_compet = false;
      return;
    } else if (isNaN(parseInt(area))) {
      alert('El valor introducido en Área de búsqueda debe ser numérico.');
      this.runner_compet = false;
      return;
    }
    // Llamando a APi Punto Clave
    this.censService.getPuntoInteresPalClave(this.lat, this.lng, this.area_busq, nombre).subscribe((data: any) => {
      if (data.length === 0) {
        alert('No se encontraron Resultados para estos valores');
        this.runner_compet = false;
        return;
      }

      const v_this = this;
      this.list_competencias = data[0]['Lugares'];
      const usuario: Usuario = {
        alias: '',
        pass: ''
      };
      if (localStorage.getItem('usuario') !== null) {
        usuario.alias = JSON.parse(localStorage.getItem('usuario')).alias;
        usuario.pass = JSON.parse(localStorage.getItem('usuario')).pass;

      } else {
        alert('Debe Autenticarse');
        this.route.navigateByUrl('/login');
        return;
      }
      // determinar las coordenadas de cada direccion
      this.list_competencias.forEach(function (elemento, indice, array) {
        // llamada a APi Direccion en cada posicion

        v_this.mapService.getAttrPrivate(elemento['Direccion'], usuario).subscribe((dataMap: MapModel) => {

          v_this.competencias_cor.push([dataMap.longitud, dataMap.latitud]);
          v_this.runner_compet = false;
          v_this.visible_btn_compet = true;
          $('#btn-compt').prop('disabled', false);
        }, (error) => {
          alert('Ha ocurrido un error con microsevicio competencia.');
          console.log(error);
          this.runner_compet = false;
          this.visible_btn_compet = false;
        });
      });
    }, (error) => {
      alert('Ha ocurrido un error con microsevicio competencia.');
      console.log(error);
      this.runner_compet = false;
      this.visible_btn_compet = false;
    });
  }
  enabledBtns(value) {
    $('#btn-vivien').prop('disabled', value);
    // $('#btn-compt').prop('disabled',value);
    $('#btn-cent').prop('disabled', value);
    $('#btn-hand').prop('disabled', value);
    $('#btn-point').prop('disabled', value);
    $('#txt-interacc').prop('disabled', value);
    $('#btn-rest').prop('disabled', value);
    $('#btn-add').prop('disabled', value);
    let botones_mapa = $('div.mapboxgl-ctrl-group button');
    //console.log('BOTONES MAPA',botones_mapa);
    botones_mapa.prop('disabled', value);
  }
  addInteraccio() {
    //alert(grid_position.length + '---'+ grid_data.length);
    if (this.var_interaccion === '' || this.var_interaccion === '100') {
      this.var_interaccion = grid_position[0];
      this.resetGridValues();
      this.resetCanvas();
      this.llenarGrid();
      return;
    }
    const pos = grid_position.indexOf(this.var_interaccion);
    if (pos < 60) {
      this.var_interaccion = grid_position[pos + 1];
      this.resetGridValues();
      this.resetCanvas();
      this.llenarGrid();
    }
  }
  restInteraccio() {
    if (this.var_interaccion === '' || this.var_interaccion === '2') {
      this.var_interaccion = grid_position[59];
      this.resetGridValues();
      this.resetCanvas();
      this.llenarGrid();
      return;
    }
    const pos = grid_position.indexOf(this.var_interaccion);
    if (pos > 0) {
      this.var_interaccion = grid_position[pos - 1];
      this.resetGridValues();
      this.resetCanvas();
      this.llenarGrid();
    }
  }

  onChangeType(e) {
    this.selectedType = e.target.value;

    if (this.selectedType == 1) {
      this.zona_influe.get('metros1').setValue(this.cant.value);

      //reset
      this.zona_influe.get('min_andando1').reset("");
      this.zona_influe.get('min_coche1').reset("")
      //end reset
    }
    if (this.selectedType == 2) {
      this.zona_influe.get('min_andando1').setValue(this.cant.value);

      //reset
      this.zona_influe.get('metros1').reset("")
      this.zona_influe.get('min_coche1').reset("")
      //end reset
    }
    if (this.selectedType == 3) {
      this.zona_influe.get('min_coche1').setValue(this.cant.value)

      //reset
      this.zona_influe.get('metros1').reset("")
      this.zona_influe.get('min_andando1').reset("")
      //end reset
    }
  }
  onChangeTypeZone2(e) {
    this.selectedTypeZone2 = e.target.value;

    if (this.selectedTypeZone2 == 1) {
      this.zona_influe.get('metros2').setValue(this.cantZone2.value);

      //reset
      this.zona_influe.get('min_andando2').reset("");
      this.zona_influe.get('min_coche2').reset("")
      //end reset
    }
    if (this.selectedTypeZone2 == 2) {
      this.zona_influe.get('min_andando2').setValue(this.cantZone2.value);

      //reset
      this.zona_influe.get('metros2').reset("")
      this.zona_influe.get('min_coche2').reset("")
      //end reset
    }
    if (this.selectedTypeZone2 == 3) {
      this.zona_influe.get('min_coche2').setValue(this.cantZone2.value)

      //reset
      this.zona_influe.get('metros2').reset("")
      this.zona_influe.get('min_andando2').reset("")
      //end reset
    }
  }
  onChangeTypeZone3(e) {
    this.selectedTypeZone3 = e.target.value;

    if (this.selectedTypeZone3 == 1) {
      this.zona_influe.get('metros3').setValue(this.cantZone3.value)

      //reset
      this.zona_influe.get('min_andando3').reset("");
      this.zona_influe.get('min_coche3').reset("")
      //end reset
    }
    if (this.selectedTypeZone3 == 2) {
      this.zona_influe.get('min_andando3').setValue(this.cantZone3.value)

      //reset
      this.zona_influe.get('metros3').reset("")
      this.zona_influe.get('min_coche3').reset("")
      //end reset
    }
    if (this.selectedTypeZone3 == 3) {
      this.zona_influe.get('min_coche3').setValue(this.cantZone3.value)

      //reset
      this.zona_influe.get('metros3').reset("")
      this.zona_influe.get('min_andando3').reset("")
      //end reset
    }
  }
  onChangeTypeZone4(e) {
    this.selectedTypeZone4 = e.target.value;

    if (this.selectedTypeZone4 == 1) {
      this.zona_influe.get('metros4').setValue(this.cantZone4.value);

      //reset
      this.zona_influe.get('min_andando4').reset("");
      this.zona_influe.get('min_coche4').reset("")
      //end reset
    }
    if (this.selectedTypeZone4 == 2) {
      this.zona_influe.get('min_andando4').setValue(this.cantZone4.value);

      //reset
      this.zona_influe.get('metros4').reset("")
      this.zona_influe.get('min_coche4').reset("")
      //end reset
    }
    if (this.selectedTypeZone4 == 3) {
      this.zona_influe.get('min_coche4').setValue(this.cantZone4.value)

      //reset
      this.zona_influe.get('metros4').reset("")
      this.zona_influe.get('min_andando4').reset("")
      //end reset
    }
  }

  setSelectedIndicator(e) {
  }
  setSelectedModel(e) {
  }

  addTab(e) {
    if (e.value == "socio" && !this.isSociodemografico) {
      this.isSociodemografico = true
      for (let entry of this.sociodemografico) {
        this.selectedStatistic.push(entry)
      }
    }
    if (e.value == "eco" && !this.isEconomicos) {
      this.isEconomicos = true
      for (let entry of this.economicos) {
        this.selectedStatistic.push(entry)
      }
    }
    if (e.value == "vivienda" && !this.isVivienda) {
      this.isVivienda = true
      for (let entry of this.vivienda) {
        this.selectedStatistic.push(entry)
      }
    }

  }

  removeTab(e) {

    if (e.value.value == "socio") {
      this.isSociodemografico = false
      this.recursiveRemove("socio")
    }
    if (e.value.value == "eco") {
      this.isEconomicos = false
      this.recursiveRemove("eco")
    }
    if (e.value.value == "vivienda") {
      this.isVivienda = false
      this.recursiveRemove("vivienda")
    }
  }


  recursiveRemove(code) {
    this.selectedStatisticCopy = []
    for (var i = 0; i < this.selectedStatistic.length; i++) {

      if (this.selectedStatistic[i].code != code) {
        this.selectedStatisticCopy.push(this.selectedStatistic[i])
      }
    }
    this.selectedStatistic = this.selectedStatisticCopy
  }

  changeTab(e) {
    if (this.selectedTab.length == 0) {
      this.isSociodemografico = false
      this.isEconomicos = false
      this.isVivienda = false
      this.selectedStatistic = []
    }
  }


  setSelectedZone(e) { }

  esPar(numero) {
    return (numero % 2) == 0;
  }

  assignZoneStatistic(statistic, zone) {

  }

  loadZoneColor() {
    if ((this.metros_zona1 > 0 && this.cordenadas1.length === 0) && (this.metros_zona2 > 0 && this.cordenadas2.length === 0)
      && (this.metros_zona3 > 0 && this.cordenadas3.length === 0) && (this.metros_zona4 > 0 && this.cordenadas4.length === 0)) {
      console.error("Los metros y cordenadas estan vacío.")
    } else {
      console.log("Existe alguna zona con metros y cordenadas.")
      this.loadZonasColor();
      this.runner = false;
    }
  }

  executeAllOld() {
    this.resetZona1();
    this.resetZona2();
    this.resetZona3();
    this.resetZona4();

    //zona de influencia
    this.zona_influe.get('min_andando1').setValue(5)
    this.zona_influe.get('metros1').setValue('')
    this.zona_influe.get('min_coche1').setValue('');

    this.zona_influe.get('min_andando2').setValue(10)
    this.zona_influe.get('metros2').setValue('')
    this.zona_influe.get('min_coche2').setValue('');

    this.zona_influe.get('min_andando3').setValue('')
    this.zona_influe.get('metros3').setValue('')
    this.zona_influe.get('min_coche3').setValue('');

    this.zona_influe.get('min_andando4').setValue('')
    this.zona_influe.get('metros4').setValue('')
    this.zona_influe.get('min_coche4').setValue('');

    this.type.setValue(2)
    this.typeZone2.setValue(2)
    this.typeZone3.setValue('')
    this.typeZone4.setValue('')

    //new code
    this.selectedType = 2
    this.selectedTypeZone2 = 2
    //end new code

    this.cant.setValue(5)
    this.cantZone2.setValue(10)
    this.cantZone3.setValue('')
    this.cantZone4.setValue('')

    //competencia
    this.nombre_compet = "aparcamiento"// "Parking"
    this.area_busq = "300"

    //estimacion rendimiento
    this.tamano = 4.1
    this.tipo_centro = 300

    this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.loadDataAll()

    /*this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;*/
  }

  loadDataAll(event?) {
    localStorage.setItem("dirLiteral", JSON.stringify(this.dir_literal))
    this.mapService.sendMessageDirLiteral(this.dir_literal)

    this.isLoadDataAll = true

    this.isDir = "false"
    this.isErrorDir = "false"
    this.isComboEstVenta = "false"
    this.isErrorComboEstVenta = "false"
    this.isCensal = "false"
    this.isErrorCensal = "false"
    this.isErrorMeteorologia = "false"
    this.isMeteorologia = "false"
    this.isMunicipio = "false"
    this.isErrorMunicipio = "false"

    /*this.isZone1 = "false"
    this.isErrorZone1 = "false"
    this.isZone2 = "false"
    this.isErrorZone2 = "false"
    this.isZone3 = "false"
    this.isErrorZone3 = "false"
    this.isZone4 = "false"
    this.isErrorZone4 = "false"*/

    this.isCompetencia = "false"
    this.isErrorCompetencia = "false"
    this.isVenta = "false"
    this.isErrorVenta = "false"
    this.isLocation = "false"
    this.isErrorLocation = "false"

    this.isGetParamVentas = false

    if (event !== undefined) {
      if (event.keyCode !== 13) {
        this.resetLoading()
        return;
      }
    }
    if (this.dir_literal.trim() === '') {
      this.resetLoading()
      alert('Debe ingresar una dirección literal.');
      return;
    }
    const usuario: Usuario = {
      alias: '',
      pass: ''
    };
    if (localStorage.length > 0) {

      if (localStorage.getItem('usuario') !== null) {
        usuario.alias = JSON.parse(localStorage.getItem('usuario')).alias;
        usuario.pass = JSON.parse(localStorage.getItem('usuario')).pass;

      } else {
        alert('Debe Autenticarse');
        this.route.navigateByUrl('/login');
        return;
      }
    } else {

      alert('Debe Autenticarse');
      this.route.navigateByUrl('/login');
      return;
    }

    this.mapService.getAttrPrivate(this.dir_literal, usuario).subscribe((data: MapModel) => {
      this.isDir = "true"
      if (data.salida_ok === false) {
        this.resetLoading()
        alert('No se pudo normalizar la direccón ingresada');
        return;
      }

      //resetaer Elementos de Ubicaciones
      this.resetGridValues();
      this.resetCanvas();
      this.resetTableUbic();
      this.var_interaccion = '';
      this.visible_canva = false;
      //-----------------------------

      this.map_model = data;
      this.lat = Number(this.map_model.latitud);
      this.lng = Number(this.map_model.longitud);

      //this.getPuntoInteresCompetenciaChart()

      mapboxgl.accessToken = environment.mapbox.accessToken;
      this.loadMap();

      //zona de influencia
      this.llenarZonas()

      //Competition
      //this.ejecutarCompetenciaTab()
      this.getPuntoInteresCompetencia()

      //Estimación de rendimiento de la ubicación
      //this.ejecutarEstVentas()
      this.getPuntoInteresTwo()

      //Search optimal locations
      this.ejecutarUbicaciones()

      // Para cargar los combos de Estimacion de ventas  -----********-----
      this.censService.getParamVentas(usuario.alias).subscribe((dataVenta: any) => {
        this.isComboEstVenta = "true"
        this.llenarComboCompetencia(dataVenta);
        this.isGetParamVentas = true

      }, (error) => {
        this.isErrorComboEstVenta = "true"
        alert('Ha ocurrido un error al cargar el servicio de estimación de ventas.');
        console.log(error);
      });

      this.censService.getCensalAttr(this.lng, this.lat).subscribe((censal: CensalModel | any) => {
        this.isCensal = "true"
        this.censal_model = censal;
        //para cargar Opciones de Visualizacion
        /*this.metros_zona1 = 0;
        this.metros_zona2 = 0;
        this.metros_zona3 = 0;
        this.metros_zona4 = 0;
        this.cordenadas1 = [];
        this.cordenadas2 = [];
        this.cordenadas3 = [];
        this.cordenadas4 = [];*/

        //new code
        this.visible_comp = false
        this.visible_vivi = false
        this.viviendas_cor = []
        this.competencias_cor = []
        //End new code

        this.loadOpcionesVisual();

        const cod = this.censal_model.c_seccion.substring(0, 5);
        // Se carga valores de municipio
        this.censService.getCensalMunic(cod).subscribe((municipio: CensalRadioModelMunc | any) => {

        }, (error) => {

          alert('');
          console.log(error);
        });
        // llamado a nuevo api Municipio
        this.censService.getCensalMunicipio(cod).subscribe((municipio: CensalRadioModelMunc | any) => {
          this.isMunicipio = "true"

          this.municipio_model = municipio;
          this.municipio_model.fu_de_ing_pensiones = this.municipio_model.fu_de_ing_pensiones * 100;
          this.municipio_model.fue_de_ing_prestaciones_por_desempleo = this.municipio_model.fue_de_ing_prestaciones_por_desempleo * 100;
          this.municipio_model.fu_de_ing_salario = this.municipio_model.fu_de_ing_salario * 100;
          this.municipio_model.fue_de_ingreso_otras_prestaciones = this.municipio_model.fue_de_ingreso_otras_prestaciones * 100;
          this.municipio_model.fue_de_ingreso_otros_ingresos = this.municipio_model.fue_de_ingreso_otros_ingresos * 100;
          this.municipio_model.porc_de_poblacion_mas_65 = this.municipio_model.porc_de_poblacion_mas_65 * 100;
          this.municipio_model.porc_de_poblacion_menor_18 = this.municipio_model.porc_de_poblacion_menor_18 * 100;
          this.municipio_model.porc_hogares_unipersonales = this.municipio_model.porc_hogares_unipersonales * 100;
          this.municipio_model.por_poblacion_renta_menor_5000 = this.municipio_model.por_poblacion_renta_menor_5000 * 100;
          this.municipio_model.por_poblacion_renta_menor_7500 = this.municipio_model.por_poblacion_renta_menor_7500 * 100;
          this.municipio_model.por_poblacion_renta_menor_10000 = this.municipio_model.por_poblacion_renta_menor_10000 * 100;

        }, (error) => {
          this.isErrorMunicipio = "true"
          alert('Ha ocurrido un error al cargar el servicio censal municipio.');
          console.log(error);
        });
        // end de censal

        // Datos meteorologia
        /*this.censService.getMeteoroloia(this.censal_model.c_seccion).subscribe((meteoro: any) => {
          this.isMeteorologia = "true"
          this.construirMetoro(meteoro);

        }, (error) => {
          this.isErrorMeteorologia = "true"
          alert('Ha ocurrido un error al cargar el servicio datos meteorológico.');
          console.log(error);
        });*/
      }, (error) => {
        this.isErrorCensal = "true"
        alert('Ha ocurrido un error al cargar el servicio sección censal.');
        console.log(error);
      });
    }, (msgError) => {
      this.isErrorDir = "true"
      this.resetLoading()
      console.log(msgError.error.text);
      if (msgError.error.text === 'No existe el usuario') {
        alert('No existe el usuario.');
        this.route.navigateByUrl('/login');
      } else {
        alert('Ha ocurrido un error quí.');
        console.log(msgError.error.text);
      }

    });

    /*this.resetZona1();
    this.resetZona2();
    this.resetZona3();
    this.resetZona4();*/
  }

  openModal(template: TemplateRef<any>) {
    this._vPillsHome = true
    this._vPillsProfile = false
    this._vPillsMessages = false
    this._vPillsSettings = false
    this._vPillsClima = false
    this._vPillsMapa = false
    this._vPillsComp = false

    //this.llenarEmergente(1);
    this.fillEmergentZone(1);
    this.fillEmergentZone(2);
    this.fillEmergentZone(3);
    this.fillEmergentZone(4);

    this.fillColor()

    // Datos meteorologia
    this.censService.getMeteoroloia(this.censal_model.c_seccion).subscribe((meteoro: any) => {
      this.isMeteorologia = "true"
      this.construirMetoro(meteoro);

    }, (error) => {

      this.isErrorMeteorologia = "true"

      alert('Ha ocurrido un error al cargar el servicio datos meteorológico.');
      console.log(error);
    });

    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });

    if (this.modalRef.content != null) {
      this.modalRef.content.closeBtnName = 'Close';
    }

  }


  resetLoading() {

    this.isDir = ""
    this.isErrorDir = ""
    this.isComboEstVenta = ""
    this.isErrorComboEstVenta = ""
    this.isCensal = ""
    this.isErrorCensal = ""
    this.isErrorMeteorologia = ""
    this.isMeteorologia = ""
    this.isMunicipio = ""
    this.isErrorMunicipio = ""

    this.isZone1 = ""
    this.isErrorZone1 = ""
    this.isZone2 = ""
    this.isErrorZone2 = ""
    this.isZone3 = ""
    this.isErrorZone3 = ""
    this.isZone4 = ""
    this.isErrorZone4 = ""

    this.isCompetencia = ""
    this.isErrorCompetencia = ""
    this.isVenta = ""
    this.isErrorVenta = ""
    this.isLocation = ""
    this.isErrorLocation = ""
  }

  getPuntoInteres() {
    this.colorEvent = 0
    this._data = []
    this.loadingPointI = false
    //this._data = [4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 5]

    if (this.lat != null && this.lng != null) {
      this.censService.getPuntoInteres(this.lat, this.lng, 500, "todos").subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next
        this.loadPointInterestCopy = next
        this.respPois = next

        //Sort list
        this.loadPointInterest = this.loadPointInterest.sort(function (a, b) {
          return a.POI_dist - b.POI_dist;
        });

        this.loadPointInterestCopy = this.loadPointInterest
        //End sort list

        //this.getListTypes(this.loadPointInterest)
        this.getListTypesCount(this.loadPointInterest)

        /*this._data.splice(this.colorEvent, 1, this.loadPointInterest.length);
        this._data = this._data.slice()*/
        //this.config.totalItems = this.loadPointInterest.length

        this.initChart()
        console.log("Puntos de interes A... ", next)
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    } /*else {

      this.censService.getPuntoInteres(40.43683, -3.64063, 500, "todos").subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next
        this.loadPointInterestCopy = next
        this.respPois = next

        //Sort list
        this.loadPointInterest = this.loadPointInterest.sort(function (a, b) {
          return a.POI_dist - b.POI_dist;
        });

        this.loadPointInterestCopy = this.loadPointInterest
        //End sort list

        //this.getListTypes(this.loadPointInterest)
        this.getListTypesCount(this.loadPointInterest)

        //this._data.splice(this.colorEvent, 1, this.loadPointInterest.length);
        //this._data = this._data.slice()

        this.config.totalItems = this.loadPointInterest.length
        console.log("Puntos de interes B... ", next)
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    }*/
  }

  getPuntoInteresTwo() {
    this.colorEvent = 0
    this._data = []
    this.loadingPointI = false
    if (this.lat != null && this.lng != null) {
      this.censService.getPuntoInteres(this.lat, this.lng, 500, "todos").subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next
        this.loadPointInterestCopy = next
        this.respPois = next

        //Sort list
        this.loadPointInterest = this.loadPointInterest.sort(function (a, b) {
          return a.POI_dist - b.POI_dist;
        });

        this.loadPointInterestCopy = this.loadPointInterest
        //End sort list

        this.ejecutarEstVentas()
        this.getListTypesCount(this.loadPointInterest)

        //this.config.totalItems = this.loadPointInterest.length
        this.initChart()
        
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    } /*else {

      this.censService.getPuntoInteres(40.43683, -3.64063, 500, "todos").subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next
        this.loadPointInterestCopy = next
        this.respPois = next

        //Sort list
        this.loadPointInterest = this.loadPointInterest.sort(function (a, b) {
          return a.POI_dist - b.POI_dist;
        });

        this.loadPointInterestCopy = this.loadPointInterest
        //End sort list

        this.ejecutarEstVentas()
        this.getListTypesCount(this.loadPointInterest)

        this.config.totalItems = this.loadPointInterest.length
        console.log("Puntos de interes B... ", next)
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    }*/
  }


  getPuntoInteresCustom(type: any) {
    this.loadingPointI = false
    this._data = [4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 5]

    if (this.lat != null && this.lng != null) {
      this.censService.getPuntoInteres(this.lat, this.lng, 500, type).subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next

        this._data.splice(this.colorEvent, 1, this.loadPointInterest.length);
        this._data = this._data.slice()

        this.config.totalItems = this.loadPointInterest.length
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    } else {

      this.censService.getPuntoInteres(40.43683, -3.64063, 500, type).subscribe((next: any) => {
        this.loadingPointI = true

        this.loadPointInterest = next

        this._data.splice(this.colorEvent, 1, this.loadPointInterest.length);
        this._data = this._data.slice()

        this.config.totalItems = this.loadPointInterest.length
      }, (error) => {
        this.loadingPointI = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    }
  }

  vPillsHome() {

    this._vPillsHome = true
    this._vPillsProfile = false
    this._vPillsMessages = false
    this._vPillsSettings = false
    this._vPillsClima = false
    this._vPillsMapa = false
    this._vPillsComp = false
  }
  vPillsProfile() {
    this._vPillsProfile = true
    this._vPillsHome = false
    this._vPillsMessages = false
    this._vPillsSettings = false
    this._vPillsClima = false
    this._vPillsMapa = false
    this._vPillsComp = false

  }

  vPillsMessages() {
    this._vPillsMessages = true
    this._vPillsProfile = false
    this._vPillsHome = false
    this._vPillsSettings = false
    this._vPillsClima = false
    this._vPillsMapa = false
    this._vPillsComp = false
  }

  vPillsSettings() {
    this._vPillsSettings = true
    this._vPillsMessages = false
    this._vPillsProfile = false
    this._vPillsHome = false
    this._vPillsClima = false
    this._vPillsMapa = false
    this._vPillsComp = false
  }

  vPillsClima() {
    this._vPillsClima = true
    this._vPillsSettings = false
    this._vPillsMessages = false
    this._vPillsProfile = false
    this._vPillsHome = false
    this._vPillsMapa = false
    this._vPillsComp = false

  }

  vPillsMapa() {
    this._vPillsMapa = true
    this._vPillsClima = false
    this._vPillsSettings = false
    this._vPillsMessages = false
    this._vPillsProfile = false
    this._vPillsHome = false
    this._vPillsComp = false
  }

  vPillsComp() {
    this._vPillsComp = true
    this._vPillsMapa = false
    this._vPillsClima = false
    this._vPillsSettings = false
    this._vPillsMessages = false
    this._vPillsProfile = false
    this._vPillsHome = false
  }

  eventRefreshFather(event) {
    this.config = {
      id: 'first',
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.loadPointInterestCopy.length
    };
    //this._data = [4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 16, 10, 8, 9, 12, 10, 11, 4, 5, 7, 10, 6, 20, 15, 5, 14, 5]

    var types = []

    this.colorEvent = event.index

    var type = event.name

    if (event.name == "todos") {
      this.loadPointInterest = this.loadPointInterestCopy

      /*this._data.splice(this.colorEvent, 1, this.loadPointInterestCopy.length);
      this._data = this._data.slice()*/
      this.config.totalItems = this.loadPointInterestCopy.length
    } else {


      for (let entry of this.loadPointInterestCopy) {
        var pos = entry.POI_types.indexOf(type)
        console.log("Types test ", type)
        if (pos != -1) {
          types.push(entry)
        }
      }

      //Sort list
      types = types.sort(function (a, b) {
        return a.POI_dist - b.POI_dist;
      });
      //End sort list

      this.loadPointInterest = types

      /*this._data.splice(this.colorEvent, 1, this.loadPointInterest.length);
      this._data = this._data.slice()*/
      this.config.totalItems = this.loadPointInterest.length

    }

    //this.getPuntoInteresCustom(type)
  }

  initChart() {
    this.config = {
      id: 'first',
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: 0
    };

    var types = []
    var type = "Politica"

    for (let entry of this.loadPointInterestCopy) {
      var pos = entry.POI_types.indexOf(type)
      if (pos != -1) {
        types.push(entry)
      }
    }

    //Sort list
    types = types.sort(function (a, b) {
      return a.POI_dist - b.POI_dist;
    });
    //End sort list

    this.loadPointInterest = types
    this.config.totalItems = this.loadPointInterest.length
  }


  fillEmergentZone(zona: number) {
    if (this.map_model.salida_ok !== true) {
      alert('No se ha procesado ninguna dirección literal.');
      return;
    }
    $('a.home').tab('show');

    switch (zona) {
      case 1:
        this.cens_rad_emergente_model = this.censal_radio1_model;
        this.zona = 'Zona 1';
        this.distancia_estudio = this.texto_zona1;

        if (this.cens_rad_emergente_model.Porc_de_poblacion_mas_65 == 0 && this.cens_rad_emergente_model.Porc_de_poblacion_menor_18 == 0) {
          this.porc_de_poblacion_mas_65_Zone1 = 0
        } else {
          this.porc_de_poblacion_mas_65_Zone1 = 100 - (this.cens_rad_emergente_model.Porc_de_poblacion_mas_65) - (this.cens_rad_emergente_model.Porc_de_poblacion_menor_18)
        }

        break;
      case 2:
        this.cens_rad_emergente_modelZone2 = this.censal_radio2_model;
        this.zona = 'Zona 2';
        this.distancia_estudioZone2 = this.texto_zona2;

        break;
      case 3:
        this.cens_rad_emergente_modelZone3 = this.censal_radio3_model;
        this.zona = 'Zona 3';
        this.distancia_estudioZone3 = this.texto_zona3;

        break;
      case 4:
        this.cens_rad_emergente_modelZone4 = this.censal_radio4_model;
        this.zona = 'Zona 4';
        this.distancia_estudio4 = this.texto_zona4;

        break;
      default:
        break;
    }
  }

  fillColor() {
    const color_zona1 = $('div#changeColor1').css('background-color');
    const color_zona2 = $('div#changeColor2').css('background-color');
    const color_zona3 = $('div#changeColor3').css('background-color');
    const color_zona4 = $('div#changeColor4').css('background-color');

    this.dataColor[0] = color_zona1
    this.dataColor[1] = color_zona2
    this.dataColor[2] = color_zona3
    this.dataColor[3] = color_zona4

    this.color_zona1 = color_zona1
    this.color_zona2 = color_zona2
    this.color_zona3 = color_zona3
    this.color_zona4 = color_zona4

    console.log("Ok test colores ", this.dataColor)
  }

  getListTypes(list) {
    var fila = []
    for (let i = 0; i < list.length; i++) {

      for (let j = 0; j < list[i].POI_types.length; j++) {

        if (fila.indexOf(list[i].POI_types[j]) == -1) {

          fila.push(list[i].POI_types[j])

        }

      }

    }

    console.log("Listado de tipos de establecimiento ", fila)

  }

  getPuntoInteresCompetencia() {
    //this._competidores.competidores = []
    this._competidores = []
    this.isCompetencia = "false"
    this.isErrorCompetencia = "false"
    this.loadingPointICompChart = false

    if (this.lat != null && this.lng != null) {
      this.censService.getPuntoInteres(this.lat, this.lng, this.area_busq, "parking").subscribe((next: any) => {
        this.isCompetencia = "true"
           if (next.message){
            this.loadPointInterestComp = []
             console.log("Message qqq ", next.message)
           }else{
            console.log("Message else qqq ", next)
        this.loadPointInterestComp = next

        //Competence chart
        this.loadingPointICompChart = true
        this.loadPointInterestCompChart = next
        this.configComp.totalItems = this.loadPointInterestCompChart.length
        //End competence chart

        for (let entry of this.loadPointInterestComp) {

          this._competidor = new Competidor()
          this._competidor.cord = entry.POI_location
          //this._competidor.dir = entry.POI_postaladd
          this._competidor.dir = entry.POI_name

          this._competidores.push(this._competidor)

          //this._competidores.competidores.push(entry.POI_location)
        }
      }

      }, (error) => {
        this.isErrorCompetencia = "true"
        this.loadingPointICompChart = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    } /*else {

      this.censService.getPuntoInteres(40.43683, -3.64063, 500, "parking").subscribe((next: any) => {
        this.isCompetencia = "true"
        this.loadPointInterestComp = next

        console.log("Puntos de interes competencia... ", next)
      }, (error) => {
        this.isErrorCompetencia = "true"
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    }*/
  }


  zoneSeparatorEst(separator) {
    /*separator = ', '
    separator = ' - '*/
    var elements = [];
    var text = ""

    for (let i = 0; i < this.dataForZone.length; i++) {
      elements.push(this.dataForZone[i].name)
      console.log("Test hola ", this.dataForZone)
    }

    if (elements.length > 0) {
      text = elements.join(separator)
    }

    this.textEst = text
  }

  zoneSeparatorLey(separator) {
    /*separator = ', '
    separator = ' - '*/
    var elements = [];
    var text = ""
    for (let i = 0; i < this.dataForZone.length; i++) {
      elements.push(this.dataForZone[i].name)
    }

    if (elements.length > 0) {
      text = elements.join(separator)
    }

    this.textLey = text
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  pageChangedComp(event) {
    this.configComp.currentPage = event;
  }

  getPuntoInteresCompetenciaChart() {
    this.loadingPointICompChart = false

    if (this.lat != null && this.lng != null) {
      this.censService.getPuntoInteres(this.lat, this.lng, 500, "parking").subscribe((next: any) => {
        this.loadingPointICompChart = true
        this.loadPointInterestCompChart = next
        this.configComp.totalItems = this.loadPointInterestCompChart.length

        console.log("Custom a ", next)
      }, (error) => {
        this.loadingPointICompChart = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    } else {

      this.censService.getPuntoInteres(40.43683, -3.64063, 500, "parking").subscribe((next: any) => {
        this.loadingPointICompChart = true
        this.loadPointInterestCompChart = next
        this.configComp.totalItems = this.loadPointInterestCompChart.length

        console.log("Custom b ", next)
      }, (error) => {
        this.loadingPointICompChart = true
        alert('Ha ocurrido un error al cargar el servicio punto de interés.');
        console.error(error);
      })
    }
  }


  getListTypesCount(list) {
    var fila = []
    this._data = []

    for (let i = 0; i < list.length; i++) {

      for (let j = 0; j < list[i].POI_types.length; j++) {

        fila.push(list[i].POI_types[j])

      }
    }


    //old code
    /* for (let i = 0; i < this.newFilter.length; i++) {
 
       if (i > 0) {
         var arrayTemp = fila.filter(word => word == this.newFilter[i]);
 
         this._data.push(arrayTemp.length)
 
       } else {
         this._data.push(list.length)
       }
     }*/

    //new code
    for (let i = 0; i < this.newFilter.length; i++) {
      var arrayTemp = fila.filter(word => word == this.newFilter[i]);

      this._data.push(arrayTemp.length)
    }

  }

  executeDefaultVal() {
    console.log("A1...", this.zona_influe.value)
    if (this.zona_influe.get('min_andando1').value == "" &&
      this.zona_influe.get('metros1').value == "" &&
      this.zona_influe.get('min_coche1').value == "" &&

      this.zona_influe.get('min_andando2').value == "" &&
      this.zona_influe.get('metros2').value == "" &&
      this.zona_influe.get('min_coche2').value == "" &&

      this.zona_influe.get('min_andando3').value == "" &&
      this.zona_influe.get('metros3').value == "" &&
      this.zona_influe.get('min_coche3').value == "" &&

      this.zona_influe.get('min_andando4').value == "" &&
      this.zona_influe.get('metros4').value == "" &&
      this.zona_influe.get('min_coche4').value == "") {

      return true
    }
    return false
  }

  executeAll() {
    this.resetZona1Change();
    this.resetZona2Change();
    this.resetZona3Change();
    this.resetZona4Change();

    //zona de influencia
    var _default = this.executeDefaultVal()

    console.log("A2...", _default)
    if (_default) {
      this.zona_influe.get('min_andando1').setValue(5)
      this.zona_influe.get('metros1').setValue('')
      this.zona_influe.get('min_coche1').setValue('');

      this.zona_influe.get('min_andando2').setValue(10)
      this.zona_influe.get('metros2').setValue('')
      this.zona_influe.get('min_coche2').setValue('');

      this.zona_influe.get('min_andando3').setValue('')
      this.zona_influe.get('metros3').setValue('')
      this.zona_influe.get('min_coche3').setValue('');

      this.zona_influe.get('min_andando4').setValue('')
      this.zona_influe.get('metros4').setValue('')
      this.zona_influe.get('min_coche4').setValue('');

      this.type.setValue(2)
      this.typeZone2.setValue(2)
      this.typeZone3.setValue('')
      this.typeZone4.setValue('')

      //new code
      this.selectedType = 2
      this.selectedTypeZone2 = 2
      //end new code

      this.cant.setValue(5)
      this.cantZone2.setValue(10)
      this.cantZone3.setValue('')
      this.cantZone4.setValue('')

    }

    //competencia
    if (this.nombre_compet == "") {
      this.nombre_compet = "aparcamiento"// "Parking"
    }
    if (this.area_busq == "") {
      this.area_busq = "300"
    }

    //estimacion rendimiento
    if (this.tamano == "" || this.tamano == 0) {
      this.tamano = 4.1
    }
    if (this.tipo_centro == "" || this.tipo_centro == 0) {
      this.tipo_centro = 300
    }

    this.runner = false;
    this.runner_ventas = false;
    this.runner_ubica = false;
    this.runner_compet = false;

    this.loadDataAll()
  }

  resetZona1Change() {
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio1_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();

  }

  resetZona2Change() {
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio2_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
  }

  resetZona3Change() {
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio3_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
  }

  resetZona4Change() {
    this.censal_model = {
      c_seccion: null,
    };
    this.censal_radio4_model = {
      Edad_media_poblacion: 0,
      Fue_de_ing_pensiones: 0,
      Fue_de_ing_prestaciones_por_desempleo: 0,
      Fue_de_ing_salario: 0,
      Fue_de_ingreso_otras_prestaciones: 0,
      Fue_de_ingreso_otros_ingresos: 0,
      Num_comercios: 0,
      Num_oficinas: 0,
      Porc_de_poblacion_mas_65: 0,
      Porc_de_poblacion_menor_18: 0,
      Porc_de_población_menor_5: 0,
      Porc_hogares_unipersonales: 0,
      Renta_media_por_persona: 0,
      Renta_media_por_hogar: 0,
      Superficie_media: 0,
      Tam_medio_hogar: 0,
      altu_media: 0,
      antiguedad: 0,
      familias: 0,
      num_fincas: 0,
      num_inmuebles: 0,
      num_segunda_vivienda: 0,
      por_poblacion_renta_menor_5000: 0,
      por_poblacion_renta_menor_7500: 0,
      por_poblacion_renta_menor_10000: 0,
      suma_num_viviendas: 0,
      total_poblacion: 0,
      totalViviendas_sin_antig_0: 0,
      total_renta_familiar: 0
    };
    this.resetEmergente();
    this.calcMetros();
  }

  onSort({ column, direction }: SortEvent) {
    console.log("test col ", column, direction)
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.loadPointInterest = this.loadPointInterest
    } else {
      this.loadPointInterest = [...this.loadPointInterest].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  toolTipMess(tipo_modelo_ind, tipo_modelo_opt) {
    console.log("Message ", tipo_modelo_ind + tipo_modelo_opt)
    this.messageText = tipo_modelo_ind + " - " + tipo_modelo_opt
  }

  saveSuccess() {
    this._ns.success('Message', '', { timeout: 2000 });
  }

  tabOne() {
    this.flagTab = false
  }
  tabTwo() {
    this.flagTab = true
  }
}
