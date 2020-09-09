import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient,
              private popupService: PopUpService) {
  }

  places = '../../assets/data/places.geojson';
  arrayPlaces = [];

  makePlacesMarkers(map: L.Map): void {
    this.http.get(this.places).subscribe((res: any) => {
      this.arrayPlaces = res;
      for (const p of res) {
        const lat = p.geometry.coordinates[0];
        const lon = p.geometry.coordinates[1];
        const clas = p.class;
        const marker = L.marker ([lon, lat], { icon: this.obtainColor(clas) });

        marker.bindPopup(this.popupService.makePlacesPopup(p.properties));

        marker.addTo(map);
      }
    });
  }


  obtainColor(clas: string): any {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/icons/pin_black.svg';
    const shadowUrl = 'assets/marker-shadow.png';
    const markerIcon = L.Icon.extend({
      options: {
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    }
    });
    let color = 'black';
    switch (clas) {
      case 'Beaches':
        color = 'blue';
        break;
      case 'Restaurants':
        color = 'red';
        break;
      case 'Places':
        color = 'green';
        break;
      case 'Hotels':
        color = 'yellow';
        break;
      case 'Services':
        color = 'pink';
        break;
    }
    // const i = iconDefault;
    // Object.assign(i, {iconUrl: `assets/icons/pin_${color}.svg`});
    return 'assets/icons/pin_${color}.svg';
    // return L.icon({ ...iconDefault, iconUrl: `assets/icons/pin_${color}.svg` });
  }
}
