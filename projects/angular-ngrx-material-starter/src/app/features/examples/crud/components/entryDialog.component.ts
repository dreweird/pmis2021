import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { PmisService } from '../../../../core/services/pmis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './entryDialog.component.html',
  styleUrls: ['./crud.component.scss']
})
export class entryDialog implements OnInit {
  rowData: any;
  beds: number;
  entryForm: FormGroup;
  //uploader:FileUploader;
  editData;
  edit: Boolean = false;
  delete: Boolean = false;
  add: Boolean = false;
  upload: Boolean = false;
  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:5000/upload',
    allowedFileType: ['image', 'pdf'],
    itemAlias: 'myFiles'
  });

  constructor(
    public rafcService: PmisService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<entryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.add) this.add = this.data.add;
    if (this.data.delete) this.delete = this.data.delete;
    if (this.data.upload) this.upload = this.data.upload;
    console.log(this.data);
    this.editData = this.data.data;
    this.entryForm = new FormGroup({
      code: new FormControl(''),
      type: new FormControl(''),
      year: new FormControl(''),
      afc: new FormControl(''),
      province: new FormControl(''),
      municipal: new FormControl(''),
      date_conducted: new FormControl(''),
      status: new FormControl(''),
      remarks: new FormControl(''),
      deadline: new FormControl(''),
      date_submitted: new FormControl(''),
      file: new FormControl('')
    });
    if (this.data.data) {
      this.edit = true;
      this.entryForm.patchValue({
        code: this.editData.code,
        type: this.editData.type,
        year: this.editData.year,
        afc: this.editData.afc,
        province: this.editData.province,
        municipal: this.editData.municipal,
        date_conducted: this.editData.date_conducted,
        status: this.editData.status,
        remarks: this.editData.remarks,
        deadline: this.editData.deadline,
        date_submitted: this.editData.date_submitted,
        file: this.editData.file
      });
    }
  }
  ngOnInit() {
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('ImageUpload:uploaded:', item, status, response);
    };
  }

  insertDoc() {
    console.log(this.entryForm.value);
    this.rafcService.insertDoc(this.entryForm.value).subscribe(result => {
      console.log(result);
      if (result) {
        this.dialogRef.close();
        this._snackBar.open('New Document inserted', 'Ok');
        this.data.gridApi.applyTransaction({ add: [result] });
      }
    });
  }

  updateDoc() {
    this.rafcService.updateDoc(this.entryForm.value).subscribe(result => {
      if (result) {
        this.dialogRef.close();
        this._snackBar.open('Document updated', 'Ok');
        this.data.gridApi.applyTransaction({ update: [this.entryForm.value] });
      }
    });
  }

  removeDoc() {
    this.rafcService.removeDoc(this.editData.code).subscribe(result => {
      if (result) {
        this.dialogRef.close();
        this._snackBar.open('Document removed', 'Ok');
        this.data.gridApi.applyTransaction({ remove: [this.editData] });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
