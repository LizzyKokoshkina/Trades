import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ManageTradeService } from '../manage-trades/manage-trades.service';
import { Trade } from './trade';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ChartService } from '../chart/chart.service';

@Component({
    selector: 'trades',
    templateUrl: './trades.component.html',
    styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements AfterViewInit {
    displayedColumns: string[] = ['entryPrice', 'entryDate', 'exitPrice', 'exitDate', 'profit', 'update', 'delete'];
    TRADES: Trade[] = [
        { entryPrice: 20, entryDate: new Date("01-12-2020"), exitPrice: 156, exitDate: new Date("01-22-2020") },
        { entryPrice: 15, entryDate: new Date("01-12-2019"), exitPrice: 110, exitDate: new Date("01-15-2019") },
        { entryPrice: 16, entryDate: new Date("05-09-2020"), exitPrice: 67, exitDate: new Date("06-01-2020") },
        { entryPrice: 190, entryDate: new Date("04-08-2020"), exitPrice: 800, exitDate: new Date("04-09-2020") },
        { entryPrice: 9, entryDate: new Date("02-13-2020"), exitPrice: 79, exitDate: new Date("02-15-2020") },
        { entryPrice: 19, entryDate: new Date("01-10-2020"), exitPrice: 200, exitDate: new Date("01-22-2020") },
        { entryPrice: 10, entryDate: new Date("11-02-2020"), exitPrice: 100, exitDate: new Date("11-05-2020") },
    ];
    dataSource = new MatTableDataSource<Trade>(this.TRADES);
    datePipe = new DatePipe('en-US');
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(private manageTradeService: ManageTradeService,
        private chartService: ChartService) { }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.setData();
    }

    openModal(): void {
        this.manageTradeService.openDialog(new Trade()).subscribe((trade: Trade) => {
            if (trade) {
                this.TRADES.push(trade);
                this.updateTable();
                this.setData();
            }
        });
    }

    update(element: Trade): void {
        this.manageTradeService.openDialog(element).subscribe((trade: Trade) => {
            if (trade) {
                this.TRADES[this.TRADES.indexOf(element)] = trade;
                this.updateTable();
                this.setData();
            }
        });

    }

    delete(element: Trade): void {
        this.TRADES = this.TRADES.filter(i => i !== element);
        this.updateTable();
        this.setData();
    }

    updateTable(): void {
        this.dataSource = new MatTableDataSource<Trade>(this.TRADES);
        this.dataSource.paginator = this.paginator;
    }

    setData(): void {
        this.chartService.setData([{
            "name": "Profit",
            "series": this.TRADES.sort((a: Trade, b: Trade) => {
                return a.exitDate.getTime() - b.exitDate.getTime();
            }).map((x: Trade) => {

                return {
                    'value': x.exitPrice - x.entryPrice,
                    'name': this.datePipe.transform(x.exitDate, 'dd-MM-yyyy')
                };
            })
        }]);
    }
}