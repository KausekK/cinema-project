import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../common/admin';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{


  displayUsersManagementComponent: boolean = false;

  ngOnInit(): void {
  }


  
}
