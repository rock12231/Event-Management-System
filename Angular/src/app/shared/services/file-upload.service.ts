import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL,list } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private fstorage: Storage) { }

  async imgUpload(files: FileList, userId: string, challenge: string, meal?: string): Promise<string[]> {
    console.log(challenge);
    const uploadPromises: Promise<string>[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
  
      if (file) {
        let storageRefPath = `Challenge/${userId}`;
  
        if (challenge === 'profile') {
          storageRefPath += `/profile/avtar.jpg`;
        } else if (challenge) {
          if (meal) {
            storageRefPath += `/${challenge}/${meal}`;
          } else {
            storageRefPath += `/${challenge}/${file.name}`;
          }
        } else {
          storageRefPath += `/default/${file.name}`;
        }
  
        const storageRef = ref(this.fstorage, storageRefPath);
        uploadPromises.push(this.uploadFileAndGetURL(storageRef, file));
      }
    }
  
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error('Upload failed', error);
      throw error;
    }
  }
  
  private uploadFileAndGetURL(storageRef: any, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  }
}