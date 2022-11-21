import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { HomePopupComponent } from './dialog/home-popup/home-popup.component';
import { AdminOperationComponent } from './component/admin/admin-operation/admin-operation.component';
import { IssueNftComponent } from './component/admin/issue-nft/issue-nft.component';
import { AllNftComponent } from './component/admin/all-nft/all-nft.component';
import { SingleNftComponent } from './component/admin/single-nft/single-nft.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePopupComponent,
    AdminOperationComponent,
    IssueNftComponent,
    AllNftComponent,
    SingleNftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
