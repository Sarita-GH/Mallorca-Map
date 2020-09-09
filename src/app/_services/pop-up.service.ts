import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makePlacesPopup(data: any): string {
    return `<div><p style="text-align:center; font-size: 20px; font-weight: bold;">${data.name}</p></div>
            <div><b>Descripción:</b> ${data.description}</div><br>
            <div><img src="../../assets/images/${data.image}" width="280" height="180"></div>`;
  }
}

