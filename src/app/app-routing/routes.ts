import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component'; 
import {RouterModule, Routes} from '@angular/router';

export const routes : Routes =[
    {path: 'home' , component: HomeComponent },
    {path: 'about' , component: AboutComponent },
    {path: 'menu' , component: MenuComponent },
    {path: '' , redirectTo: '/home' ,pathMatch :'full' }
];