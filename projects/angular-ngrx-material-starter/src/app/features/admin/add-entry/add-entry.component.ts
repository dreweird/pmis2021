import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PmisService } from '../../../core/services/pmis.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'anms-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntryComponent implements OnInit {
  entryForm: FormGroup;

  category = [
    { value: 'NFA Rice' },
    { value: 'Imported Commercial Rice' },
    { value: 'Local Commercial Rice' },
    { value: 'Corn' },
    { value: 'Fruits' },
    { value: 'Upland Vegetables' },
    { value: 'Lowland vegetables' },
    { value: 'Livestock & Poultry Products' },
    { value: 'Fishery' },
    { value: 'Spices' },
    { value: 'Other Commodities' }
  ];

  unit = [
    { value: 'kg' },
    { value: 'pc' },
    { value: 'btl' },
    { value: 'pc/btl' }
  ];

  constructor(
    private apmisService: PmisService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  createForm() {
    this.entryForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      spec: new FormControl(''),
      unit: new FormControl(''),
      tags: new FormControl(''),
      imageSrc: new FormControl('undefined.jpg')
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertCommodity() {
    this.apmisService
      .insertCommodity(this.entryForm.value)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.dialogRef.close();
          this._snackBar.open('New Commodity inserted', 'Ok', {
            duration: 2000
          });
          this.data.gridApi.applyTransaction({ add: [result] });
        }
      });
  }
}
