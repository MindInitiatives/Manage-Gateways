import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IAllGateways } from 'src/app/models/gatewayModel';
import { GatewayService } from 'src/app/services/gateway.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  id: string;
  name: string;
  message: string;
}

@Component({
  selector: 'app-all-gateways',
  templateUrl: './all-gateways.component.html',
  styleUrls: ['./all-gateways.component.css']
})
export class AllGatewaysComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['Gateway', 'IP Address', 'Serial No.', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<IAllGateways>();
  pageSize = 2;
  pageSizeOptions:number[] = [2, 4, 6, 10, 20];
  pageEvent!: PageEvent;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public gateways: any = [];
  loading : boolean = false;
  
  constructor(private gatewayService: GatewayService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {

   }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllGateways();
  }

  public getAllGateways() {
    this.loading = true;
    this.gatewayService.getAllGateways().subscribe((res) => {
      console.log(res)
      this.loading = false;
      this.gateways = res
      this.dataSource.data = this.gateways as IAllGateways[];
    })
  }

  public redirectToDetails = (id: any) => {
    console.log(id);
    this.router.navigate(['/gateway-detail'], {
      queryParams: {id :id },
    });
  }

  public redirectToUpdate = (id: string) => {
    this.router.navigate(['/edit-gateway'], {
      queryParams: {id :id },
    });
    
  }
  public redirectToDelete = (id: any) => {
    this.gatewayService.deleteGateway(id).subscribe((res) => {
      if (res.statusCode == 200) {
        const index = this.dataSource.data.indexOf(id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
        this.openSnackBar(res.statusMessage, "close")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000 
      });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      data: {id: data._id, name: `Delete Gateway`, message: `Are you sure you want to delete ${data.gateway_name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.redirectToDelete(result)
      }
    });
  }

}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.html'
})
export class ConfirmationModalComponent{
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}