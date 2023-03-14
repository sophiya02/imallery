import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  masonryItems = [
    { src: 'https://images.unsplash.com/photo-1677490384657-8dc0b0495580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80' },
    { src: 'https://images.unsplash.com/photo-1677490384657-8dc0b0495580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80' },
    { src: 'https://images.unsplash.com/photo-1677490384657-8dc0b0495580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80' },
    { src: 'https://plus.unsplash.com/premium_photo-1674338458545-d03639ecbbc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { src: 'https://plus.unsplash.com/premium_photo-1674338458545-d03639ecbbc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
