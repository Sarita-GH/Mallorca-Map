import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker} from 'leaflet';
import { MarkerService } from '../_services/marker.service';

/*const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon ({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});*/
// const iconoVerde = new iconDefault({iconUrl: 'pin_green.svg'});
// const	iconoRojo = new iconDefault({iconUrl: 'pin_red.svg'});
// const iconoAzul = new iconDefault({iconUrl: 'pin_blue.svg'});

// L.Marker.prototype.options.icon = markerIcon;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
  })
export class MapComponent implements AfterViewInit {
    private map;
    constructor(private markerService: MarkerService) { }
    ngAfterViewInit(): void {
        this.initMap();
        this.markerService.makePlacesMarkers(this.map);
    }
    private initMap(): void {
        this.map = L.map('map', {
          center: [ 39.56939, 2.65024],
          zoom: 9
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
    }
  }
