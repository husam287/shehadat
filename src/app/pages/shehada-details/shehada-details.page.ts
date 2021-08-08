import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';

@Component({
  selector: 'app-shehada-details',
  templateUrl: './shehada-details.page.html',
  styleUrls: ['./shehada-details.page.scss'],
})
export class ShehadaDetailsPage implements ViewWillEnter {

  shehada: Shehada
  @Input('id') id: string;
  @Input('type') type: string;

  constructor(private activeRouter: ActivatedRoute, private shehadaService: ShehadatService, private modalCtrl: ModalController) { }

  async ionViewWillEnter() {
    if (this.type === 'modal') {
      this.shehada = await this.shehadaService.get(this.id);
      this.shehada.startDate = new Date(this.shehada.startDate)
      this.shehada.endDate = new Date(this.shehada.endDate)
      return;
    }

    let id = this.activeRouter.snapshot.params['id']
    this.shehadaService.get(id)
      .then(data => {
        this.shehada = data;
        this.shehada.startDate = new Date(this.shehada.startDate)
        this.shehada.endDate = new Date(this.shehada.endDate)
      });
  }

  onClose() {
    if (this.type === 'modal') {
      this.modalCtrl.dismiss();
    }
  }

}
