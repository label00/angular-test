import {Component, OnInit} from '@angular/core';
import {ApiService} from './ApiService';
import {FormControl} from '@angular/forms';
import {ItemModel} from './row/row.component';

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
  public items: ItemModel[] = [];
  public noteControls: Map<number, FormControl> = new Map();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.handleChanges(changes => {
      this.items = this.calcScore(changes);
    });
  }

  public trackByFn(idx, item): void {
    return item.id;
  }

  private calcScore(items): ItemModel[] {
    return items.map(item => ({
      ...item,
      score: Math.round((item.rate / 100) * 5),
      control: this.getNoteControl(item.id),
    }));
  }

  private getNoteControl(id: number): FormControl {
    return this.noteControls.has(id) ? this.noteControls.get(id) : this.noteControls.set(id, new FormControl()).get(id);
  }
}
