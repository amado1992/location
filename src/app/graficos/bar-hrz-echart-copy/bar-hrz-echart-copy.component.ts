import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
    selector: 'app-bar-hrz-echart-copy',
    templateUrl: './bar-hrz-echart-copy.component.html',
    styleUrls: ['./bar-hrz-echart-copy.component.css']
})
export class BarHrzEchartCopyComponent implements OnInit, OnChanges {
    checkColor: any[] = []
    @Input() count: any
    @Input() colorEvent: any
    @Output() eventRefreshFather: EventEmitter<any> = new EventEmitter();
    //new chart
    //single: any[];
    //view: any[] = [400, 400];
    view: any[] = [400, 700];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = true;
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Tipos';
    showYAxisLabel: boolean = true;
    xAxisLabel: string = 'Cantidad';

    colorScheme = {
        domain: ['#548235', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4',
            '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4',
            '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4',
            '#4472C4', '#4472C4', '#4472C4']
    };

    /*types = ['Todos', 'Naturaleza', 'Áreas de descanso', 'Oficinas bancarias', 'Gasolineras', 'Organismos administrativos', 'Parques',
        'Museos o centros Culturales', 'Centros de salud /Clínicas', 'Centros de salud/Academias', 'Alojamientos', 'Servicios de negocios',
        'Tiendas', 'Transporte', 'Locales de ocio', 'Restaurantes/Cafeterías'
    ]*/

   filter = [ "todos",
   "political", "lodging", "point_of_interest", "establishment", "primary_school", "school", "jewelry_store", "store", "real_estate_agency"
   , "hospital", "health", "bank", "atm", "accounting", "finance", "night_club", "bar", "restaurant", "food", "gym", "meal_delivery", "meal_takeaway"
   , "sublocality_level_1", "sublocality", "car_repair", "car_dealer", "hair_care", "beauty_salon", "clothing_store"
   , "shoe_store", "laundry", "post_office", "furniture_store", "home_goods_store", "doctor", "electronics_store", "grocery_or_supermarket", "general_contractor"
   , "electrician", "gas_station", "locality"]

   newFilter = [
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
  ]


    types = ["Todos", "Política", "Alojamiento", "Punto de interés", "Establecimiento", "Colegio de educación primaria", "Colegio", "Joyería", "Tienda", "Agencia inmobiliaria", "Hospital",
        "Salud", "Banco", "Cajero automático", "Contabilidad", "Finanzas", "Discoteca", "Bar", "Restaurante", "Comida",
        "Gimnasio", "Comida para llevar", "Entrega de comida", "Sublocalidad nivel 1", "Sublocalidad", "Taller de coches", "Venta de coches", "Salón de belleza", "Cuidado del cabello",
        "Tienda de ropa", "Zapatería", "Lavandería", "Agencia postal", "Tienda de mobiliario", "Tienda de hogar", "Doctor", "Tienda de electrónica", "Supermercado", "Contratista", "Electricidad", "Estación de gas", "Localidad"]
    //end new chart

