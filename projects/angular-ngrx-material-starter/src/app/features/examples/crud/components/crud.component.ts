import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { MatDialog } from '@angular/material/dialog';
import { State } from '../../examples.state';
import { Book } from '../books.model';
import { actionBooksDeleteOne, actionBooksUpsertOne } from '../books.actions';
import { selectSelectedBook, selectAllBooks } from '../books.selectors';
import { entryDialog } from '../components/entryDialog.component';

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

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  rowData = [
    {
      code: '02-2K19-HOM-RAFC-0001',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0002',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0003',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0004',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0005',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0006',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0007',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0008',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0009',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-00010',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0011',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    },
    {
      code: '02-2K19-HOM-RAFC-0012',
      year: 2019,
      afc: 'RAFC',
      huc_prov: '',
      mun: '',
      date_conduct: '01/01/2020',
      doc_type: 'Highlights of Meeting',
      status: 'Submitted to PCAF',
      date_rec: '03/26/2019',
      date_pcaf: '03/26/2019',
      file: 'file'
    }
  ];

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
    public dialog: MatDialog
  ) {
    this.columnDefs = [
      {
        headerName: 'CODE',
        field: 'code',
        width: 180,
        filter: 'agTextColumnFilter'
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
        field: 'huc_prov',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'CITY/MUNICIPALITY',
        field: 'mun',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Date of Conduct',
        field: 'date_conduct',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Document Type',
        field: 'doc_type',
        width: 140
      },
      {
        headerName: 'Status of Document',
        field: 'status',
        width: 140
      },
      {
        headerName: 'Date Received',
        field: 'date_rec',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'Date to PCAF',
        field: 'date_pcaf',
        width: 180,
        filter: 'agTextColumnFilter'
      },
      {
        headerName: 'File',
        field: 'file',
        width: 140
      }
    ];
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
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

  save() {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(actionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', book.id]);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(entryDialog, {
      minWidth: '50vh',
      //height: '70vh',
      disableClose: true
      // data: event.data
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
