import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profilePicture: any;
        
  constructor(public auth:Auth, public navCtrl: NavController, public user: User) {
    if(this.user.social && this.user.social.facebook){
      this.profilePicture = this.user.social.facebook.data.profile_picture;
    }else {
      this.profilePicture = "assets/icon/favicon.ico";
    }
  }

}
