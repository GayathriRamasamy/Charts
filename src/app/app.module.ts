import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { LifeCycleComponent } from './life-cycle/life-cycle.component';
import { BubbleChart1Component } from './bubble-chart1/bubble-chart1.component';
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    BubbleChartComponent,
    LifeCycleComponent,
    BubbleChart1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,BubbleChart1Component]
})
export class AppModule { }
