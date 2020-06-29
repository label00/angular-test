import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RowComponent} from './row/row.component';
import {HeaderComponent} from './header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';


@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, RowComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
