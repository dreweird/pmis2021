import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { MatDialog } from '@angular/material/dialog';
import { State } from '../../examples.state';
import { Book } from '../books.model';
import { actionBooksDeleteOne, actionBooksUpsertOne } from '../books.actions';
import { selectSelectedBook, selectAllBooks } from '../books.selectors';
import { entryDialog } from '../components/entryDialog.component';
import { PmisService } from '../../../../core/services/pmis.service';
import { ActionComponent } from './action.component';
// import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';

@Component({
  selector: 'anms-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  bookFormGroup = this.fb.group(CrudComponent.createBook());
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));
  selectedBook$: Observable<Book> = this.store.pipe(select(selectSelectedBook));

  isEditing: boolean;

  gridApi;
  gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData;
  frameworkComponents;
  context;
  rowSelection;
  //  public modules: Module[] = AllCommunityModules;

  static createBook(): Book {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: ''
    };
  }

  constructor(
    public store: Store<State>,
    public fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public Rafcservice: PmisService,
    private cd: ChangeDetectorRef
  ) {
    this.Rafcservice.getAllDoc().subscribe(data => {
      console.log(data);
      this.rowData = data;
      this.cd.markForCheck();
    });
    this.columnDefs = [
      {
        headerName: 'CODE',
        field: 'code',
        width: 180,
        filter: 'agTextColumnFilter',
        pinned: 'left'
      },
      {
        headerName: 'Doc Type',
        field: 'type',
        width: 180
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 90,
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'AFC',
        field: 'afc',
        width: 140
      },
      {
        headerName: 'HUC/PROVINCE',
        field: 'province',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'CITY/MUNICIPALITY',
        field: 'municipal',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Date of Conduct',
        field: 'date_conducted',
        width: 180,
        filter: 'agTextColumnFilter',
        cellRenderer: data => {
          return data.value ? new Date(data.value).toLocaleDateString() : '';
        }
      },
      {
        headerName: 'Status of Document',
        field: 'status',
        width: 140
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        width: 180
      },
      {
        headerName: 'Date Submitted to PCAF',
        field: 'date_submitted',
        width: 180,
        filter: 'agTextColumnFilter',
        cellRenderer: data => {
          return data.value ? new Date(data.value).toLocaleDateString() : '';
        }
      },
      {
        headerName: 'Actions',
        width: 270,
        cellRendererFramework: ActionComponent
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    };
    this.context = { componentParent: this };
    this.rowSelection = 'single';
    this.frameworkComponents = {
      actionComponent: ActionComponent
    };
  }

  select(book: Book) {
    this.isEditing = false;
    this.router.navigate(['examples/crud', book.id]);
  }

  deselect() {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(book: Book) {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  addNew() {
    this.bookFormGroup.reset();
    this.bookFormGroup.setValue(CrudComponent.createBook());
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete(book: Book) {
    this.store.dispatch(actionBooksDeleteOne({ id: book.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  getRowNodeId(data) {
    return data.code;
  }

  save() {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(actionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', book.id]);
    }
  }

  methodFromParentUpload(cell) {
    this.dialog.open(entryDialog, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, data: cell, upload: true }
    });
  }

  methodFromParentDelete(cell) {
    this.dialog.open(entryDialog, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, data: cell, delete: true }
    });
  }

  methodFromParentEdit(cell) {
    this.dialog.open(entryDialog, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, data: cell, add: true }
    });
  }

  openDialog() {
    this.dialog.open(entryDialog, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, add: true }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
