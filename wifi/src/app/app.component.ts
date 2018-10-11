import {Component, ViewChild} from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WifiProvider } from '../providers/wifi/wifi';
import {Nav, Navbar} from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { Network } from '@ionic-native/network';
import { WifiPage } from '../pages/wifi/wifi';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage: any = HomePage;

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events: Events,
    public network: Network,
    //public networkStatus: WifiProvider,
    
    ) {
    platform.ready().then(() => {

      this.initializeApp();
   
    });
  }

initializeApp(): void {

    /* Ionic stuff */
    this.statusBar.styleDefault();
    this.splashScreen.hide();
}
}
