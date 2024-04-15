import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatoDecimalService {
  private separador = '.'; // separador para los miles
  private sepDecimal = ','; // separador para los decimales

  constructor() { }
  formatear (numero: number) {
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 3);
    return splitLeft + splitRight ;
  }
  // formatear son coma


  formatearInt (numero: number) {
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 2);
  //  console.log('fORMATEANDO ',splitLeft + splitRight);
    var resultado = splitLeft + splitRight;
    resultado = resultado.replace(',','.');
    return parseInt(resultado);
  }



  formatearNum (numero: number) {
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 2);
  //  console.log('fORMATEANDO ',splitLeft + splitRight);
    var resultado = splitLeft + splitRight;
    resultado = resultado.replace(',','.');
    return parseFloat(resultado ).toFixed(2);
    // resultado = temp.toString();
    // resultado = resultado.replace('.',',');
    // return resultado;
  }

  formatearPorc (numero: number) {
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 3);
    return splitLeft + splitRight + '%';
  }

  formatearPorcExcl (numero: any) {
    numero = this.financial(numero)
    
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];

    /*var sideRight = ""
    if (splitStr.length == 1) {
      sideRight = this.sepDecimal + "00"
    }

    if (splitStr.length > 1 && splitStr[1].length == 1) {
      sideRight = this.sepDecimal + splitStr[1] + "0"
    }

    if (splitStr.length > 1 && splitStr[1].length > 1) {
      sideRight = this.sepDecimal + splitStr[1]
    }
    
    var splitRight = sideRight;*/

    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 3);
    //return splitLeft + splitRight + "%";
    return splitLeft + splitRight;
  }

  formatearPorcChar (numero: number) {
    var num = numero.toString();
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    splitRight = splitRight.substring(0, 3);
    return splitLeft + splitRight + '%';
  }
  redondear(value: number) {
    return Math.round(value);
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
}
