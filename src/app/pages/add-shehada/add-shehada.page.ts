import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';

@Component({
  selector: 'app-add-shehada',
  templateUrl: './add-shehada.page.html',
  styleUrls: ['./add-shehada.page.scss'],
})
export class AddShehadaPage implements OnInit {
  @ViewChild('loginForm') loginForm:NgForm;
  initStartDate = new Date().toISOString()
  startDate :Date;
  endDate :Date;
  owner:string;

  constructor(private modalController:ModalController, private shehadaService:ShehadatService, private alert:AlertController) { }

  ngOnInit() {
  }

  onClose(){
    this.modalController.dismiss()
  }

  onSubmit(form:NgForm){
    let shehada:Shehada = form.form.value;
    
    if(shehada.startDate > shehada.endDate){
      this.errorAlertForDate()
      return;
    }
    
    this.shehadaService.add(form.form.value)
    this.onClose()
  }

  async errorAlertForDate() {
    const modal = await this.alert.create({
      message:'Start date must be before end date!!',
      header:'ERROR IN DATES',
      cssClass:['ion-color-danger'],
      buttons:['Dismiss']
    });

    return modal.present()
  }
 

}
