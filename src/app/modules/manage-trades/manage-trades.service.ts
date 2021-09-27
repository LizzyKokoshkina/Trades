import { Injectable } from '@angular/core';
import { ManageTradesComponent } from './manage-trades.component';
import { Trade } from '../trades/trade';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable()

export class ManageTradeService {

    constructor(
        public dialog: MatDialog
    ) { }

    openDialog(trade: Trade): Observable<Trade> {
        const dialogRef = this.dialog.open(ManageTradesComponent, {
            width: '100%',
            maxWidth: '500px'
        });

        dialogRef.componentInstance.trade = trade;
        return dialogRef.afterClosed();
    }

}