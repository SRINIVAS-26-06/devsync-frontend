// src/app/modules/project/project-detail/project-detail.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { NavbarComponent } from '../../../shared/navbar.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css'],
  imports: [CommonModule, RouterModule, NavbarComponent]
})
export class ProjectDetailComponent implements OnInit {
  projectId: string | null = null;
  project: any = null;
  errorMsg = '';
  showToast = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.fetchProject(this.projectId);
    }
  }

  fetchProject(id: string) {
    this.loading = true;
    this.http.get(`http://localhost:8080/api/projects/${id}`).pipe(
      catchError(() => {
        this.errorMsg = 'Project not found or failed to fetch.';
        this.showToast = true;
        return of(null);
      })
    ).subscribe((data) => {
      this.loading = false;
      if (data) {
        this.project = data;
      }
    });
  }

  closeToast() {
    this.showToast = false;
  }
}
