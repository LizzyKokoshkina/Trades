import { Component } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { ChartService } from './chart.service';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
    trades = {};
    view: [number, number] = [700, 400];
    legend: boolean = true;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Date';
    yAxisLabel: string = 'Profit';
    timeline: boolean = true;

    schemeType = ScaleType.Ordinal;
    colorScheme = {
        name: '',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['blue']
    };

    constructor(private chartService: ChartService) {
        this.chartService.series$?.subscribe((trades: Array<Object>) => {
            this.trades = trades;
        });
        this.view = [innerWidth / 1.3, 400];
    }
}