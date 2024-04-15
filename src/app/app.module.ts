import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MicservEstimadorComponent, NgbdSortableHeader } from './micserv-estimador/micserv-estimador.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { SimpleChartComponent } from './graficos/simple-chart/simple-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizonGroupChartComponent } from './graficos/horizon-group-chart/horizon-group-chart.component';
import { VerticGroupChartComponent } from './graficos/vertic-group-chart/vertic-group-chart.component';
import { HorizChartComponent } from './graficos/horiz-chart/horiz-chart.component';
import { HrzontGroupConfigChartComponent } from './graficos/hrzont-group-config-chart/hrzont-group-config-chart.component';
import { VertGroupRentaChartComponent } from './graficos/vert-group-renta-chart/vert-group-renta-chart.component';
import { PieRentaChartComponent } from './graficos/pie-renta-chart/pie-renta-chart.component';
import { PieViviendChartComponent } from './graficos/pie-viviend-chart/pie-viviend-chart.component';
import { HrizntViviendChartComponent } from './graficos/hriznt-viviend-chart/hriznt-viviend-chart.component';
import { HrizntViviend2ChartComponent } from './graficos/hriznt-viviend2-chart/hriznt-viviend2-chart.component';
import { VerticViviendChartComponent } from './graficos/vertic-viviend-chart/vertic-viviend-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PieEchartComponent } from './graficos/pie-echart/pie-echart.component';
import { HorizChartPorcComponent } from './graficos/horiz-chart-porc/horiz-chart-porc.component';
import { AppHrzontGroupNotporcChartComponent } from './graficos/app-hrzont-group-notporc-chart/app-hrzont-group-notporc-chart.component';
import { LineEchartComponent } from './graficos/line-echart/line-echart.component';
import { BarEchartComponent } from './graficos/bar-echart/bar-echart.component';
import { BarHrzEchartComponent } from './graficos/bar-hrz-echart/bar-hrz-echart.component';
import { LoginComponent } from './login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SaveProjectComponent } from './save-project/save-project.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { OpenExplorerComponent } from './open-explorer/open-explorer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StatisticsComponent } from './statistics/statistics.component';
import { IndicatorComponent } from './indicator/indicator.component';

import { PowerbiClientComponent } from './powerbi-client/powerbi-client.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { BarHrzEchartCopyComponent } from './graficos/bar-hrz-echart-copy/bar-hrz-echart-copy.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotifyModule } from 'ngx-notify';
import { CreateEditUserComponent } from './manage-user/create-edit-user/create-edit-user.component';
import { UsersComponent } from './manage-user/users.component';
import { ChangePasswordComponent } from './manage-user/change-password/change-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { AuthGuard } from './guard/auth.guard';
import { LostPasswordComponent } from './manage-user/lost-password/lost-password.component';
import { ResetUserComponent } from './manage-user/reset-user/reset-user.component';
//import { AuthInterceptor } from './auth.interceptor';

/*const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: '_home', component: AppComponent},
  {path: '', component: MicservEstimadorComponent},
  {path: '**', component: MicservEstimadorComponent},
];*/
/*const routes: Route[] = [ 
  {path: 'login', component: LoginComponent},
  {path: 'home', component: MicservEstimadorComponent},
  {path: '', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
]; */      

@NgModule({
  declarations: [
    AppComponent,
    MicservEstimadorComponent,
    SimpleChartComponent,
    HorizonGroupChartComponent,
    VerticGroupChartComponent,
    HorizChartComponent,
    HrzontGroupConfigChartComponent,
    VertGroupRentaChartComponent,
    PieRentaChartComponent,
    PieViviendChartComponent,
    HrizntViviendChartComponent,
    HrizntViviend2ChartComponent,
    VerticViviendChartComponent,
    PieEchartComponent,
    HorizChartPorcComponent,
    AppHrzontGroupNotporcChartComponent,
    LineEchartComponent,
    BarEchartComponent,
    BarHrzEchartComponent,
    LoginComponent,
    SaveProjectComponent,
    NewFolderComponent,
    OpenExplorerComponent,
    StatisticsComponent,
    IndicatorComponent,
    PowerbiClientComponent,
    BarHrzEchartCopyComponent,
    NgbdSortableHeader,
    CreateEditUserComponent,
    UsersComponent,
    ChangePasswordComponent,
    NotFoundComponent,
    NavBarComponent,
    LostPasswordComponent,
    ResetUserComponent 
  ],
  imports: [
    BrowserModule,
    //RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    NgSelectModule,
    PowerBIEmbedModule,
    NgxPaginationModule,
    NgbModule,
    NotifyModule.forRoot({
      options: { },
      notify: {
          progress: true
      }
  }),
  AppRoutingModule

  ],
  providers: [AuthGuard/*,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}*/],
  entryComponents: [SaveProjectComponent, NewFolderComponent, OpenExplorerComponent, PowerbiClientComponent, UsersComponent, CreateEditUserComponent, ChangePasswordComponent, LostPasswordComponent, ResetUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
