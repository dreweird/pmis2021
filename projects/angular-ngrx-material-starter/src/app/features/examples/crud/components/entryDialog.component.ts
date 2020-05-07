import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h3 mat-dialog-title>Add Document</h3>
    <div mat-dialog-content>
      <mat-form-field class="col-md-6">
        <mat-label>Document Type</mat-label>
        <mat-select required>
          <mat-option value="audi">Highlights of Meeting</mat-option>
          <mat-option value="audi">Resolution</mat-option>
          <mat-option value="audi">Organizational Profile</mat-option>
          <mat-option value="audi">Member Profile</mat-option>
          <mat-option value="audi">Activity Design</mat-option>
          <mat-option value="audi">Incomming Documents</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Year</mat-label>
        <mat-select required>
          <mat-option value="audi">2020</mat-option>
          <mat-option value="audi">2019</mat-option>
          <mat-option value="audi">2018</mat-option>
          <mat-option value="audi">2017</mat-option>
          <mat-option value="audi">2016</mat-option>
          <mat-option value="audi">2015</mat-option>
          <mat-option value="audi">2014</mat-option>
          <mat-option value="audi">2013</mat-option>
          <mat-option value="audi">2012</mat-option>
          <mat-option value="audi">2011</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>AFC</mat-label>
        <mat-select required>
          <mat-option value="audi">RAFC</mat-option>
          <mat-option value="audi">HUCAFC/PAFC</mat-option>
          <mat-option value="audi">CAFC</mat-option>
          <mat-option value="audi">MAFC</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Provice</mat-label>
        <mat-select required>
          <mat-option value="audi">Agusan del Norte</mat-option>
          <mat-option value="audi">Agusan del Sur</mat-option>
          <mat-option value="audi">Surigao del Norte</mat-option>
          <mat-option value="audi">Surigao del Sur</mat-option>
          <mat-option value="audi">Province of Dinagat Islands</mat-option>
          <mat-option value="audi">Butuan City</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Municipality</mat-label>
        <mat-select required>
          <mat-option value="audi">Bayugan City</mat-option>
          <mat-option value="audi">Bunawan</mat-option>
          <mat-option value="audi">Esperanza</mat-option>
          <mat-option value="audi">San Francisco</mat-option>
          <mat-option value="audi">San Luis</mat-option>
          <mat-option value="audi">Sta. Josefa</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Date of Conduct</mat-label>
        <input matInput [matDatepicker]="picker1" />
        <mat-datepicker-toggle
          matSuffix
          [for]="picker1"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker1></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Status of Document</mat-label>
        <mat-select required>
          <mat-option value="audi">Funded</mat-option>
          <mat-option value="audi">Non-Funded</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="col-md-6">
        <mat-label>Remarks</mat-label>
        <input matInput />
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Deadline</mat-label>
        <input matInput [matDatepicker]="picker" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="col-md-3">
        <mat-label>Date Submitted to PCAF</mat-label>
        <input matInput [matDatepicker]="picker3" />
        <mat-datepicker-toggle
          matSuffix
          [for]="picker3"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker3></mat-datepicker>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button cdkFocusInitial>Save</button>
    </div>
  `,
  styleUrls: ['./crud.component.scss']
})
export class entryDialog implements OnInit {
  rowData: any;
  beds: number;

  constructor(
    public dialogRef: MatDialogRef<entryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('data', this.data);
  }
  ngOnInit() {
    //console.log(this.data.beds);
    console.log('here');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
