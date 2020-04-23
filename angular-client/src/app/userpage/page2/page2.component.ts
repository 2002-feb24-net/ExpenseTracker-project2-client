import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PageService } from 'src/app/page.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  constructor(public service: PageService,
    private toastr: ToastrService) { }

  ngOnInit() { this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      id: 0,
      name: '',
      phoneNumber: '',
      email: '',
      address:'',
      password:'',
      membership: false,
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0)
   { this.resetForm(form);
    this.toastr.info('Invalid User', 'User Does not exist');
   }
   else
      this.updateRecord(form);
  }

  // insertRecord(form: NgForm) {
  //   this.service.postUser().subscribe(
  //     res => {
  //       debugger;
  //       this.resetForm(form);
  //       this.toastr.success('Submitted successfully', 'Payment Detail Register');
  //       this.service.refreshList();
  //     },
  //     err => {
  //       debugger;
  //       console.log(err);
  //     }
  //   )
  // }
  updateRecord(form: NgForm) {
    this.service.putUser().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
