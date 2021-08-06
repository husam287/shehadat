import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }
  onClose(){
    this.modalController.dismiss()
  }
  onSubmit(form:NgForm){
    console.log(form.form.value)
    this.onClose()
  }
 

}
