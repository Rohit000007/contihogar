import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductoComponent} from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { GeneralComponent } from './general/general.component';
import { CategoryComponent } from './category/category.component';
import { MerchComponent } from './merch/merch.component';
import { PedidoComponent } from './operaciones/pedido/pedido.component';

const routes: Routes = [
    {
        path:'',
        component:GeneralComponent,
        pathMatch: 'full'
    },
    {
        path: 'product/:id',
        component:ProductoComponent
    },
    {
        path:'supplier',
        component:ProveedorComponent
    },
    {
        path:'general',
        component:GeneralComponent
    },
    {
        path:'category',
        component:CategoryComponent
    },
    {
        path:'merge',
        component:MerchComponent
    },
    {
        path:'pedido',
        component:PedidoComponent
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouteModule { }