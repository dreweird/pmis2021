import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PmisService } from '../../../core/services/pmis.service';

import { PDFSource } from 'ng2-pdf-viewer';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'anms-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit {
  doc: Object;
  files: Array<any>;
  code: String;
  pdfSrc: string | PDFSource | ArrayBuffer = '';
  imgSrc: String;
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  isImage: boolean = false;
  isPDF: boolean = false;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  loadPdf(file_name) {
    let url = 'http://localhost:4200/assets/' + file_name;
    let extension = url.split('.').pop();
    if (extension === 'pdf') {
      this.isPDF = true;
      this.isImage = false;
      this.pdfSrc = url;
    } else {
      this.isImage = true;
      this.isPDF = false;
      this.imgSrc = url;
    }
  }

  delete(f, index) {
    const dialogRef = this.dialog.open(DetachedFileDialog, {
      minWidth: '50vh',
      data: { file: f, index: index, files: this.files }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.files.splice(index, 1);
        this.cd.markForCheck();
        this._snackBar.open('Detached files successfully', 'Ok', {
          duration: 2000
        });
      }
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.code = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDocument(this.code);
    this.findFiles(this.code);
  }

  findFiles(code) {
    this.docService.findFiles(code).subscribe((result: any) => {
      this.files = result;
      this.cd.markForCheck();
      console.log(result);
    });
  }

  getDocument(code): void {
    this.docService.findDoc(code).subscribe(result => {
      this.doc = result;
      this.cd.markForCheck();
      console.log(result);
    });
  }
}

@Component({
  template: `
    <h3 mat-dialog-title>Detached File</h3>
    <div mat-dialog-content>
      <p>
        Are you sure you want to detached file with filename
        <b> {{ data.file.file_name }}</b
        >? This action is irreversible.
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button (click)="detached()" mat-button>Detached</button>
    </div>
  `
})
export class DetachedFileDialog {
  constructor(
    public dialogRef: MatDialogRef<DetachedFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private docService: PmisService
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  detached() {
    this.docService.detachedFile(this.data.file.id).subscribe((result: any) => {
      if (result.success) {
        this.dialogRef.close(true);
      }
    });
  }
}
