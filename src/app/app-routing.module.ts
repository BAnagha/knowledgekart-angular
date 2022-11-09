import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './knowledgekart/admin/admin.component';
import { BooksComponent } from './knowledgekart/books/books.component';
import { OrdersComponent } from './knowledgekart/orders/orders.component';
import { ShoppingCartComponent } from './knowledgekart/shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './authentication.guard';


// const routes: Routes = [
//   { path: '', redirectTo: "/book", pathMatch: 'full' },
//   { path: 'book', component: BooksComponent,  pathMatch: 'full' ,  loadChildren: () => import('./knowledgekart/books/books.module').then(m => m.BooksModule),
//   canActivate: [AuthenticationGuard]},
//   { path: 'cart', component: ShoppingCartComponent,  pathMatch: 'full',  loadChildren: () => import('./knowledgekart/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
//   canActivate: [AuthenticationGuard] },
//   { path: 'orders', component: OrdersComponent,  pathMatch: 'full',  loadChildren: () => import('./knowledgekart/orders/orders.module').then(m => m.OrdersModule),
//   canActivate: [AuthenticationGuard] },
//   { path: 'admin', component: AdminComponent ,  loadChildren: () => import('./knowledgekart/admin/admin.module').then(m => m.AdminModule),
//   canActivate: [AuthenticationGuard]},
//   { path: 'login', component: LoginComponent,  loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
//     canActivate: [AuthenticationGuard] },
//   { path: '**', component: BooksComponent } // If no matching route found, go back to home route
// ];

const routes: Routes = [
  { path: '', component: BooksComponent, pathMatch: 'full', loadChildren: () => import('./knowledgekart/books/books.module').then(m => m.BooksModule),
    canActivate: [AuthenticationGuard] },
  { path: 'book', component: BooksComponent,  pathMatch: 'full', loadChildren: () => import('./knowledgekart/books/books.module').then(m => m.BooksModule),
    canActivate: [AuthenticationGuard]},
  { path: 'cart', component: ShoppingCartComponent,  pathMatch: 'full'  },
  { path: 'orders', component: OrdersComponent,  pathMatch: 'full' },
  { path: 'admin', component: AdminComponent,  pathMatch: 'full'  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: BooksComponent } // If no matching route found, go back to home route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppRoutingModule, BooksComponent, ShoppingCartComponent, OrdersComponent, AdminComponent, LoginComponent],
})
export class AppRoutingModule { }
