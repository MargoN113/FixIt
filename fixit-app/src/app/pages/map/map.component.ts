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

  //importiert die repaircafes aus den assets
  cafes: any[] = repaircafes;
  //wird automatisch ausgeführt nachdem die ansicht geladen ist
  ngAfterViewInit(): void {
    //initialisert die Karte und Marker für alle Cafes
    this.initMap();
    this.initMarkers();
  }

  //öffnet oder schließt das Cafe Detail Fenster
  toggleCafeDetails(cafe: any) {
    //click auf Element bereits im Fokus? -> schließt das Detail Fenster
    if(document.getElementById(cafe.id)?.classList.contains("list-element-focus")){
      this.closeCafeDetails();
      return;
    }

    //entfernt fokus von allen elementen mit fokus
    const oldFocusElements = document.getElementsByClassName("list-element-focus");
    for(let oldFocusElement of oldFocusElements) {
      oldFocusElement.classList.remove("list-element-focus");
    }

    //highlighted den Marker des geklickten Cafes
    this.highlightMarker(cafe.marker);

    //gibt dem geklickten element fokus
    const cafeListElement = document.getElementById(cafe.id);
    cafeListElement?.classList.add("list-element-focus");

    //wenn detail fenster schon offen, keine Änderungen
    if(document.getElementsByClassName("show-details").length === 0){ //sonst
      this.map.panBy([400, 0], {animate: false});
      //macht die karte 400px kleiner
      document.getElementById("map-frame")?.classList.add("map-frame-small");
      //fügt das detail fenster hinzu
      document.getElementById("details")?.classList.add("show-details");
    }
  }

  //schließt das Cafe Detail Fenster
  closeCafeDetails() {
    //entfernt den Fokus von allen Elementen mit Fokus
    const focusElements = document.getElementsByClassName("list-element-focus");
    for(let focusElement of focusElements) {
      focusElement.classList.remove("list-element-focus");
    }

    //macht map wieder groß
    document.getElementById("map-frame")?.classList.remove("map-frame-small");
    //entfernt das detail fenster
    document.getElementById("details")?.classList.remove("show-details");
    //macht den map pan rückgängig um 400px (breite des detail fensters)
    this.map.panBy([-400, 0], {animate: false});
  }

  //hovert über einen marker auf der map
  hoverStartCafeMarker(cafe: any) {
    //gibt der Liste den hover effect
    const cafeListElement = document.getElementById(cafe.id);
    cafeListElement?.classList.add("list-element-hover");

    //scrollt zum element in der liste
    cafeListElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    //highlited den cafe marker auf der map
    this.highlightMarker(cafe.marker);
  }

  //hovert über ein cafe in der liste
  hoverStartCafeList(cafe: any) {
    this.highlightMarker(cafe.marker);
  }

  //highlight auf den marker
  private highlightMarker(cafeMarker: any) {
    //gibt es ein fokus element? wenn ja bezug auf dieses
    const focusElements = document.getElementsByClassName("list-element-focus");
    //jeder cafe marker
    this.cafes.forEach(cafe => {
      //wenn nicht der marker im fokus
      if(focusElements[0]?.id != cafe.id){
        //in den hintergrund, durchsichtig und ohne tooltip
        cafe.marker.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
      }
    });
    //der gehoverte marker voll sichtbar in den vordergrund mit tooltip
    cafeMarker.setOpacity(1).setZIndexOffset(999).openTooltip();
  }
  //ende vom hover
  hoverEndCafe(cafe: any) {
    //entfernt alle hover css klassen
    const oldHoverElements = document.getElementsByClassName("list-element-hover");
    for(let oldHoverElement of oldHoverElements) {
      oldHoverElement.classList.remove("list-element-hover");
    }
    //wenn marker im fokus ist, highlight auch nach ende des hovers
    if(document.getElementById(cafe.id)?.classList.contains("list-element-focus")){
      this.highlightMarker(cafe.marker);
      return;
    }

    //wenn es ein element im fokus gibt
    const focusElements = document.getElementsByClassName("list-element-focus");
    if(focusElements.length > 0){
      //wieder zu diesem in der Liste scrollen
      focusElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      //den nicht mehr gehoverten marker wieder vernachlössigen
      cafe.marker.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
      return;
    }
    //alle marker wieder auf standard
    this.removeHighlightMarker(cafe.marker);
  }

  //alle marker zurücksetzen
  private removeHighlightMarker(cafeMarker: any) {
    this.cafes.forEach(cafe => {
      cafe.marker.setOpacity(1);
    });
    cafeMarker.setZIndexOffset(0).closeTooltip();
  }

  //initialisierung der map
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 48.354, 10.9 ],
      zoom: 14,

    });

    //map click listener
    this.map.on('click', () => {
      //entfernt detail ansicht
      this.closeCafeDetails();
      this.cafes.forEach(cafe => {
        cafe.marker.setOpacity(1);
      });
    });

    //lädt karten daten
    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      minZoom: 11});
    tiles.addTo(this.map);
  }

  //initialisiert karten cafe marker
  private initMarkers(): void {
    //definiert das marker icon
    const customMarkerIcon = L.icon({
      iconUrl: 'assets/images/marker.png',  // Pfad zum benutzerdefinierten Bild
      className: 'custom-marker',
      iconSize: [40, 40],   // Größe des Icons
      iconAnchor: [20, 40], // Der Punkt im Icon, der mit der Position des Markers auf der Karte übereinstimmt
      popupAnchor: [0, -40] // Der Abstand des Popups relativ zum Marker
    });

    //für jedes cafe ein marker
    this.cafes.forEach(cafe => {
      if (cafe.lat !== undefined && cafe.lng !== undefined) {
        const customTooltip = L.tooltip({
          className: 'custom-tooltip', //css Klasse
          direction: 'bottom', // Richtung des Tooltips
          offset: [0, -5] //offset x,y
        }).setContent(cafe.name);
        //fügt den marker hinzu
        cafe['marker'] = L.marker([cafe.lat, cafe.lng], { icon: customMarkerIcon, riseOnHover: true }).addTo(this.map).bindTooltip(customTooltip);

        //listener maus drüber (hover start)
        cafe['marker'].on('mouseover', () => {
          this.hoverStartCafeMarker(cafe);
        });

        //listener maus weg (hover ende)
        cafe['marker'].on('mouseout', () => {
          this.hoverEndCafe(cafe);
        });

        //listener mouse klick
        cafe['marker'].on('click', () => {
          this.toggleCafeDetails(cafe);
        });
      }
    });
  }
}
