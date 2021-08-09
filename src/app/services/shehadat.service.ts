import { Injectable } from '@angular/core';
import { Shehada } from './shehada.model';
import { nanoid } from 'nanoid'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShehadatService {

  constructor(private storage: StorageService) { }

  add(shehada: Shehada) {
    let modifiedShehada = { ...shehada, id: nanoid(8) }
    this.storage.set(modifiedShehada.id, modifiedShehada);
  }

  remove(id: string) {
    this.storage.remove(id);
  }

  get(id: string) {
    return this.storage.get(id);
  }

  clearAll(){
    this.storage.clearAll();
  }

  async getAllFromADay(date:string){
    let allShehadat = await this.storage.getAll()
    return allShehadat.filter(item => item.profitDates.indexOf(date)!=-1)
  }

  async getAll(filter?: string) {
    let allShehadat = await this.storage.getAll();
    if(!filter)
      return allShehadat

    return allShehadat.filter(shehada => shehada.owner === filter)
  }


}
