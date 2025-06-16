import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturedPropertiesComponent } from './components/featured-property/featured-properties.component';
import { SearchComponent } from './components/property-search/search.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    HomePageComponent,
    BannerComponent,
    FeaturedPropertiesComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
})
export class HomeModule {}
