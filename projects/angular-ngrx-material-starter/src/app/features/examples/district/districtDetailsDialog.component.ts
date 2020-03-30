import { Component, Input, OnInit, Inject } from '@angular/core';
import { PmisService } from '../../../core/services/pmis.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { concat } from 'rxjs/operators';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  template: `
    <mat-dialog-content>
      <div class="container">
        <button class="topcorner" mat-raised-button (click)="onNoClick()">
          <fa-icon icon="times"></fa-icon>
        </button>

        <h2 mat-dialog-title>{{ data.mfo_name }}</h2>

        <ag-grid-angular
          style="width: 100%; height: 400px;"
          class="ag-theme-balham"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
          (cellValueChanged)="onCellValueChanged($event)"
          (gridReady)="onGridReady($event)"
        >
        </ag-grid-angular>

        <pre style="background-color: #FFFF00">
Please note that the data in the main table will be synced after you refresh the page.</pre
        >
      </div>
    </mat-dialog-content>
  `,
  styleUrls: ['./district.component.css']
})
export class districtDetailsDialog implements OnInit {
  gridApi: any;
  rowData: any;
  user: any;
  edit: any;

  columnDefs = [
    { headerName: 'Province', field: 'province', width: 150, pinned: 'left' },
    { headerName: 'Municipal', field: 'municipal', width: 150, pinned: 'left' },
    { headerName: 'Target', field: 'target', width: 100 },
    {
      headerName: 'Accomplishment',
      children: [
        {
          headerName: 'Jan',
          field: 'jan',
          width: 70,
          editable: params => {
            if (params.data.q_1 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Feb',
          field: 'feb',
          width: 70,
          editable: params => {
            if (params.data.q_1 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Mar',
          field: 'mar',
          width: 70,
          editable: params => {
            if (params.data.q_1 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Q1',
          width: 70,
          cellStyle: { color: 'white', 'background-color': '#5472d3' },
          valueGetter: 'Number(data.jan) + Number(data.feb) + Number(data.mar)'
        },
        {
          headerName: 'Apr',
          field: 'apr',
          width: 70,
          editable: params => {
            if (params.data.q_2 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'May',
          field: 'may',
          width: 70,
          editable: params => {
            if (params.data.q_2 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Jun',
          field: 'jun',
          width: 70,
          editable: params => {
            if (params.data.q_2 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Q2',
          width: 70,
          cellStyle: { color: 'white', 'background-color': '#5472d3' },
          valueGetter: 'Number(data.apr) + Number(data.may) + Number(data.jun)'
        },
        {
          headerName: 'Jul',
          field: 'jul',
          width: 70,
          editable: params => {
            if (params.data.q_3 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Aug',
          field: 'aug',
          width: 70,
          editable: params => {
            if (params.data.q_3 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Sep',
          field: 'sep',
          width: 70,
          editable: params => {
            if (params.data.q_3 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Q3',
          width: 70,
          cellStyle: { color: 'white', 'background-color': '#5472d3' },
          valueGetter: 'Number(data.jul) + Number(data.aug) + Number(data.sep)'
        },
        {
          headerName: 'Oct',
          field: 'oct',
          width: 70,
          editable: params => {
            if (params.data.q_4 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Nov',
          field: 'nov',
          width: 70,
          editable: params => {
            if (params.data.q_4 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Dec',
          field: 'dece',
          width: 70,
          editable: params => {
            if (params.data.q_4 && this.edit) return true;
            else return false;
          }
        },
        {
          headerName: 'Q4',
          width: 70,
          cellStyle: { color: 'white', 'background-color': '#5472d3' },
          valueGetter: 'Number(data.oct) + Number(data.nov) + Number(data.dece)'
        },
        {
          headerName: 'Total',
          field: 'total',
          width: 100,
          cellStyle: { 'background-color': 'yellow' },
          valueGetter:
            'Number(data.jan) + Number(data.feb) + Number(data.mar) + Number(data.apr) + Number(data.may) + Number(data.jun) + Number(data.jul) + Number(data.aug) + Number(data.sep) + Number(data.oct) + Number(data.nov) + Number(data.dece)'
        }
      ]
    },
    {
      headerName: 'Remarks',
      children: [
        {
          headerName: 'Q1',
          field: 'q1',
          width: 70,
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          maxLength: 500,
          cols: 40,
          rows: 5
        },
        {
          headerName: 'Q2',
          field: 'q2',
          width: 70,
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          maxLength: 500,
          cols: 40,
          rows: 5
        },
        {
          headerName: 'Q3',
          field: 'q3',
          width: 70,
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          maxLength: 500,
          cols: 40,
          rows: 5
        },
        {
          headerName: 'Q4',
          field: 'q4',
          width: 70,
          editable: true,
          cellEditor: 'agLargeTextCellEditor',
          maxLength: 500,
          cols: 40,
          rows: 5
        }
      ]
    }
  ];

  constructor(
    private mfoService: PmisService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<districtDetailsDialog>,
    private snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(localStorage.getItem('ANMS-AUTH'));
    this.edit = this.user.user.b == 0 && this.user.user.pid != 100;
  }
  ngOnInit() {
    console.log(this.data);
    this.mfoService.getDistrictAccomp(this.data).subscribe(data => {
      this.rowData = data;
      console.log(this.rowData);
    });
  }
  onGridReady(event) {
    this.gridApi = event.api;
  }

  onCellValueChanged(event: any) {
    console.log(event);
    if (
      isNaN(+event.newValue) &&
      event.colDef.cellEditor != 'agLargeTextCellEditor'
    ) {
      console.log('ok');
      event.node.setDataValue(event.colDef.field, event.oldValue);
      var mes = 'Error: Invalid entry. Please input numbers only.';
      this.snackBar.open(mes, null, {
        duration: 3000,
        panelClass: 'error-notification-overlay'
      });
    } else {
      console.log(event.data);
      this.mfoService
        .updateDistrictDetails(
          event.data.id,
          event.newValue,
          event.colDef.field
        )
        .subscribe(data => {
          console.log(data);
        });
      this.mfoService
        .updateLogs(
          event.data.mfo_id,
          event.newValue,
          this.user.user.pid,
          event.data.mfo_name,
          event.colDef.field,
          21,
          event.data.province,
          event.data.municipal
        )
        .subscribe(data => console.log(data));
    }
  }

  onNoClick(): void {
    // window.location.reload(true);
    this.dialogRef.close();
  }
}
