import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PmisService } from '../../../core/services/pmis.service';

@Component({
  selector: 'anms-add-year',
  templateUrl: './add-year.component.html',
  styleUrls: ['./add-year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddYearComponent implements OnInit {
  area = [
    { value: 'Butuan City' },
    { value: 'Agusan del Norte' },
    { value: 'Agusan del Sur' },
    { value: 'Surigao del Norte' },
    { value: 'Surigao del Sur' },
    { value: 'Dinagat Islands' }
  ];

  month = [
    { value: 'January' },
    { value: 'February' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
    { value: 'August' },
    { value: 'September' },
    { value: 'October' },
    { value: 'November' },
    { value: 'December' }
  ];
  entryForm: any;
  commodity: [{ id: number; name: string; imageSrc: string }];

  constructor(
    private apmisService: PmisService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddYearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commodity = data.commodity;
    console.log(this.commodity);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.entryForm = new FormGroup({
      commodity_id: new FormControl(''),
      area: new FormControl(''),
      month: new FormControl(''),
      price_id: new FormControl(145), //primary last id insert should return in the server
      price1: new FormControl(0),
      low1: new FormControl(0),
      high1: new FormControl(0),
      price2: new FormControl(0),
      low2: new FormControl(0),
      high2: new FormControl(0),
      price3: new FormControl(0),
      low3: new FormControl(0),
      high3: new FormControl(0),
      date: new FormControl(''),
      name: new FormControl('')
    });
  }

  insertRow() {
    this.entryForm.value.name = this.commodity.find(
      (x: any) => x.id === this.entryForm.value.commodity_id
    ).name;
    console.log(this.entryForm.value);
    this.apmisService
      .insertPriceRow(this.entryForm.value)
      .subscribe((result: any) => {
        if (result) {
          result = { ...this.entryForm.value, price_id: result.price_id };
          console.log(result);
          this.dialogRef.close();
          this._snackBar.open('New Row inserted', 'Ok', {
            duration: 2000
          });
          this.data.gridApi.applyTransaction({ add: [result] });
          this.data.gridApi.redrawRows(); // create the row again from scratch
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
