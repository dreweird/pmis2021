import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PmisService } from '../../../core/services/pmis.service';
import { Document } from '../../../core/services/document';
import { Observable } from 'rxjs';
import { PDFSource } from 'ng2-pdf-viewer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'anms-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent implements OnInit {
  // @Input() data: Observable<any>;
  doc: Object;
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc: string | PDFSource | ArrayBuffer = '';
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

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

  loadPdf(url) {
    this.pdfSrc = url;
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.responseType = 'blob';
    // xhr.onload = (e: any) => {
    //   if (xhr.status === 200) {
    //     const blob = new Blob([xhr.response], { type: 'application/pdf' });
    //    this.pdfSrc = URL.createObjectURL(blob);
    //     let u = this.dom.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    //     console.log(u);
    //     this.cd.markForCheck();
    //   }
    // };

    // xhr.send();
  }

  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        this.cd.markForCheck();
        console.log(e.target.result);
      };
      console.log($img.files[0]);
      reader.readAsArrayBuffer($img.files[0]);
    }
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docService: PmisService,
    private cd: ChangeDetectorRef,
    private dom: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getDocument();
    // this.docService.getPDF()
  }

  getDocument(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.docService.findDoc(id).subscribe(result => {
      this.doc = result;
      this.cd.markForCheck();
      console.log(result);
    });
  }
}
