import { Component, OnInit } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { PageService } from '../../services/page.service';
import { ToastrService } from 'ngx-toastr';
import Users from 'src/app/models/users';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(public service: PageService, private toastr: ToastrService ) { }

  ngOnInit() {
    this.service.refreshList();
  };

  populateForm(u: Users) {
    this.service.formData = Object.assign({}, u);
  }
//  resetForm(form?: NgForm){
//    if(form!=null)
//    form.resetForm();
//    this.service.formData = {
// id: 0,
// Name: '',
// Password:'',
// PhoneNumber:'',
// Address:'',
// Email:''
//    }
//  }
//   onSubmit(form: NgForm){
//     this.resetForm(form);
// this.toastr.success("Submitted","user detail");

onDelete(id) {
  if (confirm('Are you sure to delete this record ?')) {
    this.service.deleteUser(id)
      .subscribe(res => {

        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'user deleted');
      },
        err => {
   
          console.log(err);
        })
  }
  }

}
