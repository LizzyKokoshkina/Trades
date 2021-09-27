import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ChartService {
    series$: Observable<Array<Object>> | undefined;
    series: BehaviorSubject<Array<Object>> | undefined;

    constructor() {
        this.series = new BehaviorSubject<Array<Object>>([]);
        this.series$ = this.series.asObservable();
    }

    setData(trades: Array<Object>): void {
        this.series?.next(trades);
    }
}