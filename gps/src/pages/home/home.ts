import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: any = 0;
  long: any = 0;
  originPosition: string;
  destinationPosition: string;
  isLocation: boolean = true;
  loading: Loading = this.showLoading();
  hideload: boolean = false;
  isLocationEnabled: boolean = false;

  constructor(
    public navCtrl: NavController,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    public loadCtrl: LoadingController,
    private diagnostic: Diagnostic,
  ) {
    this.loading;
  }
  async CarrelaGPS() {
    this.diagnostic.isGpsLocationEnabled()
      .then(enabled => {
        if (!enabled) {
          this.diagnostic.switchToLocationSettings();
        }
        this.getLocation();
        const canRequest = this.locationAccuracy.canRequest();
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
            .then(() => {
              // alert('Request successful');
              if (this.lat === 0) {
                  this.getLocation();  
              }
            })
            .catch((error) => {
              // alert('Error requesting location permissions' + error);
            });
        }
        else {
          //alert(`caiu no else do canrequest`);
        }
      })
    .catch(error => {
      //alert('GPS inativo!');
      //console.log(error);
    })
  }
  ionViewDidLoad() {
    this.hideLoading();
    this.CarrelaGPS();
  }
  async getLocation() {
    try {
      await this.geolocation.getCurrentPosition().then((gps) => {
        debugger
        this.lat = gps.coords.latitude;
        this.long = gps.coords.longitude;
        this.isLocation = true;
        //alert('lat1' + gps.coords.latitude + 'long1' + gps.coords.longitude);
      }).catch(() => {
        //alert('Error getting location');
        //this.lat = 0;
        //this.long = 0;
        this.isLocation = false;
      });
      let watch = await this.geolocation.watchPosition();
      watch.subscribe((data) => {
        //alert('watch');
        // data can be a set of coordinates, or an error (if an error occurred).
        if (data['code'] != 1) {
          this.lat = data.coords.latitude;
          // this.long = data.coords.longitude;
          //alert('lat2: ' + data.coords.latitude + ' long2: ' + data.coords.longitude);
          //alert(data['code']);
          //alert(data);
          this.isLocation = true;   
        }
      });
    } catch (error) {
      //console.log(error);
    }
  }
  async doRefresh(refresher) {
    await this.getLocation();
  
    //let retorno = setTimeout(() => {
    //  if (location) {

        refresher.complete();

     // } else { retorno }
    //}, 2000);
  }
  private hideLoading() {
    if (this.hideload === false) {
      this.hideload = true;
      this.loading.dismiss();
    }
  }
  private showLoading(): Loading {
    this.hideload = true;
    let loading: Loading = this.loadCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }
}