import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ObjSerieOtherBenefits } from 'src/app/data/obj-serie-other-benefits';
import { ObjSerieOtherIncome } from 'src/app/data/obj-serie-other-income';
import { ObjSeriePensions } from 'src/app/data/obj-serie-pensions';
import { ObjSerieSalary } from 'src/app/data/obj-serie-salary';
import { ObjSerieUnemploymentBenefits } from 'src/app/data/obj-serie-unemployment-benefits';
import { FormatoDecimalService } from 'src/app/services/formato-decimal.service';

@Component({
  selector: 'app-hrzont-group-config-chart',
  templateUrl: './hrzont-group-config-chart.component.html',
  styleUrls: ['./hrzont-group-config-chart.component.css']
})
export class HrzontGroupConfigChartComponent implements OnInit, OnChanges {

  serieOtherIncome: ObjSerieOtherIncome
  serieOtherBenefits: ObjSerieOtherBenefits
  serieUnemploymentBenefits: ObjSerieUnemploymentBenefits
  seriePensions: ObjSeriePensions
  serieSalary: ObjSerieSalary

   @Input() _data: any[];
  //@Input('_data') public _data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  title = 'Fuentes de Ingreso';
  view: any[] = [220, 350];
  data: any[] = [40, 11762, 991, 31620];
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
    'name': 'Otros ingresos',
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
    'name': 'Otras prestaciones',
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
    'name': 'Prestaciones desempleo',
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
    'name': 'Pensiones',
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
    'name': 'Salario',
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

 public multi = [{
  'name': 'Otros ingresos',
  'series': []
},
{
  'name': 'Otras prestaciones',
  'series': []
},
{
  'name': 'Prestaciones desempleo',
  'series': []
},
{
  'name': 'Pensiones',
  'series': []
},
{
  'name': 'Salario',
  'series': []
}
];

  constructor(public formatDecimal: FormatoDecimalService) {
  this.serieOtherIncome = new ObjSerieOtherIncome()
  this.serieOtherBenefits = new ObjSerieOtherBenefits()
  this.serieUnemploymentBenefits = new ObjSerieUnemploymentBenefits()
  this.seriePensions = new ObjSeriePensions()
  this.serieSalary = new ObjSerieSalary()
  }
  ngOnChanges(changes: SimpleChanges) {
    this.pillChart()
    // changes.prop contains the old and the new value...
    /*this.multi = [
      {
        'name': 'Otros ingresos',
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
        'name': 'Otras prestaciones',
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
        'name': 'Prestaciones desempleo',
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
        'name': 'Pensiones',
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
        'name': 'Salario',
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
  ngOnInit() {

    console.log(this._data);
  }
  
  onSelect(event) {
    console.log(event);
  }
  formatDataLabel(value )  {
    let resultado = value.toString();
    resultado = resultado.replace('.', ',');
     return resultado + '%';
  }

pillChart(){
  for (let i = 0; i < this._data.length; i++) {
    
  this.serieOtherIncome = new ObjSerieOtherIncome()
  this.serieOtherBenefits = new ObjSerieOtherBenefits()
  this.serieUnemploymentBenefits = new ObjSerieUnemploymentBenefits()
  this.seriePensions = new ObjSeriePensions()
  this.serieSalary = new ObjSerieSalary()

  //Other income
   var color = this._data[i].color 
   var nameOtherIncome = this._data[i].name   
   var valueOtherIncome = this.formatDecimal.formatearNum(this._data[i].values.Fue_de_ingreso_otros_ingresos )
   
   this.serieOtherIncome.name = nameOtherIncome
   this.serieOtherIncome.value = valueOtherIncome

   this.colorScheme.domain.push(color)
   this.multi[0].series.push(this.serieOtherIncome)
   //End other income

   //Other benefits
   var nameOtherBenefits = this._data[i].name   
   var valueOtherBenefits = this.formatDecimal.formatearNum(this._data[i].values.Fue_de_ingreso_otras_prestaciones)
   
   this.serieOtherBenefits.name = nameOtherBenefits
   this.serieOtherBenefits.value = valueOtherBenefits
   this.multi[1].series.push(this.serieOtherBenefits)
   //End other income

   //Unemployment benefits
  var nameUnemploymentBenefits  = this._data[i].name   
  var valueUnemploymentBenefits  =  this.formatDecimal.formatearNum(this._data[i].values.Fue_de_ing_prestaciones_por_desempleo)
  
  this.serieUnemploymentBenefits .name = nameUnemploymentBenefits 
  this.serieUnemploymentBenefits .value = valueUnemploymentBenefits 
  this.multi[2].series.push(this.serieUnemploymentBenefits)
  //End unemployment benefits

  //Pensions
  var namePensions = this._data[i].name   
  var valuePensions = this.formatDecimal.formatearNum(this._data[i].values.Fue_de_ing_pensiones )
  
  this.seriePensions.name = namePensions
  this.seriePensions.value = valuePensions
  this.multi[3].series.push(this.seriePensions)
  //End pensions

  //Salary
  var nameSalary = this._data[i].name   
  var valueSalary = this.formatDecimal.formatearNum(this._data[i].values.Fue_de_ing_salario )
  
  this.serieSalary.name = nameSalary
  this.serieSalary.value = valueSalary
  this.multi[4].series.push(this.serieSalary)
  //End salary
  }

  
 }


}
