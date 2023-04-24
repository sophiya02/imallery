import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { ImageServiceService } from 'src/lib/services/image-service.service';

export interface DialogData{
  label: string;
  url: string;
}

const url = 'https://imallery-backend.onrender.com/api/v1/images';

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.scss']
})
export class AddImageDialogComponent implements OnInit {
  link='https://www.denofgeek.com/wp-content/uploads/2022/05/Leged-of-Zelda-Link.jpg?resize=768%2C432'

  formGroup= new FormGroup({
    label: new FormControl<string | null>(''),
    url: new FormControl<string | null>(''),
    cloudinary_id: new FormControl<string | null>('')
  })

  constructor(
    private router: Router,
    private imageService: ImageServiceService,
    public dialogRef: MatDialogRef<AddImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  public uploader: FileUploader = new FileUploader({
    url: url,
    disableMultipart: false,
    autoUpload: false,
    itemAlias: 'image',
    additionalParameter:{
      label: this.formGroup.value.label || "default label"
    }
  })

  ngAfterViewInit(): void{
    if (this.formGroup.get('label') !== null) {
      this.formGroup?.get('label')?.valueChanges.subscribe(value => {
        this.uploader.setOptions({
          url: url,
          disableMultipart: false,
          autoUpload: false,
          itemAlias: 'image',
          additionalParameter:{
            label: "default label"
          }
        });
      });
    }
  }

  ngOnInit(): void {

    this.uploader.options.formatDataFunction=(item: FileItem)=>{
      const formData = new FormData();
      formData.append('file', item._file, item.file.name);
      formData.append('name', 'My file');
      formData.append('description', 'This is a description of my file');
      formData.append('label', this.formGroup.value.label || "")

      return formData;
    }
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    };
    this.uploader.onProgressItem = () => {
      // this.isUploading = true;
      // this.router.navigate(['image-upload/image-uploading']);

    }
    this.uploader.onCompleteItem = async (item: FileItem, response: any, status: any) => {
      const res = JSON.parse(response)
      // console.log('item', item);
      // console.log('res',res);
      // console.log('response.secure_url', res.image.url)
      // this.toastr.success('File Succesfully uploaded');
      // this.router.navigate(['/image-uploaded'], {queryParams: {uploadedImageUrl: `C:\\Users\\Lenovo\\Desktop\\projects\\frontend_projects\\image-uploader\]server\\uploads\\${item._file.name}`}});
      // this.router.navigate(['image-upload/image-uploaded'], {queryParams:{url: res.image.url}})
      await this.imageService.emitImageAdded();
    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelect(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    // const file = input.files[0] ;
    // console.log('Selected input:', input);
  }

  chooseFile(input: HTMLInputElement , event: Event){
    event.preventDefault();
    input.click()
    // console.log(event);
    // this.uploader.uploadAll();
  }

  async save(){
    console.log(this.uploader)
    if(this.uploader.queue.length){
      console.log('in save upload')
      this.uploader.options.additionalParameter = {
        url: this.formGroup.value.url,
        label: this.formGroup.value.label
      }
      this.uploader.uploadAll();
    }
    else{
      let data = {
        _id: '',
        likes:0,
        label: this.formGroup.value.label || '',
        url: this.formGroup.value.url || ''
      }
      this.imageService.createImage(data).subscribe();
      await this.imageService.emitImageAdded();
    }



  }



}
