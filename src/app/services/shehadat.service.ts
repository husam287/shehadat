import { Injectable } from '@angular/core';
import { Shehada } from './shehada.model';
import { nanoid } from 'nanoid'
import { StorageService } from './storage.service';
import * as moment from 'moment';

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

  edit(id: string, newShehada: Shehada) {
    this.remove(id);
    this.storage.set(id, newShehada)
  }

  clearAll() {
    this.storage.clearAll();
  }

  async getAllFromADay(date: string, firstDate1: string) {
    let allShehadat: Shehada[] = await this.storage.getAll()
    let targetDate = moment(date);
    let firstDate = moment(firstDate1);
    let shehadatList: {"shehadat":Shehada[], "date":string}[] = [];
    while (targetDate.isSameOrAfter(firstDate)) {
      let temp = allShehadat
        .filter(item =>
          item.profitDates.findIndex(item => moment(item).isSame(targetDate)) != -1)
      let temp1 = {shehadat:temp, date:targetDate.format('YYYY-MM-DD') }
      shehadatList = [...shehadatList, temp1];
      targetDate.subtract(1,'day');
    }
    return [...shehadatList];
  }

  async getAll(filter?: string) {
    let allShehadat = await this.storage.getAll();
    if (!filter)
      return allShehadat

    return allShehadat.filter(shehada => shehada.owner === filter)
  }


}
