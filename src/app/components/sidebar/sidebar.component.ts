import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoties!: any;
  cId: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.categories().subscribe((data) => {
      this.categoties = data;
    });
  }

  sendCategoryId(cId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/category/', cId]); // navigate to same route
    });
  }
  sendSubCategoryId(cId: any , sId: any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/category',cId,'subcategories',sId]); // navigate to same route
    });
  }
}


