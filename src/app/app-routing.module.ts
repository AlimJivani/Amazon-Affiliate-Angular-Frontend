import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  {
    path: 'products',
    children: [
      { path: 'category/:id', component: ProductComponent },
      { path: 'category/:id/subcategories/:sid', component: ProductComponent },
      // { path: 'category/:id/subcategories/:sid', component: ProductComponent },
      // { path: 'page/:pid', component: ProductComponent },
      // http://localhost:4200/products/category/1/subcategories/3/page/1
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
