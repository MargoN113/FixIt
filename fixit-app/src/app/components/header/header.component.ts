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

}
