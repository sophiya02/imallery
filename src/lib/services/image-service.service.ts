import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Image } from '../models/models'

const url = 'https://imallery-backend.onrender.com/api/v1/images';
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private imageAddedSource = new Subject<void>();
  imageAdded = this.imageAddedSource.asObservable();

  emitImageAdded(){
    this.imageAddedSource.next();
  }

  constructor(private http: HttpClient) { }

  getAllImage():Observable<Image[]>{
    return this.http.get(url).pipe(
      map(v=> (v as any).images)
    );

  }
  getImage(id: string):Observable<Image>{
    return this.http.get(`${url}/${id}`).pipe(
      map(v=> (v as any).image)
    );

  }
  createImage(data:Image):Observable<Image>{
    return this.http.post(url, data).pipe(
      map(v=> (v as any).image)
    );

  }
  updateImage(data:Image):Observable<Image>{
    return this.http.patch(url, data).pipe(
      map(v=> (v as any).image)
    );

  }
  deleteImage(id: string):Observable<any>{
    console.log('deleteImage id', id)
    return this.http.delete(`${url}/${id}`).pipe(
      map(v=> (v as any).msg)
    );

  }
}
