//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ParticlesModule } from 'angular-particle';


//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home//home.component';

//Services
import { RestLoginService } from './services/login/restLogin.service';
import { RestNuevaCuentaService } from './services/crearCuenta/restNuevaCuenta.service';

//Rutas de la aplicación
import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    ParticlesModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RestLoginService,
    RestNuevaCuentaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
