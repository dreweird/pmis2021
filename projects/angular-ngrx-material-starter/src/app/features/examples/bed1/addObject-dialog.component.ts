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

/**
 * The dialog will close with true if user clicks the ok button,
 * otherwise it will close with undefined.
 */
@Component({
  template: `
    <h2 mat-dialog-title>ADD OBJECT</h2>
    <mat-dialog-content>
      <form [formGroup]="form" (ngSubmit)="submit()">
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

        <p class="submitButtons">
          <button type="submit" color="primary" mat-button>ADD</button>
        </p>
      </form>
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
    private mfoService: PmisService
  ) {
    console.log(data);

    this.mfoService.getObjectCode().subscribe((result: any) => {
      console.log(result);
      this.object = result;
    });
  }

  form: FormGroup = new FormGroup({
    object: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.data.data.mfo_id, this.objectCtrl.value.object_id);
      this.mfoService
        .addObject(
          this.data.data.mfo_id,
          this.objectCtrl.value.object_id,
          this.data.pid
        )
        .subscribe(lastId => {
          console.log(lastId);
          this.data.gridApi.updateRowData({
            add: [
              {
                id: lastId,
                mfo_id: this.data.data.mfo_id,
                object_id: this.objectCtrl.value.object_id,
                name: this.objectCtrl.value.name,
                mfo_name: this.data.data.mfo_name,
                header_main: this.data.data.header_main,
                header_program: this.data.data.header_program,
                header_mfo: this.data.data.header_mfo,
                header_indicator: this.data.data.header_indicator,
                header_subindicator: this.data.data.header_subindicator,
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
          this.dialogRef.close();
        });
    }
  }
}

export interface Object {
  object_id: string;
  name: string;
}
