import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KnowledgekartComponent } from './knowledgekart/knowledgekart.component';
import { BooksComponent } from './knowledgekart/books/books.component';
import { OrdersComponent } from './knowledgekart/orders/orders.component';
import { ShoppingCartComponent } from './knowledgekart/shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './knowledgekart/admin/admin.component';
import { Globals } from './knowledgekart/globals';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    KnowledgekartComponent,
    BooksComponent,
    OrdersComponent,
    ShoppingCartComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
