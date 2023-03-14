import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss']
})
export class DisplayImageComponent implements OnInit {

  @Input() imgSrc:string='';
  constructor(){
    console.log("imgSr: ",this.imgSrc);
  }

  ngOnInit(): void {
  }

}
