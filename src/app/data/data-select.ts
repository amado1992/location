import { Select2Data } from 'ng-select2-component';
export const opciones_visual: Select2Data = [
  { value: 'Competencia', label: 'Competencia' },
  { value: 'Zonas', label: 'Zonas' },
  { value: 'Viviendas', label: 'Viviendas' },
  { value: 'Centros Propios', label: 'Centros Propios' }
];
export const compet_tamano: Select2Data = [
  { value: 'Menos de 100 ', label: 'Menos de 100' },
  { value: '100-200 ', label: '100-200' },
  { value: '200-300', label: '200-300' },
  { value: '300 o más ', label: '300 o más ' }
];
export const compet_ensena: Select2Data = [
  { value: 'Alcampo', label: 'Alcampo' },
  { value: 'Eroski', label: 'Eroski' },
  { value: 'Dia', label: 'Dia' },
  { value: 'Consum', label: 'Consum' }
];
export const compet_antiguedad: Select2Data = [
  { value: 'Último año', label: 'Último año' },
  { value: 'Más de un año', label: 'Más de un año' },
];
export const compet_zona: Select2Data = [
  { value: 'Zona 1', label: 'Zona 1' },
  { value: 'Zona 2', label: 'Zona 2' },
  { value: 'Zona 3', label: 'Zona 3' },
  { value: 'Zona 4', label: 'Zona 4' }
];
export const venta_modelo: Select2Data = [
  { value: 'enero', label: 'Enero' },
  { value: 'febrero', label: 'Febrero' },
  { value: 'marzo', label: 'Marzo' },
  { value: 'abril', label: 'Abril' },
  { value: 'mayo', label: 'Mayo' },
  { value: 'junio', label: 'Junio' },
  { value: 'julio', label: 'Juilio' },
  { value: 'agosto', label: 'Agosto' },
  { value: 'septiembre', label: 'Septiembre' },
  { value: 'octubre', label: 'Octubre' },
  { value: 'noviembre', label: 'Noviembre' },
  { value: 'diciembre', label: 'Diciembre' },
  { value: '12 meses', label: '12 meses' }
];
export const venta_indicador: Select2Data = [
  /*{ value: 'Número de Operaciones', label: 'Número de Operaciones' },
  { value: 'Ticket Medio', label: 'Ticket Medio' },
  { value: 'Venta Total', label: 'Venta Total' },*/
  { value: '% Ocupación', label: '% Ocupación' },
];
export const grid_data = [
  { id: 2, text: '2' }, { id: 3, text: '3' }, { id: 4, text: '4' }, { id: 5, text: '5' },
  { id: 6, text: '6' }, { id: 7, text: '7' }, { id: 8, text: '8' }, { id: 9, text: '9' },
  { id: 10, text: '10' }, { id: 12, text: '12' }, { id: 14, text: '14' }, { id: 15, text: '15' },
  { id: 16, text: '16' }, { id: 18, text: '18' }, { id: 20, text: '20' }, { id: 21, text: '21' },
  { id: 22, text: '22' }, { id: 24, text: '24' }, { id: 25, text: '25' }, { id: 27, text: '27' },
  { id: 28, text: '28' }, { id: 30, text: '30' }, { id: 32, text: '32' }, { id: 33, text: '33' },
  { id: 35, text: '35' }, { id: 36, text: '36' }, { id: 39, text: '39' }, { id: 40, text: '40' },
  { id: 42, text: '42' }, { id: 44, text: '44' }, { id: 45, text: '45' },
  { id: 48, text: '48' }, { id: 49, text: '49' }, { id: 50, text: '50' }, { id: 51, text: '51' },
  { id: 52, text: '52' }, { id: 54, text: '54' }, { id: 55, text: '55' }, { id: 56, text: '56' },
  { id: 60, text: '60' }, { id: 63, text: '63' }, { id: 64, text: '64' },
  { id: 65, text: '65' }, { id: 66, text: '66' }, { id: 68, text: '68' },
  { id: 70, text: '70' }, { id: 72, text: '72' }, { id: 75, text: '75' }, { id: 77, text: '77' },
  { id: 80, text: '80' }, { id: 81, text: '81' }, { id: 84, text: '84' }, { id: 85, text: '85' },
  { id: 88, text: '88' }, { id: 90, text: '90' }, { id: 91, text: '91' },
  { id: 96, text: '96' }, { id: 98, text: '98' }, { id: 99, text: '99' }, { id: 100, text: '100' },
];
export const grid_position = [
  '2', '3', '4', '5', '6', '7', '8', '9',
  '10', '12', '14', '15',
  '16', '18', '20', '21',
  '22', '24', '25', '27',
  '28', '30', '32', '33',
  '35', '36', '39', '40',
  '42', '44', '45',
  '48', '49', '50', '51',
  '52', '54', '55', '56',
  '60', '63', '64',
  '65', '66', '68',
  '70', '72', '75', '77',
  '80', '81', '84', '85',
  '88', '90', '91',
  '96', '98', '99', '100',
]

