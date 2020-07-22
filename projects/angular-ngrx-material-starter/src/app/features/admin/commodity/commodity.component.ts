import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { PmisService } from '../../../core/services/pmis.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionComponent } from '../action/action.component';
import { PhotoRendererComponent } from '../photo-renderer/photo-renderer.component';
import { AddEntryComponent } from '../add-entry/add-entry.component';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/all-modules';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { UploadEntryComponent } from '../upload-entry/upload-entry.component';

@Component({
  selector: 'anms-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommodityComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public modules: Module[] = [
    ClientSideRowModelModule,
    RichSelectModule,
    MenuModule,
    ColumnsToolPanelModule
  ];

  gridApi;
  gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData;
  frameworkComponents;
  context;
  rowSelection;

  getRowCommodity() {
    this.apmisService.getRowCommodity().subscribe(data => {
      console.log(data);
      this.rowData = data;
      this.cd.markForCheck();
    });
  }

  constructor(
    public apmisService: PmisService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.columnDefs = [
      {
        headerName: 'Id',
        field: 'id',
        hide: true
      },
      {
        headerName: 'Image',
        field: 'imageSrc',
        width: 100,
        pinned: 'left',
        cellRendererFramework: PhotoRendererComponent
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 200,
        filter: 'agTextColumnFilter',
        pinned: 'left',
        editable: true
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 200,
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: [
            'NFA Rice',
            'Imported Commercial Rice',
            'Local Commercial Rice',
            'Corn',
            'Fruits',
            'Upland Vegetables',
            'Lowland vegetables',
            'Livestock & Poultry Products',
            'Fishery',
            'Spices',
            'Other Commodities'
          ]
        }
      },
      {
        headerName: 'Unit',
        field: 'unit',
        width: 100,
        filter: 'agTextColumnFilter',
        editable: true,
        cellEditorSelector: function(params) {
          return {
            component: 'agRichSelectCellEditor',
            params: {
              values: ['kg', 'pc', 'btl', 'btl/pc']
            }
          };
        }
      },
      {
        headerName: 'Specification',
        field: 'spec',
        width: 150,
        filter: 'agTextColumnFilter',
        editable: true
      },
      {
        headerName: 'Tags',
        field: 'tags',
        width: 200,
        filter: 'agTextColumnFilter',
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        minWidth: 550
      },
      // {
      //   headerName: '2019',
      //   field: 'year2019',
      //   width: 200,
      //   editable: true,
      //   hide: true,
      //   cellEditor: 'agRichSelectCellEditor',
      //   cellEditorParams:{
      //      values: ['True', 'False']
      //   }
      // },

      {
        headerName: 'Actions',
        width: 150,
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
      actionComponent: ActionComponent,
      photoRenderer: PhotoRendererComponent
    };
  }

  onCellValueChanged(params) {
    this.apmisService
      .updateCommodity(params.data.id, params.column.colId, params.value)
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit(): void {
    this.getRowCommodity();
  }

  getRowNodeId(data) {
    return data.id;
  }

  openDialog() {
    this.dialog.open(AddEntryComponent, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi }
    });
  }

  methodFromParentUpload(cell) {
    this.dialog.open(UploadEntryComponent, {
      minWidth: '50vh',
      data: { gridApi: this.gridApi, id: cell.id }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
