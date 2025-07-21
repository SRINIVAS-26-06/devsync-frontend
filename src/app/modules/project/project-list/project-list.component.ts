// src/app/modules/project/project-list/project-list.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/navbar.component';


interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  const token = localStorage.getItem('token');

  this.http.get<Project[]>('http://localhost:8080/api/projects', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (data) => {
      this.projects = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Fetch error:', err);
      this.error = 'Failed to fetch projects.';
      this.loading = false;
    }
  });
}

}
