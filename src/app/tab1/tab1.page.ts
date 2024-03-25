import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { PageQueryService } from '../services/page-query.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  constructor(
    public pageQuery: PageQueryService,
    public loading: LoadingService,
    private http: HttpService,
    private modalController: ModalController
  ) { }
  @ViewChild('modal') Modal: any;

  private apiPath = 'companies';
  data: any = {};
  deleteModal = false;

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
