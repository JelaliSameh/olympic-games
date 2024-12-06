import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OlympicService } from './core/services/olympic.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  providers: [OlympicService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  data: any[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
