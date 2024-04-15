import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjSerieBetween1865 } from 'src/app/data/obj-serie-between1865 ';
import { ObjSerieMinor18 } from 'src/app/data/obj-serie-mInor18';
import { ObjSerieMore65 } from 'src/app/data/obj-serie-more65';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';


@Component({
  selector: 'app-vertic-group-chart',
  templateUrl: './vertic-group-chart.component.html',
  styleUrls: ['./vertic-group-chart.component.css']
})
export class VerticGroupChartComponent implements OnChanges, OnInit {
  serieMinor18: ObjSerieMinor18
  serieBetween1865: ObjSerieBetween1865
  serieMore65: ObjSerieMore65

  @Input() _data: any[];
  //@Input() _colors = []
  //@Input('_data') public _data = [0, 0, 0, 0, 0, 0];
  title = 'POBLACIÓN Y FAMILIAS';
  view: any[] = [450, 200];
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

  //Now
  /*colorScheme = {
    //domain: ['#fca404', ' #fc0404', '#046404', ' #d7dfe1']
    //domain: ["rgb(255, 165, 0)", ' #fc0404', '#046404', '#d7dfe1']
    domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
  };*/
  colorScheme = {
    domain: []
  };

  //Before
  /*colorScheme = {
    domain: ['#4472C4', '#548235']
  };*/

  //pie
  // showLabels = true;

  // data goes here

  //Before
  /*public multi = [
  {
    'name': 'Menores 18 años',
    'series': [
      {
        'name': 'Zona',
        'value': this._data[0] ,
  
      },
      {
        'name': 'Municipio',
        'value': this._data[1],
  
      }
    ]
  },
  {
    'name': 'De 18 a 65',
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
    'name': 'Mayor de 65',
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

  //Now
  /*public multi = [
  {
    'name': 'Menores 18 años',
    'series': [
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
    'name': 'De 18 a 65',
    'series': [
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
  },
  {
    'name': 'Mayor de 65',
    'series': [
      {
        "name": "Zona 1",
        "value": this._data[8]
      },
      {
        "name": "Zona 2",
        "value": this._data[9]
      },
      {
        "name": "Zona 3",
        "value": this._data[10]
      },
      {
        "name": "Zona 4",
        "value": this._data[11]
      }
    ]
  }
  ];*/

  public multi = [
    {
      'name': 'Menores 18 años',
      'series': []
    },
    {
      'name': 'De 18 a 65',
      'series': []
    },
    {
      'name': 'Mayor de 65',
      'series': []
    }
  ];
  constructor(public formatDecimal: FormatoDecimalService) {
    this.serieMinor18 = new ObjSerieMinor18()
    this.serieBetween1865 = new ObjSerieBetween1865()
    this.serieMore65 = new ObjSerieMore65()
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    // changes.prop contains the old and the new value...
    //if (this._data[0]=== 0  && this._data[1] === 0 && this._data[2] === 0&& this._data[3] === 0 && this._data[4] === 0 && this._data[5] === 0)  {
    /*this.multi = [
      {
        'name': 'Menores 18 años',
        'series': [
          {
            'name': 'Zona',
            'value': this._data[0] ,
  
          },
          {
            'name': 'Municipio',
            'value': this._data[1],
  
          }
        ]
      },
      {
        'name': 'De 18 a 65',
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
        'name': 'Mayor de 65',
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
    //}

    //Now
    /*this.colorScheme = {
      domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
    };
  this.multi = [
    {
      'name': 'Menores 18 años',
      'series': [
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
      'name': 'De 18 a 65',
      'series': [
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
    },
    {
      'name': 'Mayor de 65',
      'series': [
        {
          "name": "Zona 1",
          "value": this._data[8]
        },
        {
          "name": "Zona 2",
          "value": this._data[9]
        },
        {
          "name": "Zona 3",
          "value": this._data[10]
        },
        {
          "name": "Zona 4",
          "value": this._data[11]
        }
      ]
    }
    ];*/
  }

  ngOnInit() {
    //Now
    /*this.colorScheme = {
      domain: [this._colors[0], this._colors[1], this._colors[2], this._colors[3]]
    };
  this.multi = [
    {
      'name': 'Menores 18 años',
      'series': [
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
      'name': 'De 18 a 65',
      'series': [
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
    },
    {
      'name': 'Mayor de 65',
      'series': [
        {
          "name": "Zona 1",
          "value": this._data[8]
        },
        {
          "name": "Zona 2",
          "value": this._data[9]
        },
        {
          "name": "Zona 3",
          "value": this._data[10]
        },
        {
          "name": "Zona 4",
          "value": this._data[11]
        }
      ]
    }
    ];*/
  }
  
  onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value) {
    return value + '%';
  }

  pillChart() {
    for (let i = 0; i < this._data.length; i++) {
      
      this.serieMinor18 = new ObjSerieMinor18()
      this.serieBetween1865 = new ObjSerieBetween1865()
      this.serieMore65 = new ObjSerieMore65()

      var color = this._data[i].color
      //Minor 18
      var nameMinor18 = this._data[i].name
      var valueMinor18 = this.formatDecimal.formatearNum(this._data[i].values.Porc_de_poblacion_menor_18 )

      this.serieMinor18.name = nameMinor18
      this.serieMinor18.value = valueMinor18

      this.colorScheme.domain.push(color)
      this.multi[0].series.push(this.serieMinor18)
      //End minor 18

      //Between 18 y 65
      var nameBetween1865 = this._data[i].name
      var valueBetween1865 = this.formatDecimal.formatearNum(100 - (this._data[i].values.Porc_de_poblacion_mas_65 ) - (this._data[i].values.Porc_de_poblacion_menor_18))

      this.serieBetween1865.name = nameBetween1865
      this.serieBetween1865.value = valueBetween1865

      this.multi[1].series.push(this.serieBetween1865)
      //End between 18 y 65

      //More 65
      var nameMore65 = this._data[i].name
      var valueMore65 = this.formatDecimal.formatearNum(this._data[i].values.Porc_de_poblacion_mas_65 )

      this.serieMore65.name = nameMore65
      this.serieMore65.value = valueMore65

      this.multi[2].series.push(this.serieMore65)
      //End more 65

    }
  }

}

