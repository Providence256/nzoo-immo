import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturedPropertiesComponent } from './components/featured-property/featured-properties.component';
import { SearchFiltersComponent } from './components/property-search/property-search.component';

@NgModule({
  declarations: [
    HomePageComponent,
    BannerComponent,
    FeaturedPropertiesComponent,
    SearchFiltersComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }