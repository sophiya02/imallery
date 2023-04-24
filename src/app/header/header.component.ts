import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutBreakpoints } from 'resources/shared.resources';
import { Subscription } from 'rxjs';
import { AddImageDialogComponent } from '../add-image-dialog/add-image-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subs = new Subscription()
  get isDesktopScreen() : boolean {
    return this.breakpointObserver.isMatched([LayoutBreakpoints.DESKTOP])
  }

  get isLargeDesktopScreen() : boolean {
    return this.breakpointObserver.isMatched([LayoutBreakpoints.LARGE_DESKTOP])
  }

  get isMobileScreen() : boolean {
    return this.breakpointObserver.isMatched([LayoutBreakpoints.MOBILE])
  }

  get isTabScreen() : boolean {
    return this.breakpointObserver.isMatched([LayoutBreakpoints.TAB])
  }
  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    const subs1 = this.breakpointObserver.observe([
      LayoutBreakpoints.DESKTOP,
      LayoutBreakpoints.LARGE_DESKTOP,
      LayoutBreakpoints.MOBILE,
      LayoutBreakpoints.TAB
    ]).subscribe(()=> this.cd.markForCheck());
  }
  label:string='';
  url: string='';
  openAddImgDialog(){
    const dialogRef = this.dialog.open(AddImageDialogComponent,{
      data:{label: this.label, url: this.url},
      height: '75vh',
      width: '80vw',
      panelClass: 'add-image-dialog'
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.url=result;
    })
  }

}
