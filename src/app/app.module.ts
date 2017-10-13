import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './producto/producto.component';
import { HeaderComponent } from './header/header.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { ProductPriceComponent } from './producto/product-price/product-price.component';

import { HttpModule } from '@angular/http';
import { CategoriaComponent } from './producto/categoria/categoria.component';
import { ProductItemComponent } from './producto/product-item/product-item.component';
import { ImageManagerComponent } from './producto/image-manager/image-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    HeaderComponent,
    MenuLeftComponent,
    ProductPriceComponent,
    CategoriaComponent,
    ProductItemComponent,
    ImageManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