export const indicators: any[] = [
  /*{ id: 1, value: 'ticketMedio', label: 'Ticket medio' },//ticket_medio
  { id: 2, value: 'ventaTotal', label: 'Venta total' },//venta_total*/

  //{ id: 3, value: 'porcFrescos', label: '% Frescos' },//porc_frescos
  //{ id: 4, value: 'porcCongelados', label: '% Congelados' },//porc_congelados
  //{ id: 5, value: 'porcHogar', label: '% Hogar' },//porc_hogar
  //{ id: 6, value: 'porcCuidadoPersonal', label: '% Cuidado personal' },//poc_cuidado_personal
  
  //{ id: 7, value: 'numeroOperaciones', label: 'Número de operaciones' },//numero_operaciones
  { id: 7, value: 'numeroOperaciones', label: '% Ocupación' },
];

export const puntos_interes_: any[] = [
  { value : 'POI_name', label: 'POI_name'},
  { value : 'POI_location', label: 'POI_location'},
  { value : 'POI_dist', label: 'POI_dist'},
  { value : 'POI_nratings', label: 'POI_nratings'},
  { value : 'POI_types', label: 'POI_types'},
  { value : 'POI_rating', label: 'POI_rating'},
  { value : 'POI_pricelev', label: 'POI_pricelev'}
]

export const statistics: any[] = [
  { id: 1, value: 'poblacion', label: 'Población' },//total_poblacion
  { id: 2, value: 'familia', label: 'Familias' },//total_poblacion / Tam_medio_hogar o familias
  { id: 3, value: 'rentaFamiliar', label: 'Total renta familiar' },//total_renta_familiar
  { id: 4, value: 'rentaMedia', label: 'Renta media por persona' },//Renta_media_por_persona
  { id: 5, value: 'menores18', label: '% Menores 18' },
  { id: 6, value: 'mayores65', label: '% Mayores 65' },
  { id: 7, value: 'porcientoDesempleo', label: '% Desempleo' },//Fue_de_ing_prestaciones_por_desempleo

  { id: 8, value: 'edadMediaPoblacion', label: 'Edad media población' },//Edad_media_poblacion
  { id: 9, value: 'fueIngPensiones', label: 'Fuente de ingreso pensiones' },//Fue_de_ing_pensiones
  { id: 10, value: 'sumaNumViviendas', label: 'Suma número viviendas' },//suma_num_viviendas
  { id: 11, value: 'fueIngSalario', label: 'Fuente de ingreso salario' },//Fue_de_ing_salario
  { id: 12, value: 'fueIngresoOtrasPrestaciones', label: 'Fuente de ingreso otras prestaciones' },//Fue_de_ingreso_otras_prestaciones
  { id: 13, value: 'fueIngresoOtrosIngresos', label: 'Fuente de ingreso otros ingresos' },//Fue_de_ingreso_otros_ingresos
  { id: 14, value: 'numComercios', label: 'Número comercios' },//Num_comercios
  { id: 15, value: 'numOficinas', label: 'Número oficinas' },//Num_oficinas
  { id: 16, value: 'porcPoblaciónMenor5', label: '% Población menor que 5' },//Porc_de_población_menor_5
  { id: 17, value: 'porcHogaresUnipersonales', label: '% Hogares unipersonales' },//Porc_hogares_unipersonales
  { id: 18, value: 'rentaMediaHogar', label: 'Renta media por hogar' },//Renta_media_por_hogar
  { id: 19, value: 'superficieMedia', label: 'Superficie media' },//Superficie_media
  { id: 20, value: 'tamMedioHogar', label: 'Tamaño medio hogar' },//Tam_medio_hogar
  { id: 21, value: 'altuMedia', label: 'Altura media' },//altu_media
  { id: 22, value: 'antiguedad', label: 'Antiguedad' },//antiguedad
  { id: 23, value: 'numFincas', label: 'Número fincas' },//num_fincas
  { id: 24, value: 'numInmuebles', label: 'Número inmuebles' },//num_inmuebles
  { id: 25, value: 'numSegundaVivienda', label: 'Número segunda vivienda' },//num_segunda_vivienda
  { id: 26, value: 'porPoblacionRentaMenor10000', label: '% Población renta menor que 10000' },//por_poblacion_renta_menor_10000
  { id: 27, value: 'porPoblacionRentaMenor5000', label: '% Población renta menor que 5000' },//por_poblacion_renta_menor_5000
  { id: 28, value: 'porPoblacionRentaMenor7500', label: '% Población renta menor que 7500' },//por_poblacion_renta_menor_7500
  { id: 29, value: 'totalViviendasSinAntig0', label: 'Total viviendas' },//totalViviendas_sin_antig_0

];

