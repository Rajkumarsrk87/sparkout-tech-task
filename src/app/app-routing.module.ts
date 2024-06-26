import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ProductComponent } from './components/product/product.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';

const routes: Routes = [
  { path: "", component: UserLoginComponent },
  { path: "registration", component: UserRegistrationComponent },
  { path: "login", component: UserLoginComponent },
  { path: "product", component: ProductComponent },
  { path: "layout", component: LayoutComponent },
  { path: "cart", component: CartComponent },
  { path: "createProduct", component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
