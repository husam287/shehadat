import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { Shehada } from 'src/app/services/shehada.model';
import { ShehadatService } from 'src/app/services/shehadat.service';

@Component({
  selector: 'app-shehada-details',
  templateUrl: './shehada-details.page.html',
  styleUrls: ['./shehada-details.page.scss'],
})
export class ShehadaDetailsPage implements ViewWillEnter {

  shehada: Shehada
  constructor(private activeRouter: ActivatedRoute, private shehadaService: ShehadatService) { }

  ionViewWillEnter() {
    let id = this.activeRouter.snapshot.params['id']
    this.shehadaService.get(id)
      .then(data => {
        this.shehada = data;
        this.shehada.startDate = new Date(this.shehada.startDate)
        this.shehada.endDate = new Date(this.shehada.endDate)
      });

  }

}
