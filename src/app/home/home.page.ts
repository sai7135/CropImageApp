import { Component } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx'
import { ActionSheetController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  croppedImagepath: string;
  value;
  constructor(private camera: Camera,public navController:NavController,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File) {}
    pickImage(sourceType) {
      const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
     this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
     }, (err) => {
      // Handle error
      });
     }
     cropImage(fileUrl) {
      this.crop.crop(fileUrl, { quality:100 })
      .then(
      newPath => {
       this.showCroppedImage(newPath.split('?')[0])
      },
       error => {
       alert('Error cropping image' + error);
       console.log('Error cropping image :' , error)
      }
      );
     }
     showCroppedImage(ImagePath) {
       var copyPath = ImagePath;
       var splitPath = copyPath.split('/');
       var imageName = splitPath[splitPath.length - 1];
       var filePath = ImagePath.split(imageName)[0];
    
      this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      }, error => {
      alert('Error in showing image' + error);
      });
      }
}
