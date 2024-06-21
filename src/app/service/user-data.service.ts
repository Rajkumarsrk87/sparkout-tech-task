import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  setUserName(name: string) {
    this.storageService.set('name', name);
  }

  getUserName() {
    return this.storageService.get('name');
  }

  setEmail(email: string) {
    this.storageService.set('email', email)
  }

  getEmail() {
    return this.storageService.get('email');
  }

  clearUser() {
    this.storageService.remove('name');
    this.storageService.remove('email');
    this.storageService.clear();
    return true;
  }
}
