import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { SpecificSubCategoryComponent } from './components/specific-sub-category/specific-sub-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'brands', component: BrandsComponent },
    { path: 'brands/:id', component: BrandDetailsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:id', component: CategoryDetailsComponent },
    { path: 'categories/:id/subcategories', component: SubCategoriesComponent },
    { path: 'subcategories/:id', component: SpecificSubCategoryComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckOutComponent },
    { path: '**', component: NotFoundComponent },  // wildcard

];
