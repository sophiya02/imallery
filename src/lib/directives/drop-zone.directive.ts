import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  constructor() { }
  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private backgorund = '#ffffff';
  @HostListener('dragover', ['$event']) dragOver(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.backgorund='#e2eefd';
  }
  @HostListener('dragleave', ['$event']) public dragLeave(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.backgorund='#ffffff';
  }

  @HostListener('drop', ['$event']) public drop(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.backgorund='#ffffff';
    console.log("this is event ", event);
    const files = event.dataTransfer.files;
    if(files.length>0){
      this.fileDropped.emit(Array.from(files));
    }
    // this.fileDropped.emit(event)
  }

}
