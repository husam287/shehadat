import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this._storage.set(key, value);
  }

  public async get(key: string) {
    return await this._storage.get(key);
  }
  
  public getAll() {
    let all = []
    this._storage.forEach((value, key, index)=>{
      all.push(value);
    })
    return all;
  }
  
  public async remove(key: string) {
    return await this._storage.remove(key);
  }

  public async clearAll() {
    await this._storage.clear();
  }

}