    //@Input('_data') public _data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    @Input('_data') public _data = [];
    @Input('title') public title = '';
    @Input('color') public color = '#4472C4';
    @Output() filtro = new EventEmitter<Array<number>>();
    indices = new Array<number>();
    _color = [this.color, this.color, this.color, this.color, this.color, this.color,
    this.color, this.color, this.color, this.color, this.color, this.color, this.color, this.color, this.color];
    chartOption: EChartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Naturaleza', 'Áreas de descanso', 'Oficinas bancarias', 'Gasolineras', 'Organismos administrativos', 'Parques',
                'Museos o centros Culturales', 'Centros de salud /Clínicas', 'Centros de salud/Academias', 'Alojamientos', 'Servicios de negocios',
                'Tiendas', 'Transporte ', 'Locales de ocio', 'Restaurantes/Cafeterías'
            ]
        },
        series: [
            {
                name: '',
                type: 'bar',
                data: [
                    {
                        value: this._data[0],
                        itemStyle: { color: this._color[0] }
                    },
                    {
                        value: this._data[1],
                        itemStyle: { color: this._color[1] }
                    },
                    {
                        value: this._data[2],
                        itemStyle: { color: this._color[2] }
                    },
                    {
                        value: this._data[3],
                        itemStyle: { color: this._color[3] }
                    },
                    {
                        value: this._data[4],
                        itemStyle: { color: this._color[4] }
                    },
                    {
                        value: this._data[5],
                        itemStyle: { color: this._color[5] }
                    },
                    {
                        value: this._data[6],
                        itemStyle: { color: this._color[6] }
                    },
                    {
                        value: this._data[7],
                        itemStyle: { color: this._color[7] }
                    },
                    {
                        value: this._data[8],
                        itemStyle: { color: this._color[8] }
                    },
                    {
                        value: this._data[9],
                        itemStyle: { color: this._color[9] }
                    },
                    {
                        value: this._data[10],
                        itemStyle: { color: this._color[10] }
                    },
                    {
                        value: this._data[11],
                        itemStyle: { color: this._color[11] }
                    },
                    {
                        value: this._data[12],
                        itemStyle: { color: this._color[12] }
                    },
                    {
                        value: this._data[13],
                        itemStyle: { color: this._color[13] }
                    },
                    {
                        value: this._data[14],
                        itemStyle: { color: this._color[14] }
                    },
                ],
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                }
            },
        ]
    };

    single = [
        /*{
            "name": "Todos",
            "value": 0
        },
        {
            "name": "Naturaleza",
            "value": 0
        },
        {
            "name": "Áreas de descanso",
            "value": 0
        },
        {
            "name": "Oficinas bancarias",
            "value": 0
        },
        {
            "name": "Gasolineras",
            "value": 0
        },
        {
            "name": "Organismos administrativos",
            "value": 0
        },
        {
            "name": "Parques",
            "value": 0
        },
        {
            "name": "Museos o centros Culturales",
            "value": 0
        },
        {
            "name": "Centros de salud /Clínicas",
            "value": 0
        },
        {
            "name": "Centros de salud/Academias",
            "value": 0
        },
        {
            "name": "Alojamientos",
            "value": 0
        },
        {
            "name": "Servicios de negocios",
            "value": 0
        },
        {
            "name": "Tiendas",
            "value": 0
        },
        {
            "name": "Transporte",
            "value": 0
        },
        {
            "name": "Locales de ocio",
            "value": 0
        },
        {
            "name": "Restaurantes/Cafeterías",
            "value": 0
        },*/



        {
            "name": this.types[0],
            "value": this._data[0]
        },
        {
            "name": this.types[1],
            "value": this._data[1]
        },
        {
            "name": this.types[2],
            "value": this._data[2]
        },
        { "name": this.types[3], "value": this._data[3] },
        { "name": this.types[4], "value": this._data[4] },
        { "name": this.types[5], "value": this._data[5] },
        { "name": this.types[6], "value": this._data[6] }, 
        { "name": this.types[7], "value": this._data[7] },
        { "name": this.types[8], "value": this._data[8] },
        { "name": this.types[9], "value": this._data[9] },
        { "name": this.types[10], "value": this._data[10] },
        { "name": this.types[11], "value": this._data[11] },
        { "name": this.types[12], "value": this._data[12] },
        { "name": this.types[13],"value": this._data[13] },
        { "name": this.types[14], "value": this._data[14] },
        { "name": this.types[15],"value": this._data[15] },
        { "name": this.types[16], "value": this._data[16] },
        { "name": this.types[17], "value": this._data[17] },
        { "name": this.types[18], "value": this._data[18] },
        { "name": this.types[19], "value": this._data[19] },
        { "name": this.types[20], "value": this._data[20] },
        { "name": this.types[21], "value": this._data[21] },
        { "name": this.types[22], "value": this._data[22] },
        { "name": this.types[23], "value": this._data[23] },
        { "name": this.types[24], "value": this._data[24] },
        { "name": this.types[25], "value": this._data[25] },
        { "name": this.types[26], "value": this._data[26] },
        { "name": this.types[27], "value": this._data[27] },
        { "name": this.types[28], "value": this._data[28] },
        { "name": this.types[29], "value": this._data[29] },
        { "name": this.types[30], "value": this._data[30] },
        { "name": this.types[31], "value": this._data[31] },
        { "name": this.types[32], "value": this._data[32] },
        { "name": this.types[33], "value": this._data[33] },
        { "name": this.types[34], "value": this._data[34] },
        { "name": this.types[35], "value": this._data[35] },
        { "name": this.types[36], "value": this._data[36] },
        { "name": this.types[37], "value": this._data[37] },
        { "name": this.types[38], "value": this._data[38] },
        { "name": this.types[39], "value": this._data[39] },
        { "name": this.types[40], "value": this._data[40] },
        { "name": this.types[41], "value": this._data[41] }

    ];

    constructor() {
    }

    ngOnInit() {
        /*this.single = [

            {
                "name": "Todos",
                "value": this._data[0]
            },
            {
                "name": "Político",
                "value": this._data[1]
            },
            {
                "name": "Alojamiento",
                "value": this._data[2]
            },
            { "name": "Punto de interés", "value": this._data[3] },
            { "name": "Establecimiento", "value": this._data[4] },
            { "name": "Escuela primaria", "value": this._data[5] },
            { "name": "Escuela", "value": this._data[6] },
            { "name": "Joyería tienda", "value": this._data[7] },
            { "name": "Tienda", "value": this._data[8] },
            { "name": "Agencia inmobiliaria", "value": this._data[9] },
            { "name": "Hospital", "value": this._data[10] },
            { "name": "Salud", "value": this._data[11] },
            { "name": "Banco", "value": this._data[12] },
            { "name": "Cajero automático", "value": this._data[13] },
            { "name": "Contabilidad", "value": this._data[14] },
            { "name": "Finanzas", "value": this._data[15] },
            { "name": "Discoteca nocturna", "value": this._data[16] },
            { "name": "Barra", "value": this._data[17] },
            { "name": "Restaurante", "value": this._data[18] },
            { "name": "Comida", "value": this._data[19] },
            { "name": "Gimnasio", "value": this._data[20] },
            { "name": "Comida entrega", "value": this._data[21] },
            { "name": "Comida para llevar", "value": this._data[22] },
            { "name": "Sublocalidad nivel 1", "value": this._data[23] },
            { "name": "Sublocalidad", "value": this._data[24] },
            { "name": "Reparación automóvil", "value": this._data[25] },
            { "name": "Concesionario de coches", "value": this._data[26] },
            { "name": "Cuidado del cabello", "value": this._data[27] },
            { "name": "Salón de belleza", "value": this._data[28] },
            { "name": "Tienda de ropa", "value": this._data[29] },
            { "name": "Tienda de zapatos", "value": this._data[30] },
            { "name": "Lavandería", "value": this._data[31] },
            { "name": "Oficina de correos", "value": this._data[32] },
            { "name": "Tienda de muebles", "value": this._data[33] },
            { "name": "Tienda de artículos para el hogar", "value": this._data[34] },
            { "name": "Médico", "value": this._data[35] },
            { "name": "Tienda de electrónica", "value": this._data[36] },
            { "name": "Supermercado", "value": this._data[37] },
            { "name": "Contratista general", "value": this._data[38] },
            { "name": "Electricista", "value": this._data[39] },
            { "name": "Gasolinera", "value": this._data[40] },
            { "name": "Localidad", "value": this._data[41] }

        ];*/
    }
    ngOnChanges(changes: SimpleChanges) {

        this.single = [
            {
                "name": this.types[0],
                "value": this._data[0]
            },
            {
                "name": this.types[1],
                "value": this._data[1]
            },
            {
                "name": this.types[2],
                "value": this._data[2]
            },
            { "name": this.types[3], "value": this._data[3] },
            { "name": this.types[4], "value": this._data[4] },
            { "name": this.types[5], "value": this._data[5] },
            { "name": this.types[6], "value": this._data[6] }, 
            { "name": this.types[7], "value": this._data[7] },
            { "name": this.types[8], "value": this._data[8] },
            { "name": this.types[9], "value": this._data[9] },
            { "name": this.types[10], "value": this._data[10] },
            { "name": this.types[11], "value": this._data[11] },
            { "name": this.types[12], "value": this._data[12] },
            { "name": this.types[13],"value": this._data[13] },
            { "name": this.types[14], "value": this._data[14] },
            { "name": this.types[15],"value": this._data[15] },
            { "name": this.types[16], "value": this._data[16] },
            { "name": this.types[17], "value": this._data[17] },
            { "name": this.types[18], "value": this._data[18] },
            { "name": this.types[19], "value": this._data[19] },
            { "name": this.types[20], "value": this._data[20] },
            { "name": this.types[21], "value": this._data[21] },
            { "name": this.types[22], "value": this._data[22] },
            { "name": this.types[23], "value": this._data[23] },
            { "name": this.types[24], "value": this._data[24] },
            { "name": this.types[25], "value": this._data[25] },
            { "name": this.types[26], "value": this._data[26] },
            { "name": this.types[27], "value": this._data[27] },
            { "name": this.types[28], "value": this._data[28] },
            { "name": this.types[29], "value": this._data[29] },
            { "name": this.types[30], "value": this._data[30] },
            { "name": this.types[31], "value": this._data[31] },
            { "name": this.types[32], "value": this._data[32] },
            { "name": this.types[33], "value": this._data[33] },
            { "name": this.types[34], "value": this._data[34] },
            { "name": this.types[35], "value": this._data[35] },
            { "name": this.types[36], "value": this._data[36] },
            { "name": this.types[37], "value": this._data[37] },
            { "name": this.types[38], "value": this._data[38] },
            { "name": this.types[39], "value": this._data[39] },
            { "name": this.types[40], "value": this._data[40] },
            { "name": this.types[41], "value": this._data[41] }
        ];

        this._color = [this.color, this.color, this.color, this.color, this.color, this.color,
        this.color, this.color, this.color, this.color, this.color, this.color, this.color, this.color, this.color];
        this.chartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Naturaleza', 'Áreas de descanso', 'Oficinas bancarias', 'Gasolineras', 'Organismos administrativos', 'Parques',
                    'Museos o centros Culturales', 'Centros de salud /Clínicas', 'Centros de salud/Academias', 'Alojamientos',
                    'Servicios de negocios', 'Tiendas', 'Transporte ', 'Locales de ocio', 'Restaurantes/Cafeterías'
                ]
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: [
                        {
                            value: this._data[0],
                            itemStyle: { color: this._color[0] }
                        },
                        {
                            value: this._data[1],
                            itemStyle: { color: this._color[1] }
                        },
                        {
                            value: this._data[2],
                            itemStyle: { color: this._color[2] }
                        },
                        {
                            value: this._data[3],
                            itemStyle: { color: this._color[3] }
                        },
                        {
                            value: this._data[4],
                            itemStyle: { color: this._color[4] }
                        },
                        {
                            value: this._data[5],
                            itemStyle: { color: this._color[5] }
                        },
                        {
                            value: this._data[6],
                            itemStyle: { color: this._color[6] }
                        },
                        {
                            value: this._data[7],
                            itemStyle: { color: this._color[7] }
                        },
                        {
                            value: this._data[8],
                            itemStyle: { color: this._color[8] }
                        },
                        {
                            value: this._data[9],
                            itemStyle: { color: this._color[9] }
                        },
                        {
                            value: this._data[10],
                            itemStyle: { color: this._color[10] }
                        },
                        {
                            value: this._data[11],
                            itemStyle: { color: this._color[11] }
                        },
                        {
                            value: this._data[12],
                            itemStyle: { color: this._color[12] }
                        },
                        {
                            value: this._data[13],
                            itemStyle: { color: this._color[13] }
                        },
                        {
                            value: this._data[14],
                            itemStyle: { color: this._color[14] }
                        },
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
            ]
        };
        this.indices = new Array<number>();

        var index = this.colorEvent
        
        var indexTwo = this.checkColor.indexOf(index)
        if (indexTwo == -1) {
            var indexUpdate = this.colorScheme.domain.indexOf('#548235')
            if (indexUpdate != -1) {
                this.colorScheme.domain.splice(indexUpdate, 1, '#4472C4');
            }

            this.checkColor.push(index)
            this.colorScheme.domain.splice(index, 1, '#548235');
            
        } else {
            var indexUpdate = this.colorScheme.domain.indexOf('#548235')
            if (indexUpdate != -1) {
                this.colorScheme.domain.splice(indexUpdate, 1, '#4472C4');
            }

            this.checkColor.splice(indexTwo, 1);
            this.colorScheme.domain.splice(index, 1, '#548235');
            
        }

    }
    onChartEvent(event: any, type: string) {
        const green = '#548235';
        const pos = event['dataIndex'];

        if (this._color[pos] === green) {
            this._color[pos] = this.color;
            const index = this.indices.indexOf(pos);
            if (index > -1) {
                this.indices.splice(index, 1);
            }
        } else {
            this._color[pos] = green;
            this.indices.push(event['dataIndex']);
        }

        this.chartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Naturaleza', 'Áreas de descanso', 'Oficinas bancarias', 'Gasolineras', 'Organismos administrativos', 'Parques',
                    'Museos o centros Culturales', 'Centros de salud /Clínicas', 'Centros de salud/Academias', 'Alojamientos', 'Servicios de negocios',
                    'Tiendas', 'Transporte ', 'Locales de ocio', 'Restaurantes/Cafeterías'
                ]
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    data: [
                        {
                            value: this._data[0],
                            itemStyle: { color: this._color[0] }
                        },
                        {
                            value: this._data[1],
                            itemStyle: { color: this._color[1] }
                        },
                        {
                            value: this._data[2],
                            itemStyle: { color: this._color[2] }
                        },
                        {
                            value: this._data[3],
                            itemStyle: { color: this._color[3] }
                        },
                        {
                            value: this._data[4],
                            itemStyle: { color: this._color[4] }
                        },
                        {
                            value: this._data[5],
                            itemStyle: { color: this._color[5] }
                        },
                        {
                            value: this._data[6],
                            itemStyle: { color: this._color[6] }
                        },
                        {
                            value: this._data[7],
                            itemStyle: { color: this._color[7] }
                        },
                        {
                            value: this._data[8],
                            itemStyle: { color: this._color[8] }
                        },
                        {
                            value: this._data[9],
                            itemStyle: { color: this._color[9] }
                        },
                        {
                            value: this._data[10],
                            itemStyle: { color: this._color[10] }
                        },
                        {
                            value: this._data[11],
                            itemStyle: { color: this._color[11] }
                        },
                        {
                            value: this._data[12],
                            itemStyle: { color: this._color[12] }
                        },
                        {
                            value: this._data[13],
                            itemStyle: { color: this._color[13] }
                        },
                        {
                            value: this._data[14],
                            itemStyle: { color: this._color[14] }
                        },
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
            ]
        };
        this.filtro.emit(this.indices);
    }

    onSelect(data): void {
        
        var index = this.types.indexOf(JSON.parse(JSON.stringify(data.name)))
        //var nameFilter = this.filter[index]
        var nameFilter = this.newFilter[index]
        
        //this.eventRefreshFather.emit({ "index": index, "name": data.name })
        this.eventRefreshFather.emit({ "index": index, "name": nameFilter })

        //var removed =  this.colorScheme.domain.splice(3, 1, '#548235');

        /*this.colorScheme = {
            domain: ['#548235', '#4472C4', '#548235', '#548235', '#4472C4', '#4472C4', '#4472C4', '#4472C4',
                '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4', '#4472C4']
        };*/
    }

    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
}
