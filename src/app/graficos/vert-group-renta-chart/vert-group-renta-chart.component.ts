import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjSerieInterioresA } from 'src/app/data/obj-serie-interiores-a';
import { ObjSerieInterioresB } from 'src/app/data/obj-serie-interriores-b';
import { ObjSerieInterioresC } from 'src/app/data/obj-serie-interriores-c';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-vert-group-renta-chart',
  templateUrl: './vert-group-renta-chart.component.html',
  styleUrls: ['./vert-group-renta-chart.component.css']
})
export class VertGroupRentaChartComponent implements OnInit, OnChanges {
  serieInterioresA: ObjSerieInterioresA
  serieInterioresB: ObjSerieInterioresB
  serieInterioresC: ObjSerieInterioresC

  @Input('_data') public _data = [];
  //@Input('_data') public _data = [0, 0, 0, 0, 0, 0];
  title = '% Rentas';
  view: any[] = [650, 150];
  //data: any[] = [33, 21, 61, 63, 5, 17];


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
  legendTitle = '';
  roundEdges = false;
  showDataLabel = true;

  /*colorScheme = {
    domain: ['#4472C4', '#548235']
  };*/

  colorScheme = {
    domain: []
  };


  //pie
  // showLabels = true;

  // data goes here

  /*public multi = [
  {
    'name': 'Inferiores a 10.000',
    'series': [
      {
        'name': 'Zona',
        'value': this._data[0],
      },
      {
        'name': 'Municipio',
        'value': this._data[1],
      }
    ]
  },
  {
    'name': 'Inferiores a 7.500',
    'series': [
      {
        'name': 'Zona',
        'value': this._data[2],
      },
      {
        'name': 'Municipio',
        'value': this._data[3],
      }
    ]
  },
  {
    'name': 'Inferiores a 5.000',
    'series': [
      {
        'name': 'Zona',
        'value': this._data[4],
      },
      {
        'name': 'Municipio',
        'value': this._data[5],
      }
    ]
  }
  ];*/

  public multi = [
    {
      'name': 'Inferiores a 10.000',
      'series': []
    },
    {
      'name': 'Inferiores a 7.500',
      'series': []
    },
    {
      'name': 'Inferiores a 5.000',
      'series': []
    }
  ];
  constructor(public formatDecimal: FormatoDecimalService) {
    this.serieInterioresA = new ObjSerieInterioresA()
    this.serieInterioresB = new ObjSerieInterioresB()
    this.serieInterioresC = new ObjSerieInterioresC()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    // changes.prop contains the old and the new value...
    /*this.multi = [
      {
        'name': 'Inferiores a 10.000',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[0],
          },
          {
            'name': 'Municipio',
            'value': this._data[1],
          }
        ]
      },
      {
        'name': 'Inferiores a 7.500',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[2],
          },
          {
            'name': 'Municipio',
            'value': this._data[3],
          }
        ]
      },
      {
        'name': 'Inferiores a 5.000',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[4],
          },
          {
            'name': 'Municipio',
            'value': this._data[5],
          }
        ]
      }
      ];*/

  }
  ngOnInit() {
  }


  onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value) {
    let resultado = value.toString();
    resultado = resultado.replace('.', ',');
    return resultado + '%';
  }

  pillChart() {
    for (let i = 0; i < this._data.length; i++) {

      this.serieInterioresA = new ObjSerieInterioresA()
    this.serieInterioresB = new ObjSerieInterioresB()
    this.serieInterioresC = new ObjSerieInterioresC()

      var color = this._data[i].color
      //Interiores A
      var nameInterioresA= this._data[i].name
      var valueInterioresA = this.formatDecimal.formatearNum(this._data[i].values.por_poblacion_renta_menor_10000)

      this.serieInterioresA.name = nameInterioresA
      this.serieInterioresA.value = valueInterioresA

      this.colorScheme.domain.push(color)
      this.multi[0].series.push(this.serieInterioresA)
      //End interiores A

      //InterioresB
      var nameInterioresB = this._data[i].name
      var valueInterioresB = this.formatDecimal.formatearNum(this._data[i].values.por_poblacion_renta_menor_7500 )
      this.serieInterioresB.name = nameInterioresB
      this.serieInterioresB.value = valueInterioresB

      this.multi[1].series.push(this.serieInterioresB)
      //End interioresB

      //InterioresC 
      var nameInterioresC = this._data[i].name
      var valueInterioresC  =  this.formatDecimal.formatearNum(this._data[i].values.por_poblacion_renta_menor_5000 )

      this.serieInterioresC .name = nameInterioresC 
      this.serieInterioresC .value = valueInterioresC 

      this.multi[2].series.push(this.serieInterioresC)
      //End interioresC 

    }
  }
}
