import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { HeaderComponent } from './header/header.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { ProductPriceComponent } from './producto/product-price/product-price.component';

import { HttpModule } from '@angular/http';
import { CategoriaComponent } from './producto/categoria/categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    HeaderComponent,
    MenuLeftComponent,
    ProductPriceComponent,
    CategoriaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
