import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any;

  cafes: any[] = [
    {
      "name": "Repair Legends",
      "lat": 48.3652,
      "lng": 10.8983,
      "type": "Elektronik",
      "description": "Experten für Smartphones, Tablets und Laptops – legendäre Technikretter!"
    },
    {
      "name": "FixIt Fast",
      "lat": 48.3681,
      "lng": 10.9049,
      "type": "Haushaltsgeräte",
      "description": "Blitzschnelle Reparaturen für deine Waschmaschine, Mikrowelle & Co."
    },
    {
      "name": "Meister Momo Reparatur",
      "lat": 48.3594,
      "lng": 10.8921,
      "type": "Fahrräder",
      "description": "Der Bike-Flüsterer im Herzen Augsburgs – alles rund ums Fahrrad."
    },
    {
      "name": "AugsFix Garage",
      "lat": 48.3610,
      "lng": 10.9207,
      "type": "KFZ",
      "description": "Hier wird dein Auto wieder fit gemacht – mit Herz und Hydraulik."
    },
    {
      "name": "TechDoc Augsburg",
      "lat": 48.3866,
      "lng": 10.9112,
      "type": "Elektronik",
      "description": "Hightech Klinik für kaputte Technik – Diagnose inklusive!"
    },
    {
      "name": "Reparatur Oase",
      "lat": 48.3577,
      "lng": 10.8994,
      "type": "Möbel",
      "description": "Dein Stuhl wackelt? Dein Tisch knarzt? Hier gibt’s Frieden für dein Mobiliar."
    },
    {
      "name": "Fixwerkstatt 3000",
      "lat": 48.3645,
      "lng": 10.8870,
      "type": "Elektronik",
      "description": "Next-Level Technikreparatur für alles von Konsolen bis Kaffeemaschinen."
    },
    {
      "name": "Die Schrauberbude",
      "lat": 48.3512,
      "lng": 10.8971,
      "type": "Fahrräder",
      "description": "Kette gerissen? Bremse quietscht? Die Schrauberbude regelt das."
    },
    {
      "name": "Kabel & Co Repair",
      "lat": 48.3530,
      "lng": 10.9154,
      "type": "Elektronik",
      "description": "Spezialisten für Kabelsalat und Wackelkontakte jeder Art."
    },
    {
      "name": "PhoneFix Augsburg",
      "lat": 48.3679,
      "lng": 10.8742,
      "type": "Smartphones",
      "description": "Display gebrochen? Akku schlapp? Handy-Reanimation vom Feinsten."
    },
    {
      "name": "AllesFix Augsburg",
      "lat": 48.3586,
      "lng": 10.8949,
      "type": "Allround",
      "description": "Ein Laden für alles – vom Staubsauger bis zur Spielkonsole."
    },
    {
      "name": "Mäxchen’s Reparaturkeller",
      "lat": 48.3631,
      "lng": 10.8901,
      "type": "Spielzeug",
      "description": "Hier werden Lieblingsspielzeuge mit Liebe repariert. Nostalgie pur!"
    },
    {
      "name": "ReparierMich!",
      "lat": 48.3549,
      "lng": 10.9058,
      "type": "Haushaltsgeräte",
      "description": "Deine Kaffeemaschine verdient ein zweites Leben – hier wird’s möglich."
    },
    {
      "name": "FixPalace",
      "lat": 48.3556,
      "lng": 10.9023,
      "type": "Elektronik",
      "description": "Königliche Technikreparaturen mit Style und Sorgfalt."
    },
    {
      "name": "ElektroEngel",
      "lat": 48.3604,
      "lng": 10.9087,
      "type": "Elektronik",
      "description": "Die himmlischen Helfer für deine Elektronik-Sorgen."
    },
    {
      "name": "Die Technikretter",
      "lat": 48.3517,
      "lng": 10.8784,
      "type": "Computer",
      "description": "IT-Sanitäter für PCs, Laptops und alles mit Tastatur."
    },
    {
      "name": "Fixflix Augsburg",
      "lat": 48.3642,
      "lng": 10.8741,
      "type": "Unterhaltungselektronik",
      "description": "Heimkino defekt? Fernseher tot? Wir bringen den Stream zurück."
    },
    {
      "name": "Schraub & Reparier",
      "lat": 48.3571,
      "lng": 10.8900,
      "type": "Fahrräder",
      "description": "Für alle, die lieber radeln als schieben – wir bringen’s wieder zum Laufen."
    },
    {
      "name": "Mr. Fix Augsburg",
      "lat": 48.3460,
      "lng": 10.9032,
      "type": "Smartphones",
      "description": "Der charmante Fixer für kaputte iPhones und Androids."
    },
    {
      "name": "HandyRetter24",
      "lat": 48.3322,
      "lng": 10.901,
      "type": "Smartphones",
      "description": "Dein Notfall-Service für alle mobilen Wehwehchen – 24/7 geöffnet!"
    },
    {
      "name": "Werkstatt Wunder",
      "lat": 48.3560,
      "lng": 10.9064,
      "type": "Möbel",
      "description": "Hier wird aus Schrott wieder Schönheit – Wunderwerke aus Holz."
    },
    {
      "name": "Der Reparaturheld",
      "lat": 48.3350,
      "lng": 10.906,
      "type": "Haushaltsgeräte",
      "description": "Held des Alltags – wenn Toaster & Mixer wieder leben."
    },
    {
      "name": "Augsburger Fixerei",
      "lat": 48.3637,
      "lng": 10.8990,
      "type": "Allround",
      "description": "Was kaputt ist, wird hier gemacht – ganz egal was."
    },
    {
      "name": "Der Technikdoktor",
      "lat": 48.3504,
      "lng": 10.8935,
      "type": "Computer",
      "description": "Diagnose, Therapie & Heilung für alles was Bits & Bytes hat."
    },
    {
      "name": "AllFix Augsburg",
      "lat": 48.3618,
      "lng": 10.9077,
      "type": "Allround",
      "description": "Vom Staubsauger über die Lampe bis zur Bohrmaschine – alles dabei."
    },
    {
      "name": "Reparaturpoint",
      "lat": 48.3599,
      "lng": 10.8999,
      "type": "Elektronik",
      "description": "Deine zentrale Anlaufstelle für kaputte Gadgets jeder Art."
    },
    {
      "name": "Gadget Garage",
      "lat": 48.3565,
      "lng": 10.8907,
      "type": "Elektronik",
      "description": "Hier kriegt dein Gameboy, Kopfhörer oder Drohne wieder Saft."
    },
    {
      "name": "ReparierBar",
      "lat": 48.3670,
      "lng": 10.8977,
      "type": "Kleidung",
      "description": "Reparieren statt Wegwerfen – Kleidung, Schuhe & Textilien in neuer Frische."
    },
    {
      "name": "ToolTime Augsburg",
      "lat": 48.3528,
      "lng": 10.9068,
      "type": "Werkzeug",
      "description": "Hammer abgebrochen? Bohrmaschine schwächelt? Die retten dein Werkzeug."
    },
    {
      "name": "Fixmaniac",
      "lat": 48.3542,
      "lng": 10.8879,
      "type": "Elektronik",
      "description": "Tech-Nerds mit Schraubenziehern – für alles, was Strom frisst."
    },
    {
      "name": "wie NEU",
      "lat": 48.363,
      "lng": 10.901,
      "type": "Kleidung",
      "description": "Alte Lieblingsstücke neu gemacht – stilvoll und nachhaltig."
    },
    {
      "name": "Pokécenter",
      "lat": 48.358,
      "lng": 10.91,
      "type": "Spielzeug",
      "description": "Nicht nur für Pokémon-Fans – Gameboys, Konsolen und Sammelkarten-Heilung."
    }
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
