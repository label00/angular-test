import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ApiService} from './ApiService';
import {RowComponent} from './row/row.component';
import {HeaderComponent} from './header/header.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-component',
  providers: [ApiService],
  template: `
    <table border="2" cellpadding="5">
      <thead>
        <tr header></tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let item of items; trackBy: trackByFn"
          item-detail
          [item]="item"
        ></tr>
      </tbody>
    </table>
  `
})
export class AppComponent implements OnInit {
  public items: {
    id: number;
    name: string;
    score: number;
    control?: FormControl;
  }[] = [];
  public controls: Map<number, FormControl> = new Map();
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.handleChanges(changes => {
      this.items = this.calcScore(changes);
    });
  }

  calcScore(items) {
    return items.map(item => ({
      ...item,
      score: Math.round((item.rate / 100) * 5),
      control: this.controls.has(item.id) ? this.controls.get(item.id) : this.controls.set(item.id, new FormControl()).get(item.id),
    }));
  }

  trackByFn(idx, item) {
    return item.id;
  }
}

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [AppComponent, RowComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
