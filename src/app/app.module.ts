import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './home/search/search.component';
import { BoxDishComponent } from './home/box-dish/box-dish.component';
import { PaginationComponent } from './home/pagination/pagination.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/service/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SearchComponent,
    BoxDishComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"culinary-e5f78","appId":"1:348288095356:web:95787bf93b91197471e5f9","storageBucket":"culinary-e5f78.appspot.com","apiKey":"AIzaSyBFZPWFttgboDyuP4ctbWHoyANQOFEpwlg","authDomain":"culinary-e5f78.firebaseapp.com","messagingSenderId":"348288095356"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
