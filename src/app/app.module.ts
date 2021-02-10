import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import  {MatListModule} from '@angular/material/list';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule } from '@angular/material/dialog';//for dialog
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'; 
import { PromotionService } from './services/promotion.service';
import { DishService } from './services/dish.service';
import { LoginComponent } from './login/login.component';

import {AppRoutingModule} from './app-routing/app-routing.module';
import { LeaderService } from './services/leader.service';
import { LeaderComponent } from './leader/leader.component';
import { HttpClientModule } from '@angular/common/http';

import {baseURL} from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DishdetailComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LeaderComponent,
    LoginComponent

  ],
  imports: [ //importe modules that this app is dependent on
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    ReactiveFormsModule
    
  ],
  entryComponents:[ //makae this components be opened from another component
    LoginComponent
  ],
  providers: [DishService , PromotionService, LeaderService,ProcessHTTPMsgService,
              {provide : 'BaseURL' , useValue : baseURL}
             ],//specify the services that this module will make use of
  bootstrap: [AppComponent]// AppComponent is the root component of our app
})
export class AppModule { }
