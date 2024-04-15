import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormatoDecimalService } from '../services/formato-decimal.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnChanges, OnInit {
  @Input() zone1: any;
  @Input() zone2: any;
  @Input() zone3: any;
  @Input() zone4: any;
  @Input() municipio: any;

  @Input() censal_radio1_model
  @Input() censal_radio2_model
  @Input() censal_radio3_model
  @Input() censal_radio4_model

  @Input() statistics: any;
  @Input() zoneInfluence: any;

  _value: any = ""

  constructor(public formatDecimal: FormatoDecimalService) { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    //zone1
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "poblacion") {
      this._value = this.zone1[0]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "familia") {
      this._value = this.zone1[1]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "rentaMedia") {
      this._value = this.zone1[2]
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "rentaFamiliar") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.total_renta_familiar)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "menores18") {
      this._value = this.zone1[3]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "mayores65") {
      this._value = this.zone1[4]
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone1[5]
    }

    //new
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "edadMediaPoblacion") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Edad_media_poblacion)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "fueIngPensiones") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Fue_de_ing_pensiones)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "sumaNumViviendas") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.suma_num_viviendas)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "fueIngSalario") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Fue_de_ing_salario)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "fueIngresoOtrasPrestaciones") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Fue_de_ingreso_otras_prestaciones)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "fueIngresoOtrosIngresos") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Fue_de_ingreso_otros_ingresos)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "numComercios") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Num_comercios)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "numOficinas") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Num_oficinas)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porcPoblaciónMenor5") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio1_model.Porc_de_población_menor_5)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porcHogaresUnipersonales") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio1_model.Porc_hogares_unipersonales)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "rentaMediaHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Renta_media_por_hogar)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "superficieMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Superficie_media)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "tamMedioHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.Tam_medio_hogar)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "altuMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.altu_media)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "antiguedad") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.antiguedad)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "numFincas") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.num_fincas)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "numInmuebles") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.num_inmuebles)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "numSegundaVivienda") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.num_segunda_vivienda)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porPoblacionRentaMenor10000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio1_model.por_poblacion_renta_menor_10000)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porPoblacionRentaMenor5000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio1_model.por_poblacion_renta_menor_5000)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porPoblacionRentaMenor7500") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio1_model.por_poblacion_renta_menor_7500)
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "totalViviendasSinAntig0") {
      this._value = this.formatDecimal.formatear(this.censal_radio1_model.totalViviendas_sin_antig_0)
    }
    //end new

    //zone2
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "poblacion") {
      this._value = this.zone2[0]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "familia") {
      this._value = this.zone2[1]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "rentaMedia") {
      this._value = this.zone2[2]
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "menores18") {
      this._value = this.zone2[3]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "mayores65") {
      this._value = this.zone2[4]
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone2[5]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "rentaFamiliar") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.total_renta_familiar)
    }

    //new
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "edadMediaPoblacion") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Edad_media_poblacion)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "fueIngPensiones") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Fue_de_ing_pensiones)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "sumaNumViviendas") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.suma_num_viviendas)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "fueIngSalario") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Fue_de_ing_salario)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "fueIngresoOtrasPrestaciones") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Fue_de_ingreso_otras_prestaciones)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "fueIngresoOtrosIngresos") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Fue_de_ingreso_otros_ingresos)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "numComercios") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Num_comercios)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "numOficinas") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Num_oficinas)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porcPoblaciónMenor5") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio2_model.Porc_de_población_menor_5)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porcHogaresUnipersonales") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio2_model.Porc_hogares_unipersonales)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "rentaMediaHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Renta_media_por_hogar)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "superficieMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Superficie_media)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "tamMedioHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.Tam_medio_hogar)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "altuMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.altu_media)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "antiguedad") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.antiguedad)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "numFincas") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.num_fincas)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "numInmuebles") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.num_inmuebles)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "numSegundaVivienda") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.num_segunda_vivienda)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porPoblacionRentaMenor10000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio2_model.por_poblacion_renta_menor_10000)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porPoblacionRentaMenor5000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio2_model.por_poblacion_renta_menor_5000)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porPoblacionRentaMenor7500") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio2_model.por_poblacion_renta_menor_7500)
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "totalViviendasSinAntig0") {
      this._value = this.formatDecimal.formatear(this.censal_radio2_model.totalViviendas_sin_antig_0)
    }
    //end new

    //zone3
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "poblacion") {
      this._value = this.zone3[0]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "familia") {
      this._value = this.zone3[1]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "rentaMedia") {
      this._value = this.zone3[2]
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "menores18") {
      this._value = this.zone3[3]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "mayores65") {
      this._value = this.zone3[4]
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone3[5]
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "rentaFamiliar") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.total_renta_familiar)
    }

    //new
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "edadMediaPoblacion") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Edad_media_poblacion)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "fueIngPensiones") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Fue_de_ing_pensiones)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "sumaNumViviendas") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.suma_num_viviendas)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "fueIngSalario") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Fue_de_ing_salario)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "fueIngresoOtrasPrestaciones") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Fue_de_ingreso_otras_prestaciones)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "fueIngresoOtrosIngresos") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Fue_de_ingreso_otros_ingresos)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "numComercios") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Num_comercios)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "numOficinas") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Num_oficinas)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porcPoblaciónMenor5") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio3_model.Porc_de_población_menor_5)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porcHogaresUnipersonales") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio3_model.Porc_hogares_unipersonales)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "rentaMediaHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Renta_media_por_hogar)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "superficieMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Superficie_media)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "tamMedioHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.Tam_medio_hogar)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "altuMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.altu_media)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "antiguedad") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.antiguedad)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "numFincas") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.num_fincas)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "numInmuebles") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.num_inmuebles)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "numSegundaVivienda") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.num_segunda_vivienda)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porPoblacionRentaMenor10000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio3_model.por_poblacion_renta_menor_10000)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porPoblacionRentaMenor5000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio3_model.por_poblacion_renta_menor_5000)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porPoblacionRentaMenor7500") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio3_model.por_poblacion_renta_menor_7500)
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "totalViviendasSinAntig0") {
      this._value = this.formatDecimal.formatear(this.censal_radio3_model.totalViviendas_sin_antig_0)
    }
    //end new

    //zone4
    
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "poblacion") {
      this._value = this.zone4[0]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "familia") {
      this._value = this.zone4[1]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "rentaMedia") {
      this._value = this.zone4[2]
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "menores18") {
      this._value = this.zone4[3]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "mayores65") {
      this._value = this.zone4[4]
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone4[5]
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "rentaFamiliar") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.total_renta_familiar)
    }
    //new
    
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "edadMediaPoblacion") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Edad_media_poblacion)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "fueIngPensiones") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Fue_de_ing_pensiones)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "sumaNumViviendas") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.suma_num_viviendas)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "fueIngSalario") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Fue_de_ing_salario)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "fueIngresoOtrasPrestaciones") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Fue_de_ingreso_otras_prestaciones)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "fueIngresoOtrosIngresos") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Fue_de_ingreso_otros_ingresos)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "numComercios") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Num_comercios)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "numOficinas") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Num_oficinas)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porcPoblaciónMenor5") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio4_model.Porc_de_población_menor_5)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porcHogaresUnipersonales") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio4_model.Porc_hogares_unipersonales)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "rentaMediaHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Renta_media_por_hogar)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "superficieMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Superficie_media)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "tamMedioHogar") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.Tam_medio_hogar)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "altuMedia") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.altu_media)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "antiguedad") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.antiguedad)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "numFincas") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.num_fincas)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "numInmuebles") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.num_inmuebles)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "numSegundaVivienda") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.num_segunda_vivienda)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porPoblacionRentaMenor10000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio4_model.por_poblacion_renta_menor_10000)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porPoblacionRentaMenor5000") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio4_model.por_poblacion_renta_menor_5000)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porPoblacionRentaMenor7500") {
      this._value = this.formatDecimal.formatearPorc(this.censal_radio4_model.por_poblacion_renta_menor_7500)
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "totalViviendasSinAntig0") {
      this._value = this.formatDecimal.formatear(this.censal_radio4_model.totalViviendas_sin_antig_0)
    }
    //end new
    //municipio
    console.log("Municipio change... ", this.municipio)
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "poblacion") {
      this._value = this.municipio.poblacion
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "familia") {
      this._value = this.municipio.familias
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "rentaMedia") {
      this._value = this.municipio.renta_media_por_hogar
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "menores18") {
      this._value = this.municipio.porc_de_poblacion_menor_18
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "mayores65") {
      this._value = this.municipio.porc_de_poblacion_mas_65
    }

    //new
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "edadMediaPoblacion") {
      this._value = this.formatDecimal.formatear(this.municipio.edad_media_poblacion)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "fueIngPensiones") {
      this._value = this.formatDecimal.formatear(this.municipio.fu_de_ing_pensiones)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "sumaNumViviendas") {
      this._value = this.formatDecimal.formatear(this.municipio.suma_num_viviendas)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "fueIngSalario") {
      this._value = this.formatDecimal.formatear(this.municipio.fu_de_ing_salario)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "fueIngresoOtrasPrestaciones") {
      this._value = this.formatDecimal.formatear(this.municipio.fue_de_ingreso_otras_prestaciones)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "fueIngresoOtrosIngresos") {
      this._value = this.formatDecimal.formatear(this.municipio.fue_de_ingreso_otros_ingresos)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "numComercios") {
      this._value = this.formatDecimal.formatear(this.municipio.Num_comercios)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "numOficinas") {
      this._value = this.formatDecimal.formatear(this.municipio.Num_oficinas)
    }

    /*if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porcPoblaciónMenor5") {
      this._value = this.formatDecimal.formatearPorc(this.municipio.porc_de_población_menor_5)
    }*/

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porcHogaresUnipersonales") {
      this._value = this.formatDecimal.formatearPorc(this.municipio.porc_hogares_unipersonales)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "rentaMediaHogar") {
      this._value = this.formatDecimal.formatear(this.municipio.renta_media_por_hogar)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "superficieMedia") {
      this._value = this.formatDecimal.formatear(this.municipio.Superficie_media)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "tamMedioHogar") {
      this._value = this.formatDecimal.formatear(this.municipio.Tam_medio_hogar)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "altuMedia") {
      this._value = this.formatDecimal.formatear(this.municipio.altu_media)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "antiguedad") {
      this._value = this.formatDecimal.formatear(this.municipio.antiguedad)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "numFincas") {
      this._value = this.formatDecimal.formatear(this.municipio.num_fincas)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "numInmuebles") {
      this._value = this.formatDecimal.formatear(this.municipio.num_inmuebles)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "numSegundaVivienda") {
      this._value = this.formatDecimal.formatear(this.municipio.num_segunda_vivienda)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porPoblacionRentaMenor10000") {
      this._value = this.formatDecimal.formatearPorc(this.municipio.por_poblacion_renta_menor_10000)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porPoblacionRentaMenor5000") {
      this._value = this.formatDecimal.formatearPorc(this.municipio.por_poblacion_renta_menor_5000)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porPoblacionRentaMenor7500") {
      this._value = this.formatDecimal.formatearPorc(this.municipio.por_poblacion_renta_menor_7500)
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "totalViviendasSinAntig0") {
      this._value = this.formatDecimal.formatear(this.municipio.totalViviendas_sin_antig_0)
    }
    //end new

    /*Num_comercios: 0,
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
    suma_num_viviendas: 0,*/

    /*if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.municipio.
    }*/
  }
  ngOnInit() {
    //zone1
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "poblacion") {
      this._value = this.zone1[0]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "familia") {
      this._value = this.zone1[1]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "rentaMedia") {
      this._value = this.zone1[2]
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "menores18") {
      this._value = this.zone1[3]
    }
    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "mayores65") {
      this._value = this.zone1[4]
    }

    if (this.zoneInfluence.value == "zone1" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone1[5]
    }

    //zone2
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "poblacion") {
      this._value = this.zone2[0]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "familia") {
      this._value = this.zone2[1]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "rentaMedia") {
      this._value = this.zone2[2]
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "menores18") {
      this._value = this.zone2[3]
    }
    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "mayores65") {
      this._value = this.zone2[4]
    }

    if (this.zoneInfluence.value == "zone2" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone2[5]
    }

    //zone3
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "poblacion") {
      this._value = this.zone3[0]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "familia") {
      this._value = this.zone3[1]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "rentaMedia") {
      this._value = this.zone3[2]
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "menores18") {
      this._value = this.zone3[3]
    }
    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "mayores65") {
      this._value = this.zone3[4]
    }

    if (this.zoneInfluence.value == "zone3" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone3[5]
    }

    //zone4
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "poblacion") {
      this._value = this.zone4[0]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "familia") {
      this._value = this.zone4[1]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "rentaMedia") {
      this._value = this.zone4[2]
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "menores18") {
      this._value = this.zone4[3]
    }
    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "mayores65") {
      this._value = this.zone4[4]
    }

    if (this.zoneInfluence.value == "zone4" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.zone4[5]
    }

    //municipio
    console.log("Municipio... ", this.municipio)
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "poblacion") {
      this._value = this.municipio.poblacion
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "familia") {
      this._value = this.municipio.familias
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "rentaMedia") {
      this._value = this.municipio.renta_media_por_hogar
    }

    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "menores18") {
      this._value = this.municipio.porc_de_poblacion_menor_18
    }
    if (this.zoneInfluence.value == "municipio" && this.statistics.value == "mayores65") {
      this._value = this.municipio.porc_de_poblacion_mas_65
    }

    /*if (this.zoneInfluence.value == "municipio" && this.statistics.value == "porcientoDesempleo") {
      this._value = this.municipio.
    }*/


  }

}
