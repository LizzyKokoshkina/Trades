import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trade } from '../trades/trade';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'manage-trades',
    templateUrl: './manage-trades.component.html',
    styleUrls: ['./manage-trades.component.scss']
})
export class ManageTradesComponent implements OnInit {
    tradeForm = new FormGroup({
        entryPrice: new FormControl('', [Validators.required, Validators.min(0)]),
        entryDate: new FormControl('', [Validators.required]),
        exitDate: new FormControl('', [Validators.required]),
        exitPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    trade = new Trade();

    constructor(public dialogRef: MatDialogRef<ManageTradesComponent>) { }

    ngOnInit(): void {
        this.tradeForm.patchValue({
            entryPrice: this.trade.entryPrice,
            entryDate: this.trade.entryDate,
            exitDate: this.trade.exitDate,
            exitPrice: this.trade.exitPrice,
        });

        this.tradeForm.controls.entryDate.valueChanges.subscribe(value => {
            if (this.tradeForm.controls.exitDate.value && value > this.tradeForm.controls.exitDate.value) {
                //error
                this.tradeForm.controls.entryDate.setErrors({ 'badValue': true });
            }

        });
        this.tradeForm.controls.exitDate.valueChanges.subscribe(value => {
            if (this.tradeForm.controls.entryDate.value && value < this.tradeForm.controls.entryDate.value) {
                //error

                this.tradeForm.controls.exitDate.setErrors({ 'badValue': true });
            }

        });
    }

    save(): void {
        if (this.tradeForm.valid) {
            this.trade.entryPrice = this.tradeForm.controls.entryPrice.value;
            this.trade.entryDate = this.tradeForm.controls.entryDate.value;
            this.trade.exitDate = this.tradeForm.controls.exitDate.value;
            this.trade.exitPrice = this.tradeForm.controls.exitPrice.value;
            return this.dialogRef.close(this.trade);
        }
    }
}