//"Edad_media_poblacion": 44.94591098164392,
//"Fue_de_ing_pensiones": 0.19789533612615517,
//"Fue_de_ing_prestaciones_por_desempleo": 0.011570372285683807,
//"Fue_de_ing_salario": 0.6033692792155825,
//"Fue_de_ingreso_otras_prestaciones": 0.02278438329959246,
//"Fue_de_ingreso_otros_ingresos": 0.15760777988526975,
//"Num_comercios": 59767.0,
//"Num_oficinas": 28133.0,
//"Porc_de_población_mas_65": 0.2185570833329129,
//"Porc_de_población_menor_18": 0.1352555132128261,
//"Porc_de_población_menor_5": 0.03874014898465406,
//"Porc_hogares_unipersonales": 0.15411782170756438,
//"Renta_media_por_hogar": 40767.72266575696,
//"Renta_media_por_persona": 17089.200207896403,
//"Superficie_media": 100.99943472804388,
//"Tam_medio_hogar": 2.331581211039021,
//"altu_media": 6.258144325342258,
//"antiguedad": 1938.0182006880514,
//"familias": 565176.3036737029,
//"num_fincas": 51847.0,
//"num_inmuebles": 973550.0,
//"num_segunda_vivienda": 157534.69632629713,
//"por_poblacion_renta_menor_10000": 0.2189063955670614,
//"por_poblacion_renta_menor_5000": 0.07967728828359424,
//"por_poblacion_renta_menor_7500": 0.1414252885537594,
//"suma_num_viviendas": 724308.0,
//"totalViviendas_sin_antig_0": 52031.0,
//"total_poblacion": 1317754.4505700895,
//"total_renta_familiar": 23040950805.42716

export const typesModel: any[] = [
  { id: 1, value: 'enero', label: 'Enero' },
  { id: 2, value: 'febrero', label: 'Febrero' },
  { id: 3, value: 'marzo', label: 'Marzo' },
  { id: 4, value: 'abril', label: 'Abril' },
  { id: 5, value: 'mayo', label: 'Mayo' },
  { id: 6, value: 'junio', label: 'Junio' },
  { id: 7, value: 'julio', label: 'Julio' },
  { id: 8, value: 'agosto', label: 'Agosto' },
  { id: 9, value: 'septiembre', label: 'Septiembre' },
  { id: 10, value: 'octubre', label: 'Octubre' },
  { id: 11, value: 'noviembre', label: 'Noviembre' },
  { id: 12, value: 'diciembre', label: 'Diciembre' },
  { id: 13, value: '12 meses', label: '12 meses' }
]

export const zones: any[] = [
  { id: 1, value: 'zone1', label: 'Zona 1' },
  { id: 2, value: 'zone2', label: 'Zona 2' },
  { id: 3, value: 'zone3', label: 'Zona 3' },
  { id: 4, value: 'zone4', label: 'Zona 4' },
  { id: 5, value: 'municipio', label: 'Municipio' }
];

