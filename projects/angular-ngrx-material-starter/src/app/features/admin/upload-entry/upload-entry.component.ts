import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Inject
} from '@angular/core';
import { PmisService } from '../../../core/services/pmis.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'anms-upload-entry',
  templateUrl: './upload-entry.component.html',
  styleUrls: ['./upload-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadEntryComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];

  constructor(
    public apmisService: PmisService,
    public dialogRef: MatDialogRef<UploadEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    console.log(data);
  }

  updatePhoto(file) {
    this.apmisService
      .updateCommodity(file.id, 'imageSrc', file.imageSrc)
      .subscribe(result => {
        console.log(result);
        if (result) {
          this.dialogRef.close();
          this._snackBar.open('New Photo Uploaded Successfully', 'Ok', {
            duration: 2000
          });
        }
      });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.apmisService
      .upload(formData)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          let file = {
            imageSrc: event.body.file_name,
            id: this.data.id
          };
          this.updatePhoto(file);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onUpload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      console.log(fileUpload.files.length);
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
        //  console.log(this.files);
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
