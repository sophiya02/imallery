import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import * as Masonry from 'masonry-layout';
import { LayoutBreakpoints } from 'resources/shared.resources';
import { Observable, Subscription, filter } from 'rxjs';
import { ImageServiceService } from 'src/lib/services/image-service.service';
import { Image } from 'src/lib/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
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
  subs= new Subscription();
  images: Observable<Image[]>;
  constructor(
    private imageService: ImageServiceService,
    private router: Router,
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef) {
      this.images= this.imageService.getAllImage();
    }

  ngOnInit(): void {
    const grid = this.elementRef.nativeElement.querySelector('.grid');
    console.log(this.elementRef);
    const masonry = new Masonry(grid, {
      itemSelector: '.grid-item',
      // gutter: 10,
    });
    console.log("msnor", masonry)
    this.imageService.imageAdded.subscribe(v=>{
      this.loadImages();
    })
  }

  loadImages(){
    this.images= this.imageService.getAllImage();
  }

  ngAfterViewInit(){
    const subs1 = this.breakpointObserver.observe([
      LayoutBreakpoints.DESKTOP,
      LayoutBreakpoints.LARGE_DESKTOP,
      LayoutBreakpoints.MOBILE,
      LayoutBreakpoints.TAB
    ]).subscribe(()=> this.cd.markForCheck());
  }
  deleteImage(id: string){
    console.log("clicked image id", id);
    this.imageService.deleteImage(id).subscribe(()=>{
      this.loadImages();
    });
  }
  color: string="";
  like: number=0;
  changeColor(data: Image){
    if(this.color===""){
      this.color="warn";
      this.like=1;
    }
    else{
      this.color="";
      this.like=0;
    }
    data.likes= this.like;
    this.imageService.updateImage(data);
  }

}
