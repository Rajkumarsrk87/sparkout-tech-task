import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { ProductComponent } from './components/product/product.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CartComponent } from './components/cart/cart.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    LayoutComponent,
    FilterPipe,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
