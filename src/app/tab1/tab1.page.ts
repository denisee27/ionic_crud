import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { PageQueryService } from '../services/page-query.service';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  constructor(
    public pageQuery: PageQueryService,
    public loading: LoadingService,
    private el: ElementRef,
    private http: HttpService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) { }
  @ViewChild('modal') Modal: any;
  @ViewChild('update') update: IonModal;
  @ViewChild('theForm') theForm: NgForm | undefined;

  private apiPath = 'companies';
  data: any = {};
  formGroup = this.fb.group({});
  deleteModal = false;
  updateModal = false;

  deleteDialog: any = {
    ids: [],
    modal: null,
    show: (ids: Array<any>) => {
      this.deleteDialog.ids = Array.isArray(ids) ? ids : [ids];
      this.deleteModal = true
    },
    close:() => {
      this.deleteModal = false
    },
    submit: () => {
        this.http.Delete(this.apiPath + '/delete', this.deleteDialog.ids).then((r: any) => {
            if (r.success) {
                this.data = r?.response?.result || {};
                this.deleteModal = false
                this.getData()
              }
        });
    }
}
  updateDialog: any = {
    ids: [],
    data:[],
    modal: null,
    formGroup: new FormGroup({}), // Menambahkan FormGroup di dalam objek updateDialog
    show: (ids: Array<any>) => {
      this.updateDialog.ids = Array.isArray(ids) ? ids : [ids];
      var updateData = this.data.data.filter((e:any) => e.id == ids);      
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.removeControl(key);
      });
      Object.keys(updateData[0]).forEach((key) => {
        this.formGroup.addControl(key, new FormControl(updateData[0][key]));
      });
      this.updateModal = true;
    },
    close:() => {
      this.updateModal = false
    },
    submit: () => {
        this.http.Delete(this.apiPath + '/delete', this.updateDialog.ids).then((r: any) => {
            if (r.success) {
                this.data = r?.response?.result || {};
                this.updateModal = false
                this.getData()
              }
        });
    }
}

cancel() {
  this.update.dismiss(null, 'cancel');
}

confirm() {
  this.update.dismiss();
}

  getData(): void {
    const query: any = this.pageQuery.query.getValue() || {};
    query.limit = query?.limit || 10;
    query.page = query?.page || 1;
    this.http.Get(this.apiPath, query).then((r: any) => {
      if (r.success) {
        this.data = r?.response?.result || {};
      }
    });
  }

  submitForm(form: any): void {
    if (!form.valid) {
        this.el.nativeElement.querySelectorAll('[formcontrolname].ng-invalid')?.[0]?.focus();
        return;
    }

    let fdata = new FormData();
    form.value.status = Number(form.value.status);
    fdata.append('data', JSON.stringify(form.value));
    form.disable();
    this.http.PostFile(this.apiPath + '/update', fdata).then((r: any) => {
        form.enable();
        if (r.success) {
          this.getData()
          this.updateModal = false
        } else {
            if (r.response && r.response.wrong) {
                Object.keys(r.response.wrong).forEach((key) => {
                    form.get(key)?.setErrors({ serverError: r.response.wrong[key][0] });
                    this.el.nativeElement.querySelectorAll('[formcontrolname="' + key + '"]')?.[0]?.focus();
                });
            }
        }
    });
}
  
  ionViewDidEnter(){
  this.getData()
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.pageQuery.destroy();
}



}
