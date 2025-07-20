import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { NavbarComponent } from '../../../shared/navbar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = {};
  stats = {
    projects: 0,
    sprints: 0,
    tasks: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchCounts();
    setTimeout(() => this.renderChart(), 500); // Delay for animation
  }

  fetchUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.user = payload;
  }

  fetchCounts() {
    this.http.get('http://localhost:8080/api/projects').subscribe((res: any) => {
      this.stats.projects = res.length;
    });

    this.http.get('http://localhost:8080/api/sprints').subscribe((res: any) => {
      this.stats.sprints = res.length;
    });

    this.http.get('http://localhost:8080/api/tasks').subscribe((res: any) => {
      this.stats.tasks = res.length;
    });
  }

  renderChart() {
    this.http.get<any[]>('http://localhost:8080/api/tasks').subscribe((tasks) => {
      const statusCount: { [key in 'TO_DO' | 'IN_PROGRESS' | 'DONE']: number } = { TO_DO: 0, IN_PROGRESS: 0, DONE: 0 };
      tasks.forEach((t) => statusCount[t.status as 'TO_DO' | 'IN_PROGRESS' | 'DONE']++);

      new Chart('taskChart', {
        type: 'doughnut',
        data: {
          labels: ['TO DO', 'IN PROGRESS', 'DONE'],
          datasets: [
            {
              data: [statusCount.TO_DO, statusCount.IN_PROGRESS, statusCount.DONE],
              backgroundColor: ['#f87171', '#60a5fa', '#34d399']
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }
}
