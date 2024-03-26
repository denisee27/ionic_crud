import { Component,Optional } from '@angular/core';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet?.canGoBack()) {
          this.isToastOpen = true;
        // App.exitApp();
      }
    });
  }
  isToastOpen = false;
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  
}
