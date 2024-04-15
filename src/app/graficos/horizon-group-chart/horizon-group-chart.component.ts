import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjSerie } from 'src/app/data/obj-serie';
import { ObjSeriePopulation } from 'src/app/data/obj-serie-population';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-horizon-group-chart',
  templateUrl: './horizon-group-chart.component.html',
  styleUrls: ['./horizon-group-chart.component.css']
})
export class HorizonGroupChartComponent implements OnChanges, OnInit {

  /*serie = {
    name: "",
    value: 0
  }*/

  serie: ObjSerie
  seriePopulation: ObjSeriePopulation

  //@Input() _colors = [] //= ['#fca404', ' #fc0404', '#046404', ' #d7dfe1']

    @Input() _data: any[];
 //@Input('_data') public _data = [0, 0, 0, 0];
 //@Input('_data') public _data = [10, 20, 30, 40, 50, 60, 70, 80];
 //@Input('_data') public _data = [0, 0, 0, 0, 0, 0, 0, 0];
 title = 'POBLACIÓN Y FAMILIAS';
 view: any[] = [380, 150];
 //data: any[] = [40, 11762, 991, 31620];
 //data = this._data;

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

 //Before
 /*colorScheme = {
   domain: ['#4472C4', '#548235',]
 };*/

 //Now
 colorScheme = {
  domain: []
  //domain: ['#fca404', ' #fc0404', '#046404', ' #d7dfe1']
  //domain: ["rgb(255, 165, 0)", ' #fc0404', '#046404', '#d7dfe1']
  //domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
};

 //pie
 showLabels = true;

 // data goes here

 //Antes
/*public multi = [
 {
   "name": "FAMILIAS",
   "series": [
     {
       "name": "Zona",
       "value": this._data[0]
     },
     {
       "name": "Municipio",
       "value": this._data[1]
     }
   ]
 },

 {
   "name": "POBLACIÓN",
   "series": [
     {
       "name": "Zona",
       "value": this._data[2]
     },
     {
       "name": "Municipio",
       "value": this._data[3]
     }
   ]
 }

];*/

//Ahora
/*public multi = [
  {
    "name": "FAMILIAS",
    "series": [
      {
        "name": "Zona 1",
        "value": this._data[0]
      },
      {
        "name": "Zona 2",
        "value": this._data[1]
      },
      {
        "name": "Zona 3",
        "value": this._data[2]
      },
      {
        "name": "Zona 4",
        "value": this._data[3]
      }
    ]
  },
 
  {
    "name": "POBLACIÓN",
    "series": [
      {
        "name": "Zona 1",
        "value": this._data[4]
      },
      {
        "name": "Zona 2",
        "value": this._data[5]
      },
      {
        "name": "Zona 3",
        "value": this._data[6]
      },
      {
        "name": "Zona 4",
        "value": this._data[7]
      }
    ]
  }
 
 ];*/

 public multi = [
  {
    "name": "FAMILIAS",
    "series": []
  },
 
  {
    "name": "POBLACIÓN",
    "series": []
  }
 
 ];

 constructor(public formatDecimal: FormatoDecimalService) {
  this.serie = new ObjSerie()
  this.seriePopulation = new ObjSeriePopulation()
  }
 ngOnChanges(changes: SimpleChanges) {
  this.pillChart()
  // changes.prop contains the old and the new value...
  //this. view = [400, 100];
  /*this.multi = [
    {
      "name": "FAMILIAS",
      "series": [
        {
          "name": "Zona",
          "value": this._data[0] //40
        },
        {
          "name": "Municipio",
          "value": this._data[1]
        }
      ]
    },

    {
      "name": "POBLACION",
      "series": [
        {
          "name": "Zona",
          "value": this._data[2]
        },
        {
          "name": "Municipio",
          "value": this._data[3]
        }
      ]
    }
  ];*/

  /*this.colorScheme = {
   //domain: ['#fca404', ' #fc0404', '#046404', ' #d7dfe1']
   //domain: ["rgb(255, 165, 0)", ' #fc0404', '#046404', '#d7dfe1']
   domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
 };

   this.multi = [
   {
     "name": "FAMILIAS",
     "series": [
       {
         "name": "Zona 1",
         "value": this._data[0]
       },
       {
         "name": "Zona 2",
         "value": this._data[1]
       },
       {
         "name": "Zona 3",
         "value": this._data[2]
       },
       {
         "name": "Zona 4",
         "value": this._data[3]
       }
     ]
   },
  
   {
     "name": "POBLACIÓN",
     "series": [
       {
         "name": "Zona 1",
         "value": this._data[4]
       },
       {
         "name": "Zona 2",
         "value": this._data[5]
       },
       {
         "name": "Zona 3",
         "value": this._data[6]
       },
       {
         "name": "Zona 4",
         "value": this._data[7]
       }
     ]
   }
  
  ];*/
}
 ngOnInit() {
  //this.pillChart()
  /*this.colorScheme = {
    //domain: ['#fca404', ' #fc0404', '#046404', ' #d7dfe1']
    //domain: ["rgb(255, 165, 0)", ' #fc0404', '#046404', '#d7dfe1']
    domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
  };

  this.multi = [
    {
      "name": "FAMILIAS",
      "series": [
        {
          "name": "Zona 1",
          "value": this._data[0]
        },
        {
          "name": "Zona 2",
          "value": this._data[1]
        },
        {
          "name": "Zona 3",
          "value": this._data[2]
        },
        {
          "name": "Zona 4",
          "value": this._data[3]
        }
      ]
    },
   
    {
      "name": "POBLACIÓN",
      "series": [
        {
          "name": "Zona 1",
          "value": this._data[4]
        },
        {
          "name": "Zona 2",
          "value": this._data[5]
        },
        {
          "name": "Zona 3",
          "value": this._data[6]
        },
        {
          "name": "Zona 4",
          "value": this._data[7]
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
    //FAMILIAS
    this.serie = new ObjSerie()
    this.seriePopulation = new ObjSeriePopulation()

   var color = this._data[i].color 
   var name = this._data[i].name   
   var value = this._data[i].values.Tam_medio_hogar === 0 ? 0: this.formatDecimal.redondear(this._data[i].values.total_poblacion / this._data[i].values.Tam_medio_hogar)
   
   this.serie.name = name
   this.serie.value = value

   this.colorScheme.domain.push(color)
   this.multi[0].series.push(this.serie)
   //End FAMILIAS

   var namePopulation = this._data[i].name   
   var valuePopulation =  this.formatDecimal.redondear( this._data[i].values.total_poblacion)

   this.seriePopulation.name = namePopulation
   this.seriePopulation.value = valuePopulation
   this.multi[1].series.push(this.seriePopulation)
  }

   
  console.log("Date in chart ", this._data)
  console.log("Pill chart ", this.multi[0].series)
  console.log("Color chart ", this.colorScheme.domain)
 }

}
