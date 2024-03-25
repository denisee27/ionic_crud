import { Component, ElementRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private http: HttpService,
    private el: ElementRef,
    public loading: LoadingService,
    private toastr: ToastrService
    ) {}

    private apiPath = 'companies';
    parentList: any = [];
    stayPage: boolean = false;
    formGroup = new FormGroup({
        code: new FormControl(null),
        name: new FormControl(null),
        description: new FormControl(null),
        status: new FormControl(1)
    });
    formChanged = false;

  submitForm(form: any): void {
    if (!form.valid) {
        this.el.nativeElement.querySelectorAll('[formcontrolname].ng-invalid')?.[0]?.focus();
        return;
    }
    form.disable();
    form.value.status = Number(form.value.status);
    let fdata = new FormData();
    fdata.append('data', JSON.stringify(form.value));
    this.http.Post(this.apiPath + '/create', fdata).then((r: any) => {
        form.enable();
        if (r.success) {
            form.enable();
        } else {
            if (r.response && r.response.wrong) {
                // Object.keys(r.response.wrong).forEach((key) => {
                //     if (key != 'id') {
                //         form.get(key)?.setErrors({ serverError: r.response.wrong[key][0] });
                //         this.el.nativeElement.querySelectorAll('[formcontrolname="' + key + '"]')?.[0]?.focus();
                //     }
                // });
            }
        }
    });
}
}
