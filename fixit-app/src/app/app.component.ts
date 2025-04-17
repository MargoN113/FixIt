import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fixit-app';

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
