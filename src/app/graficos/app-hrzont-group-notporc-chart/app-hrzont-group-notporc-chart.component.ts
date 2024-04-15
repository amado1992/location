import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ObjSerieInmueblesTotales } from 'src/app/data/obj-serie-inmuebles-totales';
import { ObjSerieNumberHouses } from 'src/app/data/obj-serie-number-houses';
import { ObjSerieNumberOffices } from 'src/app/data/obj-serie-number-offices';
import { ObjSerieNumberShops } from 'src/app/data/obj-serie-number-shops';
import { ObjSerieSecondHomeNumber } from 'src/app/data/obj-serie-second-home';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-hrzont-group-notporc-chart',
  templateUrl: './app-hrzont-group-notporc-chart.component.html',
  styleUrls: ['./app-hrzont-group-notporc-chart.component.css']
})
export class AppHrzontGroupNotporcChartComponent implements OnInit, OnChanges {

  serieSecondHomeNumber: ObjSerieSecondHomeNumber
  serieNumberOffices: ObjSerieNumberOffices
  serieNumberShops: ObjSerieNumberShops
  serieNumberHouses: ObjSerieNumberHouses
  serieNumberInmueblesTotales: ObjSerieInmueblesTotales

    @Input() _data: any[];
   //@Input('_data') public _data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
   title = 'Inmuebles y Viviendas en la zona';
   view: any[] = [220, 340];
   //data: any[] = [40, 11762, 991, 31620];
   // data = this._data;

   // options for the chart
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = false;
   showXAxisLabel = false;
   xAxisLabel = '';
   showYAxisLabel = false;
   yAxisLabel = '';
   timeline = true;
   roundEdges = false;
   showDataLabel = true;

   /*colorScheme = {
     domain: ['#4472C4', '#548235']
   };*/

   colorScheme = {
    domain: []
  };

   //pie
   showLabels = true;

   // data goes here

  /*public multi = [
   {
     'name': 'Número segunda vivienda',
     'series': [
       {
         'name': 'Zona',
         'value': this._data[0]//40
       },
       {
         'name': 'Municipio',
         'value': this._data[1]
       }
     ]
   },
   {
     'name': 'Número de Oficinas',
     'series': [
       {
         'name': 'Zona',
         'value': this._data[2]
       },
       {
         'name': 'Municipio',
         'value': this._data[3]
       }
     ]
   },
   {
     'name': 'Número de Comercios',
     'series': [
       {
         'name': 'Zona',
         'value': this._data[4]
       },
       {
         'name': 'Municipio',
         'value': this._data[5]
       }
     ]
   },
   {
     'name': 'Número de Viviendas',
     'series': [
       {
         'name': 'Zona',
         'value': this._data[6]
       },
       {
         'name': 'Municipio',
         'value': this._data[7]
       }
     ]
   },
   {
     'name': 'Número de Inmuebles totales',
     'series': [
       {
         'name': 'Zona',
         'value': this._data[8]
       },
       {
         'name': 'Municipio',
         'value': this._data[9]
       }
     ]
   }

  ];*/

  public multi = [
    {
      'name': 'Número segunda vivienda',
      'series': []
    },
    {
      'name': 'Número de Oficinas',
      'series': []
    },
    {
      'name': 'Número de Comercios',
      'series': []
    },
    {
      'name': 'Número de Viviendas',
      'series': []
    },
    {
      'name': 'Número de Inmuebles totales',
      'series': []
    }
 
   ];
 
   constructor(public formatDecimal: FormatoDecimalService) {
    this.serieSecondHomeNumber = new ObjSerieSecondHomeNumber()
    this.serieNumberOffices = new ObjSerieNumberOffices()
    this.serieNumberShops = new ObjSerieNumberShops()
    this.serieNumberHouses = new ObjSerieNumberHouses()
    this.serieNumberInmueblesTotales = new ObjSerieInmueblesTotales()
   }

   ngOnInit() {
   }
   ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
     // changes.prop contains the old and the new value...
     /*this.multi = [
      {
        'name': 'Número segunda vivienda',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[0]//40
          },
          {
            'name': 'Municipio',
            'value': this._data[1]
          }
        ]
      },
      {
        'name': 'Número de Oficinas',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[2]
          },
          {
            'name': 'Municipio',
            'value': this._data[3]
          }
        ]
      },
      {
        'name': 'Número de Comercios',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[4]
          },
          {
            'name': 'Municipio',
            'value': this._data[5]
          }
        ]
      },
      {
        'name': 'Número de Viviendas',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[6]
          },
          {
            'name': 'Municipio',
            'value': this._data[7]
          }
        ]
      },
      {
        'name': 'Número de Inmuebles totales',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[8]
          },
          {
            'name': 'Municipio',
            'value': this._data[9]
          }
        ]
      }

     ];*/
   }
   onSelect(event) {
     console.log(event);
   }

   pillChart(){
    for (let i = 0; i < this._data.length; i++) {
      
      this.serieSecondHomeNumber = new ObjSerieSecondHomeNumber()
      this.serieNumberOffices = new ObjSerieNumberOffices()
      this.serieNumberShops = new ObjSerieNumberShops()
      this.serieNumberHouses = new ObjSerieNumberHouses()
      this.serieNumberInmueblesTotales = new ObjSerieInmueblesTotales()
  
    //Second home number
     var color = this._data[i].color 
     var nameSecondHomeNumber = this._data[i].name   
     var valueSecondHomeNumber = this.formatDecimal.redondear( this._data[i].values.num_segunda_vivienda)
     
     this.serieSecondHomeNumber.name = nameSecondHomeNumber
     this.serieSecondHomeNumber.value = valueSecondHomeNumber
  
     this.colorScheme.domain.push(color)
     this.multi[0].series.push(this.serieSecondHomeNumber)
     //End second home number
  
     //Number offices
     var nameNumberOffices = this._data[i].name   
     var valueNumberOffices = this.formatDecimal.redondear( this._data[i].values.Num_oficinas)
     
     this.serieNumberOffices.name = nameNumberOffices
     this.serieNumberOffices.value = valueNumberOffices
     this.multi[1].series.push(this.serieNumberOffices)
     //End number offices
  
     //Number shops
    var nameNumberShops  = this._data[i].name   
    var valueNumberShops  = this.formatDecimal.redondear( this._data[i].values.Num_comercios)
    
    this.serieNumberShops .name = nameNumberShops
    this.serieNumberShops.value = valueNumberShops
    this.multi[2].series.push(this.serieNumberShops)
    //End number shops
  
    //Number houses
    var nameNumberHouses = this._data[i].name   
    var valueNumberHouses = this.formatDecimal.redondear( this._data[i].values.suma_num_viviendas)
    
    this.serieNumberHouses.name = nameNumberHouses
    this.serieNumberHouses.value = valueNumberHouses
    this.multi[3].series.push(this.serieNumberHouses)
    //End number houses
  
    //Number inmuebles totales
    var nameNumberInmueblesTotales = this._data[i].name   
    var valueNumberInmueblesTotales = this.formatDecimal.redondear( this._data[i].values.num_inmuebles)
    
    this.serieNumberInmueblesTotales.name = nameNumberInmueblesTotales
    this.serieNumberInmueblesTotales.value = valueNumberInmueblesTotales
    this.multi[4].series.push(this.serieNumberInmueblesTotales)
    //End number inmuebles totales
    }
  
    
   }
  

}
