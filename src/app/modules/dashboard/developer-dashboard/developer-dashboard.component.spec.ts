import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperDashboardComponent } from './developer-dashboard.component';

describe('DeveloperDashboard', () => {
  let component: DeveloperDashboardComponent;
  let fixture: ComponentFixture<DeveloperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
