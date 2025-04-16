import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private cafes: any[] = [
    {name: "Testung", lat: 48.354, lng: 10.9}
  ];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.354, 10.9 ],
      zoom: 14,

    });

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      minZoom: 11});

    tiles.addTo(this.map);
  }

  private initMarkers(): void {
    const customMarkerIcon = L.icon({
      iconUrl: 'assets/images/marker.png',  // Pfad zum benutzerdefinierten Bild
      className: 'custom-marker',
      iconSize: [40, 40],   // Größe des Icons
      iconAnchor: [20, 40], // Der Punkt im Icon, der mit der Position des Markers auf der Karte übereinstimmt
      popupAnchor: [0, -40] // Der Abstand des Popups relativ zum Marker
    });

    this.cafes.forEach(cafe => {
      if (cafe.lat !== undefined && cafe.lng !== undefined) {
        const customTooltip = L.tooltip({
          className: 'custom-tooltip',
          direction: 'bottom', // Richtung des Tooltips
          offset: [0, -6]
        }).setContent(cafe.name);
        L.marker([cafe.lat, cafe.lng], { icon: customMarkerIcon }).addTo(this.map).bindTooltip(customTooltip);
      }
    });
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.initMarkers();
    this.map.on('move', () => {
      const center = this.map.getCenter();
      const zoom = this.map.getZoom();

      console.log('Map moving:', center, zoom);
    });
  }
}
