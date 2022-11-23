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
import { ConformationComponent } from './adminDialog/conformation/conformation.component';
import { SingleNftDetailsComponent } from './adminDialog/single-nft-details/single-nft-details.component';
import { IssueComponent } from './adminDialog/issue/issue.component';
import { HistoryComponent } from './adminDialog/history/history.component';
import { ExpireComponent } from './adminDialog/expire/expire.component';
import { UserOperationComponent } from './component/user/user-operation/user-operation.component';
import { UserNftComponent } from './component/user/user-nft/user-nft.component';
import { UserIssueComponent } from './userDialog/user-issue/user-issue.component';
import { UserHistoryComponent } from './userDialog/user-history/user-history.component';
import { ExternalOperationComponent } from './component/external/external-operation/external-operation.component';
import { ValidateNftComponent } from './component/external/validate-nft/validate-nft.component';
import { ValidateComponent } from './externalDialog/validate/validate.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePopupComponent,
    AdminOperationComponent,
    IssueNftComponent,
    AllNftComponent,
    SingleNftComponent,
    ConformationComponent,
    SingleNftDetailsComponent,
    IssueComponent,
    HistoryComponent,
    ExpireComponent,
    UserOperationComponent,
    UserNftComponent,
    UserIssueComponent,
    UserHistoryComponent,
    ExternalOperationComponent,
    ValidateNftComponent,
    ValidateComponent,
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
