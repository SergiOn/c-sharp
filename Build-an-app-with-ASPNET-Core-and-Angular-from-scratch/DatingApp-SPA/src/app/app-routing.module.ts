import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes-guard.service';
// import { MemberListResolver } from './_resolver/member-list.resolver';
// import { MemberDetailResolver } from './_resolver/member-detail.resolver';
// import { MemberEditResolver } from './_resolver/member-edit.resolver';
// import { ListsResolver } from './_resolver/lists.resolver';
// import { MessagesResolver } from './_resolver/messages.resolver';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent,
}, {
  path: '',
  // runGuardsAndResolvers: 'always',
  canActivate: [AuthGuard],
  children: [{
    path: 'members',
    component: MemberListComponent,
    // resolve: { user: MemberListResolver }
  }, {
    path: 'members/:id',
    component: MemberDetailComponent
    // resolve: { user: MemberDetailResolver }
  }, {
    path: 'member/edit',
    component: MemberEditComponent,
    // resolve: { user: MemberEditResolver },
    canDeactivate: [PreventUnsavedChangesGuard]
  }, {
    path: 'messages',
    component: MessagesComponent
    // resolve: { messages: MessagesResolver }
  }, {
    path: 'lists',
    component: ListsComponent
    // resolve: {users: ListsResolver}
  }]
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