export const sociodemografico: any[] = [
  { id: 1, code: 'socio', value: 'edadMediaPoblacion', label: 'Edad media población' },//Edad_media_poblacion
  { id: 2, code: 'socio', value: 'mayores65', label: '% Mayores 65' },
  { id: 3, code: 'socio', value: 'menores18', label: '% Menores 18' },
  { id: 4, code: 'socio', value: 'porcHogaresUnipersonales', label: '% Hogares unipersonales' },//Porc_hogares_unipersonales
  { id: 5, code: 'socio', value: 'tamMedioHogar', label: 'Tamaño medio hogar' },//Tam_medio_hogar
  { id: 6, code: 'socio', value: 'familia', label: 'Familias' },//total_poblacion / Tam_medio_hogar o familias
  { id: 7, code: 'socio', value: 'poblacion', label: 'Población' },//total_poblacion
]

export const economicos: any[] = [
  { id: 1, code: 'eco', value: 'fueIngPensiones', label: 'Fuente de ingreso pensiones' },//Fue_de_ing_pensiones
  { id: 2, code: 'eco', value: 'porcientoDesempleo', label: '% Desempleo' },//Fue_de_ing_prestaciones_por_desempleo
  { id: 3, code: 'eco', value: 'fueIngSalario', label: 'Fuente de ingreso salario' },//Fue_de_ing_salario
  { id: 4, code: 'eco', value: 'fueIngresoOtrasPrestaciones', label: 'Fuente de ingreso otras prestaciones' },//Fue_de_ingreso_otras_prestaciones
  { id: 5, code: 'eco', value: 'fueIngresoOtrosIngresos', label: 'Fuente de ingreso otros ingresos' },//Fue_de_ingreso_otros_ingresos
  { id: 6, code: 'eco', value: 'rentaMediaHogar', label: 'Renta media por hogar' },//Renta_media_por_hogar
  { id: 7, code: 'eco', value: 'rentaMedia', label: 'Renta media por persona' },//Renta_media_por_persona
  { id: 8, code: 'eco', value: 'porPoblacionRentaMenor10000', label: '% Población renta menor que 10000' },//por_poblacion_renta_menor_10000
  { id: 9, code: 'eco', value: 'porPoblacionRentaMenor5000', label: '% Población renta menor que 5000' },//por_poblacion_renta_menor_5000
  { id: 10, code: 'eco', value: 'porPoblacionRentaMenor7500', label: '% Población renta menor que 7500' },//por_poblacion_renta_menor_7500
]

export const vivienda: any[] = [
  { id: 1, code: 'vivienda', value: 'numComercios', label: 'Número comercios' },//Num_comercios
  { id: 2, code: 'vivienda', value: 'numOficinas', label: 'Número oficinas' },//Num_oficinas
  { id: 3, code: 'vivienda', value: 'superficieMedia', label: 'Superficie media' },//Superficie_media
  { id: 4, code: 'vivienda', value: 'altuMedia', label: 'Altura media' },//altu_media
  { id: 5, code: 'vivienda', value: 'antiguedad', label: 'Antiguedad' },//antiguedad
  { id: 6, code: 'vivienda', value: 'numFincas', label: 'Número fincas' },//num_fincas
  { id: 7, code: 'vivienda', value: 'numInmuebles', label: 'Número inmuebles' },//num_inmuebles
  { id: 8, code: 'vivienda', value: 'numSegundaVivienda', label: 'Número segunda vivienda' },//num_segunda_vivienda
  { id: 9, code: 'vivienda', value: 'sumaNumViviendas', label: 'Suma número viviendas' },//suma_num_viviendas
  { id: 10, code: 'vivienda', value: 'poblacion', label: 'Población' },//total_poblacion
]

export const statisticsMenu: any[] = [
  { id: 1, value: 'socio', label: 'SOCIODEMOGRÁFICOS' },
  { id: 2, value: 'eco', label: 'ECONÓMICOS' },
  { id: 3, value: 'vivienda', label: 'VIVIENDA' },
]

