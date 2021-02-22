import {
  Component,
  Inject,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PmisService } from '../../../core/services/pmis.service';
import { MatSelect } from '@angular/material/select';

import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title *ngIf="add">ADD OBJECT</h2>
    <h2 mat-dialog-title *ngIf="edit">EDIT or DELETE OBJECT</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <p *ngIf="edit">Old value: {{ selectedItem }}</p>
        <p>
          <mat-form-field>
            <mat-select
              placeholder="Select Object"
              [formControl]="objectCtrl"
              required
              #singleSelect
            >
              <mat-option>
                <ngx-mat-select-search
                  [formControl]="objectFilterCtrl"
                  placeholderLabel="Find Object Code..."
                  noEntriesFoundLabel="'No Matching Found'"
                ></ngx-mat-select-search>
              </mat-option>

              <mat-option
                *ngFor="let object of filteredObjects | async"
                [value]="object"
              >
                {{ object.object_id }} - {{ object.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </p>

        <p class="submitButtons" *ngIf="add">
          <button (click)="insert()" color="primary" mat-raised-button>
            ADD
          </button>
        </p>
      </form>
      <p class="submitButtons" *ngIf="edit">
        <button (click)="remove()" color="warn" mat-raised-button>
          DELETE
        </button>
        <button (click)="update()" color="accent" mat-raised-button>
          EDIT
        </button>
      </p>
    </mat-dialog-content>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 800px;
      }
      .mat-form-field {
        width: 100%;
        min-width: 500px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .submitButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `
  ]
})
export class AddObjectDialogComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('singleSelect') singleSelect: MatSelect;
  protected object: Object[];
  public objectFilterCtrl: FormControl = new FormControl();
  public objectCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  user: any;
  edit: false;
  add: false;
  selectedItem: any;

  public filteredObjects: ReplaySubject<Object[]> = new ReplaySubject<Object[]>(
    1
  );

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit() {
    this.objectFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterObjects();
      });
  }

  protected filterObjects() {
    if (!this.object) {
      return;
    }
    // get the search keyword
    let search = this.objectFilterCtrl.value;
    if (!search) {
      this.filteredObjects.next(this.object.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredObjects.next(
      this.object.filter(
        object =>
          object.name.toLowerCase().indexOf(search) > -1 ||
          object.object_id.indexOf(search) > -1
      )
    );
  }

  protected setInitialValue() {
    this.filteredObjects
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Object, b: Object) =>
          a && b && a.object_id === b.object_id;
      });
  }

  constructor(
    public dialogRef: MatDialogRef<AddObjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mfoService: PmisService,
    private _snackBar: MatSnackBar
  ) {
    // console.log(data);
    if (this.data.edit) {
      this.edit = data.edit;
      this.selectedItem = this.data.data.name;
      // console.log([this.data.data.name]);
    }
    if (this.data.add) this.add = data.add;

    this.mfoService.getObjectCode().subscribe((result: any) => {
      //  console.log(result);
      this.object = result;
    });
  }

  form: FormGroup = new FormGroup({
    object: new FormControl('')
  });

  insert() {
    if (this.form.valid) {
      this.mfoService
        .addObject(
          this.data.data.mfo_id,
          this.objectCtrl.value.object_id,
          this.data.pid
        )
        .subscribe((res: any) => {
          this.data.gridApi.applyTransaction({
            add: [
              {
                id: res.id,
                mfo_id: this.data.data.mfo_id,
                object_id: this.objectCtrl.value.object_id,
                name: this.objectCtrl.value.name,
                mfo_name: this.data.data.mfo_name,
                header_main: this.data.data.header_main,
                header_program: this.data.data.header_program,
                header_mfo: this.data.data.header_mfo,
                header_indicator: this.data.data.header_indicator,
                header_subindicator: this.data.data.header_subindicator,
                budget: 0,
                adjustment: 0,
                adjusted: 0,
                jan: 0,
                feb: 0,
                mar: 0,
                apr: 0,
                may: 0,
                jun: 0,
                jul: 0,
                aug: 0,
                sep: 0,
                oct: 0,
                nov: 0,
                decm: 0
              }
            ]
          });
          this.data.gridApi.redrawRows(); // create the row again from scratch
          this._snackBar.open('Object code inserted successfully', 'Ok', {
            duration: 2000
          });
          this.dialogRef.close();
        });
    }
  }

  update() {
    if (this.form.valid) {
      let text = `Are you sure you want to update from ${this.selectedItem} to ${this.objectCtrl.value.name}?`;
      var r = confirm(text);
      if (r == true) {
        this.mfoService
          .updateAllotment(
            'object_id',
            this.objectCtrl.value.object_id,
            this.data.data.id
          )
          .subscribe(data => {
            if (data) {
              console.log(data);
              this.data.data.name = this.objectCtrl.value.name;
              this.data.gridApi.applyTransaction({
                update: [this.data.data]
              });
              this.data.gridApi.redrawRows(); // create the row again from scratch
              this._snackBar.open('Object code updated successfully', 'Ok', {
                duration: 2000
              });
            }
          });
        this.dialogRef.close();
      } else {
      }
    }
  }

  remove() {
    let text = `Are you sure you want to remove this object code:  ${this.selectedItem}?`;
    var r = confirm(text);
    if (r == true) {
      this.mfoService.removeObject(this.data.data.id).subscribe(res => {
        if (res) {
          this.data.gridApi.applyTransaction({
            remove: [this.data.data]
          });
          this.data.gridApi.redrawRows(); // create the row again from scratch
          this._snackBar.open('Object code removed successfully', 'Ok', {
            duration: 2000
          });
        }
      });

      this.dialogRef.close();
    } else {
    }
  }
}

export interface Object {
  object_id: string;
  name: string;
}
