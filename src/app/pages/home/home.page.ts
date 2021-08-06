import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { ShehadatService } from 'src/app/services/shehadat.service';
import { AddShehadaPage } from '../add-shehada/add-shehada.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {

  constructor(private modalController:ModalController, private shehadaService:ShehadatService) {}

  ionViewWillEnter(){
    console.log("hi")
    console.log(this.shehadaService.getAll()) 
  }
  

  onEdit(){
    
  }
  onDelete(){

  }
  onAdd(){
    this.presentModal()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddShehadaPage,
      componentProps:{
       
      }
    });

    modal.onWillDismiss().then(res=>{
      this.ionViewWillEnter()
    })

    return modal.present()
  }

}
