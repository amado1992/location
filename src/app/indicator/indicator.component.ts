import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormatoDecimalService } from '../services/formato-decimal.service';
@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnChanges, OnInit {
  @Input() data: any;
  @Input() typeModel: any;
  @Input() indicator: any;

  _value: any = ""

  constructor(public formatDecimal: FormatoDecimalService) { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    //enero
    if (this.typeModel.value == "enero" && this.indicator.value == "ticketMedio") {
      this._value = this.data['enero']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['enero']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "enero" && this.indicator.value == "ventaTotal") {

      this._value = this.data['enero']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['enero']['venta_total']) : ''
    }

    if (this.typeModel.value == "enero" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['enero']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['enero']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['enero']['numero_operaciones']) : ''
    }

    //febrero
    if (this.typeModel.value == "febrero" && this.indicator.value == "ticketMedio") {
      this._value = this.data['febrero']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['febrero']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "febrero" && this.indicator.value == "ventaTotal") {

      this._value = this.data['febrero']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['febrero']['venta_total']) : ''
    }

    if (this.typeModel.value == "febrero" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['febrero']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['febrero']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['febrero']['numero_operaciones']) : ''
    }

    //marzo
    if (this.typeModel.value == "marzo" && this.indicator.value == "ticketMedio") {
      this._value = this.data['marzo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['marzo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "marzo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['marzo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['marzo']['venta_total']) : ''
    }

    if (this.typeModel.value == "marzo" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['marzo']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['marzo']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['marzo']['numero_operaciones']) : ''*/

      if (this.data['marzo']['numero_operaciones'] != null) {
        this._value = this.formatDecimal.formatearPorcExcl(this.data['marzo']['numero_operaciones'])
      } else {
        this._value = ""
      }
    }

    //abril
    if (this.typeModel.value == "abril" && this.indicator.value == "ticketMedio") {
      this._value = this.data['abril']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['abril']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "abril" && this.indicator.value == "ventaTotal") {

      this._value = this.data['abril']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['abril']['venta_total']) : ''
    }

    if (this.typeModel.value == "abril" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['abril']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['abril']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['abril']['numero_operaciones']) : ''*/

        if (this.data['abril']['numero_operaciones'] != null){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['abril']['numero_operaciones'])
        }else{
          this._value = ""
        }
    }

    //mayo
    if (this.typeModel.value == "mayo" && this.indicator.value == "ticketMedio") {
      this._value = this.data['mayo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['mayo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "mayo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['mayo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['mayo']['venta_total']) : ''
    }

    if (this.typeModel.value == "mayo" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['mayo']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['mayo']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['mayo']['numero_operaciones']) : ''*/

      if (this.data['mayo']['numero_operaciones'] != null) {
        this._value = this.formatDecimal.formatearPorcExcl(this.data['mayo']['numero_operaciones'])
      } else {
        this._value = ""
      }
    }

    //junio
    if (this.typeModel.value == "junio" && this.indicator.value == "ticketMedio") {
      this._value = this.data['junio']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['junio']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "junio" && this.indicator.value == "ventaTotal") {

      this._value = this.data['junio']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['junio']['venta_total']) : ''
    }

    if (this.typeModel.value == "junio" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['junio']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['junio']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['junio']['numero_operaciones']) : ''*/

      if (this.data['junio']['numero_operaciones'] != null) {
        this._value = this.formatDecimal.formatearPorcExcl(this.data['junio']['numero_operaciones'])
      } else {
        this._value = ""
      }
    }

    //julio
    if (this.typeModel.value == "julio" && this.indicator.value == "ticketMedio") {
      this._value = this.data['julio']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['julio']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "julio" && this.indicator.value == "ventaTotal") {

      this._value = this.data['julio']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['julio']['venta_total']) : ''
    }

    if (this.typeModel.value == "julio" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['julio']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['julio']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['julio']['numero_operaciones']) : ''

      if (this.data['julio']['numero_operaciones']) {
        this._value = this.formatDecimal.formatearPorcExcl(this.data['julio']['numero_operaciones'])
      } else {
        this._value = ""
      }
    }

    //agosto
    if (this.typeModel.value == "agosto" && this.indicator.value == "ticketMedio") {
      this._value = this.data['agosto']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['agosto']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "ventaTotal") {

      this._value = this.data['agosto']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['agosto']['venta_total']) : ''
    }

    if (this.typeModel.value == "agosto" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['agosto']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['agosto']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['agosto']['numero_operaciones']) : ''*/

      if (this.data['agosto']['numero_operaciones'] != null) {
        this._value = this.formatDecimal.formatearPorcExcl(this.data['agosto']['numero_operaciones'])
      } else {
        this._value = ""
      }
    }

    //septiembre
    if (this.typeModel.value == "septiembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['septiembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['septiembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "septiembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['septiembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['septiembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "septiembre" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['septiembre']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['septiembre']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['septiembre']['numero_operaciones']) : ''*/

        if (this.data['septiembre']['numero_operaciones'] != null){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['septiembre']['numero_operaciones'])
        }else{
          this._value = ""
        }
    }

    //octubre
    if (this.typeModel.value == "octubre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['octubre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['octubre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "octubre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['octubre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['octubre']['venta_total']) : ''
    }

    if (this.typeModel.value == "octubre" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['octubre']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['octubre']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['octubre']['numero_operaciones']) : ''*/

        if (this.data['octubre']['numero_operaciones'] != null){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['octubre']['numero_operaciones'])
        }else {
          this._value = ""
        }
    }

    //noviembre
    if (this.typeModel.value == "noviembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['noviembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['noviembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "noviembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['noviembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['noviembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "noviembre" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['noviembre']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['noviembre']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['noviembre']['numero_operaciones']) : ''*/

        if (this.data['noviembre']['numero_operaciones'] != null){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['noviembre']['numero_operaciones'])
        }else{
          this._value = ""
        }
    }

    //diciembre
    if (this.typeModel.value == "diciembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['diciembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['diciembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "diciembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['diciembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['diciembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "diciembre" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['diciembre']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['diciembre']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['diciembre']['numero_operaciones']) : ''*/

        if (this.data['diciembre']['numero_operaciones'] != null){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['diciembre']['numero_operaciones'])
        }else{
          this._value = ""
        }
    }

    // 12 meses
    if (this.typeModel.value == "12 meses" && this.indicator.value == "ticketMedio") {
      this._value = this.data['12 meses']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['12 meses']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "12 meses" && this.indicator.value == "ventaTotal") {

      this._value = this.data['12 meses']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['12 meses']['venta_total']) : ''
    }

    if (this.typeModel.value == "12 meses" && this.indicator.value == "numeroOperaciones") {
      /*this._value = this.data['12 meses']['numero_operaciones'] != null ?
        //this.formatDecimal.formatear(this.data['12 meses']['numero_operaciones']) : ''
        this.formatDecimal.formatearPorcExcl(this.data['12 meses']['numero_operaciones']) : ''*/

        if (this.data['12 meses']['numero_operaciones']){
          this._value = this.formatDecimal.formatearPorcExcl(this.data['12 meses']['numero_operaciones'])
        }else {
          this._value = ""
        }
    }

    /* //sabado
     if (this.typeModel.value == "sabado" && this.indicator.value == "ticketMedio") {

      this._value = this.data['sabado']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "ventaTotal") {

      this._value = this.data['sabado']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['venta_total']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcFrescos") {

      this._value = this.data['sabado']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcCongelados") {

      this._value = this.data['sabado']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcHogar") {

      this._value = this.data['sabado']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['sabado']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['poc_cuidado_personal']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "numeroOperaciones") {

      this._value = this.data['sabado']['numero_operaciones'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['numero_operaciones']) : ''
    }

    //domingo festivo
    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "ticketMedio") {

      this._value = this.data['domingo_festivo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['domingo_festivo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['venta_total']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcFrescos") {

      this._value = this.data['domingo_festivo']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcCongelados") {

      this._value = this.data['domingo_festivo']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcHogar") {

      this._value = this.data['domingo_festivo']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['domingo_festivo']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['poc_cuidado_personal']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "numeroOperaciones") {

      this._value = this.data['domingo_festivo']['numero_operaciones'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['numero_operaciones']) : ''
    }

    //navidad
    if (this.typeModel.value == "navidad" && this.indicator.value == "ticketMedio") {

      this._value = this.data['navidad']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "ventaTotal") {

      this._value = this.data['navidad']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['venta_total']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcFrescos") {

      this._value = this.data['navidad']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcCongelados") {

      this._value = this.data['navidad']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcHogar") {

      this._value = this.data['navidad']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['navidad']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['poc_cuidado_personal']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "numeroOperaciones") {

      this._value = this.data['navidad']['numero_operaciones'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['numero_operaciones']) : ''
    }

     //verano
     if (this.typeModel.value == "verano" && this.indicator.value == "ticketMedio") {

      this._value = this.data['verano']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['verano']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "ventaTotal") {

      this._value = this.data['verano']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['verano']['venta_total']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcFrescos") {

      this._value = this.data['verano']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcCongelados") {

      this._value = this.data['verano']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcHogar") {

      this._value = this.data['verano']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['verano']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['verano']['poc_cuidado_personal']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "numeroOperaciones") {

      this._value = this.data['verano']['numero_operaciones'] != null ?
        this.formatDecimal.formatear(this.data['verano']['numero_operaciones']) : ''
    }*/

  }
  ngOnInit() {

    /*if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "ticketMedio") {

      this._value = this.data['diario_laboral']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "ventaTotal") {

      this._value = this.data['diario_laboral']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['venta_total']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "porcFrescos") {

      this._value = this.data['diario_laboral']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "porcCongelados") {

      this._value = this.data['diario_laboral']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "porcHogar") {

      this._value = this.data['diario_laboral']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['diario_laboral']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['diario_laboral']['poc_cuidado_personal']) : ''
    }

     //sabado
     if (this.typeModel.value == "sabado" && this.indicator.value == "ticketMedio") {

      this._value = this.data['sabado']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "ventaTotal") {

      this._value = this.data['sabado']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['venta_total']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcFrescos") {

      this._value = this.data['sabado']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcCongelados") {

      this._value = this.data['sabado']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcHogar") {

      this._value = this.data['sabado']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "sabado" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['sabado']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['sabado']['poc_cuidado_personal']) : ''
    }

    //domingo festivo
    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "ticketMedio") {

      this._value = this.data['domingo_festivo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['domingo_festivo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['venta_total']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcFrescos") {

      this._value = this.data['domingo_festivo']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcCongelados") {

      this._value = this.data['domingo_festivo']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcHogar") {

      this._value = this.data['domingo_festivo']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "domingoFestivo" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['domingo_festivo']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['domingo_festivo']['poc_cuidado_personal']) : ''
    }

    //navidad
    if (this.typeModel.value == "navidad" && this.indicator.value == "ticketMedio") {

      this._value = this.data['navidad']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "ventaTotal") {

      this._value = this.data['navidad']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['venta_total']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcFrescos") {

      this._value = this.data['navidad']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcCongelados") {

      this._value = this.data['navidad']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcHogar") {

      this._value = this.data['navidad']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "navidad" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['navidad']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['navidad']['poc_cuidado_personal']) : ''
    }

     //verano
     if (this.typeModel.value == "verano" && this.indicator.value == "ticketMedio") {

      this._value = this.data['verano']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['verano']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "ventaTotal") {

      this._value = this.data['verano']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['verano']['venta_total']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcFrescos") {

      this._value = this.data['verano']['porc_frescos'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_frescos']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcCongelados") {

      this._value = this.data['verano']['porc_congelados'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_congelados']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcHogar") {

      this._value = this.data['verano']['porc_hogar'] != null ?
        this.formatDecimal.formatear(this.data['verano']['porc_hogar']) : ''
    }

    if (this.typeModel.value == "verano" && this.indicator.value == "porcCuidadoPersonal") {

      this._value = this.data['verano']['poc_cuidado_personal'] != null ?
        this.formatDecimal.formatear(this.data['verano']['poc_cuidado_personal']) : ''
    }

    
  }*/

    if (this.typeModel.value == "enero" && this.indicator.value == "ticketMedio") {
      this._value = this.data['enero']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['enero']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "enero" && this.indicator.value == "ventaTotal") {

      this._value = this.data['enero']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['enero']['venta_total']) : ''
    }

    if (this.typeModel.value == "enero" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['enero']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['enero']['numero_operaciones']) : ''
    }

    //febrero
    if (this.typeModel.value == "febrero" && this.indicator.value == "ticketMedio") {
      this._value = this.data['febrero']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['febrero']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "febrero" && this.indicator.value == "ventaTotal") {

      this._value = this.data['febrero']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['febrero']['venta_total']) : ''
    }

    if (this.typeModel.value == "diariofebreroLaboral" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['febrero']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['febrero']['numero_operaciones']) : ''
    }

    //marzo
    if (this.typeModel.value == "marzo" && this.indicator.value == "ticketMedio") {
      this._value = this.data['marzo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['marzo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "marzo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['marzo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['marzo']['venta_total']) : ''
    }

    if (this.typeModel.value == "marzo" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['marzo']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['marzo']['numero_operaciones']) : ''
    }

    //abril
    if (this.typeModel.value == "abril" && this.indicator.value == "ticketMedio") {
      this._value = this.data['abril']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['abril']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "abril" && this.indicator.value == "ventaTotal") {

      this._value = this.data['abril']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['abril']['venta_total']) : ''
    }

    if (this.typeModel.value == "abril" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['abril']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['abril']['numero_operaciones']) : ''
    }

    //mayo
    if (this.typeModel.value == "mayo" && this.indicator.value == "ticketMedio") {
      this._value = this.data['mayo']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['mayo']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "mayo" && this.indicator.value == "ventaTotal") {

      this._value = this.data['mayo']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['mayo']['venta_total']) : ''
    }

    if (this.typeModel.value == "mayo" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['mayo']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['mayo']['numero_operaciones']) : ''
    }

    //junio
    if (this.typeModel.value == "junio" && this.indicator.value == "ticketMedio") {
      this._value = this.data['junio']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['junio']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "junio" && this.indicator.value == "ventaTotal") {

      this._value = this.data['junio']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['junio']['venta_total']) : ''
    }

    if (this.typeModel.value == "junio" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['junio']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['junio']['numero_operaciones']) : ''
    }

    //julio
    if (this.typeModel.value == "julio" && this.indicator.value == "ticketMedio") {
      this._value = this.data['julio']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['julio']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "julio" && this.indicator.value == "ventaTotal") {

      this._value = this.data['julio']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['julio']['venta_total']) : ''
    }

    if (this.typeModel.value == "julio" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['julio']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['julio']['numero_operaciones']) : ''
    }

    //agosto
    if (this.typeModel.value == "agosto" && this.indicator.value == "ticketMedio") {
      this._value = this.data['agosto']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['agosto']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "diarioLaboral" && this.indicator.value == "ventaTotal") {

      this._value = this.data['agosto']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['agosto']['venta_total']) : ''
    }

    if (this.typeModel.value == "agosto" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['agosto']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['agosto']['numero_operaciones']) : ''
    }

    //septiembre
    if (this.typeModel.value == "septiembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['septiembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['septiembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "septiembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['septiembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['septiembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "septiembre" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['septiembre']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['septiembre']['numero_operaciones']) : ''
    }

    //octubre
    if (this.typeModel.value == "octubre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['octubre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['octubre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "octubre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['octubre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['octubre']['venta_total']) : ''
    }

    if (this.typeModel.value == "octubre" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['octubre']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['octubre']['numero_operaciones']) : ''
    }

    //noviembre
    if (this.typeModel.value == "noviembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['noviembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['noviembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "noviembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['noviembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['noviembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "noviembre" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['noviembre']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['noviembre']['numero_operaciones']) : ''
    }

    //diciembre
    if (this.typeModel.value == "diciembre" && this.indicator.value == "ticketMedio") {
      this._value = this.data['diciembre']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['diciembre']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "diciembre" && this.indicator.value == "ventaTotal") {

      this._value = this.data['diciembre']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['diciembre']['venta_total']) : ''
    }

    if (this.typeModel.value == "diciembre" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['diciembre']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['diciembre']['numero_operaciones']) : ''
    }

    // 12 meses
    if (this.typeModel.value == "12 meses" && this.indicator.value == "ticketMedio") {
      this._value = this.data['12 meses']['ticket_medio'] != null ?
        this.formatDecimal.formatear(this.data['12 meses']['ticket_medio']) : ''
    }

    if (this.typeModel.value == "12 meses" && this.indicator.value == "ventaTotal") {

      this._value = this.data['12 meses']['venta_total'] != null ?
        this.formatDecimal.formatear(this.data['12 meses']['venta_total']) : ''
    }

    if (this.typeModel.value == "12 meses" && this.indicator.value == "numeroOperaciones") {
      this._value = this.data['12 meses']['numero_operaciones'] != null ?
        this.formatDecimal.formatearPorcExcl(this.data['12 meses']['numero_operaciones']) : ''
    }

  }
}
