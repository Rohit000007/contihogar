import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRouteModule } from './app.route.module';
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';

import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { HeaderComponent } from './header/header.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { ProductPriceComponent } from './producto/product-price/product-price.component';
import { CategoriaComponent } from './producto/categoria/categoria.component';
import { ProductItemComponent } from './producto/product-item/product-item.component';
import { ImageManagerComponent } from './producto/image-manager/image-manager.component';
import { CategoryFilterPipe } from './pipi/category-filter.pipe';
import { MessageManagerComponent } from './message-manager/message-manager.component';
import { GeneralComponent } from './general/general.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { MerchComponent } from './merch/merch.component';
import { CategoryComponent } from './category/category.component';
import { RouterModule } from '@angular/router';

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
    ProveedorComponent,
    MerchComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouteModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
