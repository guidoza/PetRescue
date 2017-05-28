import { Component } from '@angular/core';
import { Platform, NavController, Loading, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  petIcons: string[] = ["assets/dog.png", "assets/wolf.png", "assets/elephants.png"];
  petList: Array<{title: string, description: string, icon: string}>;  
  loading: Loading;

  constructor(public auth:Auth, public navCtrl: NavController, public user: User, 
              private loadingCtrl: LoadingController, public platform: Platform) {
    this.petList = [];
    for (let i = 0; i < 3; i++) {
      this.petList.push({
        title: 'Pet ' + i,
        description: 'This is an incredible pet' + i,
        icon: this.petIcons[i]
      });
    }  
  }

  public loadTimeline(refresher?) {
    this.showLoading();
    var load = this.loading;
    setTimeout(function(){
      load.dismiss();
      refresher.complete();
    }, 2000)
  }

  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
