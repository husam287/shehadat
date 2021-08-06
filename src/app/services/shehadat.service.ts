import { Injectable } from '@angular/core';
import { Shehada } from './shehada.model';
import { nanoid } from 'nanoid'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShehadatService {

  constructor(private storage:StorageService) { }

  add(shehada: Shehada) {
    let modifiedShehada = { ...shehada, id: nanoid(8) }
    this.storage.set(modifiedShehada.id,modifiedShehada);
  }

  remove(id:string){
    this.storage.remove(id);
  }

  get(id:string){
    return this.storage.get(id);
  }

  getAll(){
    return this.storage.getAll();
  }
  
  
}
