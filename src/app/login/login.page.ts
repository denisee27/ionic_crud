import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  isShowPassword = false;
  loginForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  submitForm(loginForm: any): void {
    if (!loginForm.valid) {
      // this.el.nativeElement.querySelectorAll('[formcontrolname].ng-invalid')?.[0].focus();
      return;
    }
    loginForm.disable();
    this.auth.login(loginForm.value.email, loginForm.value.password).then((res: any) => {
      console.log(res)
      if (res.success) {
        const returnUrl = this.route.snapshot.queryParams['return'] || '/';
        this.router.navigateByUrl(returnUrl);
      } else {
        loginForm.enable();
        if (res.response && res.response.wrong) {
          Object.keys(res.response.wrong).forEach((key) => {
            loginForm.get(key)?.setErrors({ serverError: res.response.wrong[key][0] });
            this.el.nativeElement.querySelectorAll('[formcontrolname="' + key + '"]')?.[0]?.focus();
          });
          return;
        }
        // const title = res.response?.message || 'Oops';
        // const desc = res.response?.description || 'Unknown Error';
        // this.toastr.error(desc, title);
      }
    });
  }
  toggleShow() {
    this.isShowPassword = !this.isShowPassword;
    // this.form.type = this.isShowPassword ? 'text' : 'password';
  }

  ngOnInit() {
  }

}
