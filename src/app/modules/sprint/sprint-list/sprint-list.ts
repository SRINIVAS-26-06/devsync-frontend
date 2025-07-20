import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './sprint-list.html',
  styleUrls: ['./sprint-list.css']
})
export class SprintListComponent implements OnInit {
  sprints: any[] = [];
  loading = true;
  errorMsg = '';
  showToast = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.loading = true;
    this.http.get<any[]>('http://localhost:8080/api/sprints').subscribe({
      next: (data) => {
        this.sprints = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load sprints.';
        this.loading = false;
        this.showToast = true;
      }
    });
  }

  closeToast() {
    this.showToast = false;
  }
}
