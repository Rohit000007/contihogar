import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductoComponent} from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { GeneralComponent } from './general/general.component';
const routes: Routes = [
    {
        path: 'product',
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
        component:ProductoComponent
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouteModule { }