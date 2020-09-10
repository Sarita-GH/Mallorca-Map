import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

const ICON_URL = 'assets/icons/pin_black.svg';
const SHADOW_URL = 'assets/marker-shadow.png';
const MARKER_ICON: L.IconOptions = {
  iconUrl: ICON_URL,
  shadowUrl: SHADOW_URL,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
};

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

  obtainColor(clas: string): L.Icon<L.IconOptions> {
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
    return L.icon({ ...MARKER_ICON, iconUrl: `assets/icons/pin_${color}.svg` });
  }
}
