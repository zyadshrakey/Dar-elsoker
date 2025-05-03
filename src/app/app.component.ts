import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { IsLoaderService } from './services/loader/is-loader.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NzSkeletonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public _IsLoaderService: IsLoaderService) {}
  title = 'dar-elsoker';
}
