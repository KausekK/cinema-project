import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{


  displayUsersManagementComponent: boolean = false;
  displayShowManagementComponent: boolean = false;

  ngOnInit(): void {
  }


  
}
