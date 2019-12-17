import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyComponent } from './currency/currency.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';

import { CytoscapeModule} from 'ngx-cytoscape';
import * as cytoscape from 'cytoscape';
import { NgSelectModule } from 'ng-custom-select';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CytoscapeModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
