import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: any = '';
  password: any = '';
  submitted: any = false;
  hide: boolean = true;
  errorMsgShow: boolean = false;
  invalidMsgShow: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dashboardService : DashboardService,
    private spinner : NgxSpinnerService,
    )
    {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
   }

  ngOnInit() {}


  onSubmit() {
    this.errorMsgShow = false;
    this.invalidMsgShow = false;
    if(this.loginForm.invalid){
      for (var i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsTouched();
        this.errorMsgShow = true;
      }
      return;
    }
    this.spinner.show();
    var data = {username:this.username,password:this.password};
    this.dashboardService.loginSave(data).subscribe({next: (res:any) => {
        localStorage.setItem('token',res.token);
        this.spinner.hide();
        this.router.navigate(['core/map']);
      },
      error: err => {
        this.spinner.hide();
        this.invalidMsgShow = true;
        // this.toastr.error(err.error.message, "Error Something Went Wrong");
      }
    });
  }

  showPassword() {
    this.hide = !this.hide;
  }





}
