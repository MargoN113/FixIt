import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  pages: any[] = [
    {id: "map", name: "Map"},
    {id: "about", name: "About us"},
    {id: "register", name: "Register"}
  ];
  ngAfterViewInit(): void {
  }

  //header wird gehovert mit der maus
  headerHoverStart() {
    //gibt dem header die css Klasse um die Seiten Reiter anzuzeigen
    document.getElementById("header")?.classList.add('header-extended');
    //gibt dem header die volle Bildschirmbreite
    document.documentElement.style.setProperty(`--header-width`, "100vw");
  }

  headerHoverEnd() {
    //entfernt die css Klasse um die Seiten Reiter anzuzeigen
    document.getElementById("header")?.classList.remove('header-extended');
    //setzt auf die kleinere breite zurück. detailansicht? -> 800px, sonst 400px
    document.documentElement.style.setProperty(`--header-width`, document.getElementsByClassName("show-details")?.length === 0 ? "400px" : "800px");
  }
}
