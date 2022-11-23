import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { AdminOperationComponent } from './component/admin/admin-operation/admin-operation.component';
import { AllNftComponent } from './component/admin/all-nft/all-nft.component';
import { IssueNftComponent } from './component/admin/issue-nft/issue-nft.component';
import { SingleNftComponent } from './component/admin/single-nft/single-nft.component';
import { ExternalOperationComponent } from './component/external/external-operation/external-operation.component';
import { ValidateNftComponent } from './component/external/validate-nft/validate-nft.component';
import { UserNftComponent } from './component/user/user-nft/user-nft.component';
import { UserOperationComponent } from './component/user/user-operation/user-operation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: "admin", children: [
      {
        path: 'adminoperation', component: AdminOperationComponent ,canActivate:[AuthGuard], children: [
          { path: 'issueNft', component: IssueNftComponent, canActivate:[AuthGuard]},
          { path: 'allNft', component: AllNftComponent ,canActivate:[AuthGuard]},
          { path: "singleNft/:nftOwner", component: SingleNftComponent, canActivate:[AuthGuard] }
        ]
      },
    ]
  },
  {path:"user", children:[
    {path:"userOperation",component:UserOperationComponent,canActivate:[AuthGuard] ,children:[
      {path:"userNft", component:UserNftComponent ,canActivate:[AuthGuard]},
    ]},  
  ]},
  {path:'external', children:[
    {path:"externalOperation", component:ExternalOperationComponent, canActivate:[AuthGuard], children:[
      {path:"validateNft", component:ValidateNftComponent, canActivate:[AuthGuard]}]},  
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
