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
import { CategoryFilterPipe } from './pipi/category-filter.pipe';
import { MessageManagerComponent } from './message-manager/message-manager.component';
import { GeneralComponent } from './general/general.component';
import { ProveedorComponent } from './proveedor/proveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    HeaderComponent,
    MenuLeftComponent,
    ProductPriceComponent,
    CategoriaComponent,
    ProductItemComponent,
    ImageManagerComponent,
    CategoryFilterPipe,
    MessageManagerComponent,
    GeneralComponent,
    ProveedorComponent
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
