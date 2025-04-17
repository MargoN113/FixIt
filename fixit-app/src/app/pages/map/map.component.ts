import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {CommonModule} from '@angular/common';
import {repaircafes} from '../../../assets/data/repaircafes';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any;
  cafes: any[] = repaircafes;
  ngAfterViewInit(): void {
    this.initMap();
    this.initMarkers();
  }

  openCafeDetails(cafe: any) {
    //click auf Element im Fokus? -> schließt den Fokus
    if(document.getElementById(cafe.id)?.classList.contains("list-element-focus")){
      this.closeCafeDetails();
      return;
    }

    //entfernt fokus von allen elementen
    const oldFocusElements = document.getElementsByClassName("list-element-focus");
    for(let oldFocusElement of oldFocusElements) {
      oldFocusElement.classList.remove("list-element-focus");
    }

    this.highlightMarker(cafe.marker);

    //gibt dem geklickten element fokus
    const cafeListElement = document.getElementById(cafe.id);
    cafeListElement?.classList.add("list-element-focus");

    //highlightet den map marker
    this.highlightMarker(cafe.marker);
  }

  closeCafeDetails() {
    const oldFocusElements = document.getElementsByClassName("list-element-focus");
    for(let oldFocusElement of oldFocusElements) {
      oldFocusElement.classList.remove("list-element-focus");
    }
  }
  hoverStartCafe(cafe: any) {
    const cafeListElement = document.getElementById(cafe.id);
    cafeListElement?.classList.add("list-element-hover");

    this.highlightMarker(cafe.marker);
  }

  private highlightMarker(cafeMarker: any) {
    const focusElements = document.getElementsByClassName("list-element-focus");
    this.cafes.forEach(cafe => {
      if(focusElements[0]?.id != cafe.id){
        cafe.marker.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
      }
    });
    cafeMarker.setOpacity(1).setZIndexOffset(999).openTooltip();
  }
  hoverEndCafe(cafe: any) {
    const oldFocusElements = document.getElementsByClassName("list-element-hover");
    for(let oldFocusElement of oldFocusElements) {
      oldFocusElement.classList.remove("list-element-hover");
    }
    if(document.getElementById(cafe.id)?.classList.contains("list-element-focus")){
      this.highlightMarker(cafe.marker);
      return;
    }

    if(document.getElementsByClassName("list-element-focus")?.length > 0){
      cafe.marker.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
      return;
    }
    this.removeHighlightMarker(cafe.marker);
  }

  private removeHighlightMarker(cafeMarker: any) {
    this.cafes.forEach(cafe => {
      cafe.marker.setOpacity(1);
    });
    cafeMarker.setZIndexOffset(0).closeTooltip();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.354, 10.9 ],
      zoom: 14,

    });

    this.map.on('click', () => {
      console.log("TEST");
      this.closeCafeDetails();
      this.cafes.forEach(cafe => {
        cafe.marker.setOpacity(1);
      });
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
        cafe['marker'] = L.marker([cafe.lat, cafe.lng], { icon: customMarkerIcon, riseOnHover: true }).addTo(this.map).bindTooltip(customTooltip);

        cafe['marker'].on('mouseover', () => {
          this.hoverStartCafe(cafe);
        });

        cafe['marker'].on('mouseout', () => {
          this.hoverEndCafe(cafe);
        });

        cafe['marker'].on('click', () => {
          this.openCafeDetails(cafe);
        });
      }
    });
  }
}
