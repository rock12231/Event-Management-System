import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL,list } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private fstorage: Storage) { }

async imgUpload(files: FileList, userId: string): Promise<string[]> {
  const uploadPromises: Promise<string>[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file) {
      let storageRefPath = `users/${userId}/profile/avtar.jpg`;
      const storageRef = ref(this.fstorage, storageRefPath);
      uploadPromises.push(this.uploadFileAndGetURL(storageRef, file));
    }
  }
  
  try {
    return await Promise.all(uploadPromises);
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