import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth, User } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  profilePicture: any;
  profileName: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
              public auth: Auth, public menuCtrl: MenuController, public user: User) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //Checking if the user is registered
      if(this.auth.isAuthenticated()) {
        this.rootPage = HomePage;
        this.setProfileData();
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.menuCtrl.close();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  setProfileData(){
    if(this.user.social && this.user.social.facebook){
      this.profilePicture = this.user.social.facebook.data.profile_picture;
      this.profileName = this.user.social.facebook.data.username;
    }else {
      this.profilePicture = "assets/icon/favicon.ico";
      this.profileName = this.user.details.username;
    }
  }
}
