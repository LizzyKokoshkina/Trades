import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TradesComponent } from '../modules/trades/trades.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageTradesComponent } from '../modules/manage-trades/manage-trades.component';
import { ManageTradeService } from '../modules/manage-trades/manage-trades.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ChartComponent } from '../modules/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartService } from '../modules/chart/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    TradesComponent,
    ManageTradesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    NgxChartsModule
  ],
  providers: [
    ManageTradeService,
    ChartService
  ],
  entryComponents: [
    ManageTradesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
