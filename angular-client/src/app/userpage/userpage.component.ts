import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
