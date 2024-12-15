import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error.interceptor';


// import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ 
    provideHttpClient(
      withInterceptors([errorInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
