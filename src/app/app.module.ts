import {
  Component,
  NgModule,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ApiService } from "./ApiService";

@Component({
  // tslint:disable-next-line
  selector: "[header]",
  template: `
    <th>№</th>
    <th>Name</th>
    <th>Score</th>
    <th>Note</th>
  `
})
export class HeaderComponent {}

@Component({
  // tslint:disable-next-line
  selector: "[item-detail]",
  template: `
    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.score }}</td>
    <td>
      <input
        size="7"
        (change)="changeNote.emit({ id: item.id, value: $event.target.value })"
        value="{{ item.note }}"
      />
    </td>
  `
})
export class RowComponent implements OnChanges {
  @Input() item;
  @Output() changeNote = new EventEmitter();

  ngOnChanges() {
    console.log("inputs changes");
  }
}

@Component({
  selector: "app-component",
  providers: [ApiService],
  template: `
    <table border="2" cellpadding="5">
      <thead>
        <tr header></tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let item of items"
          item-detail
          (changeNote)="fn($event)"
          [item]="item"
        ></tr>
      </tbody>
    </table>
  `
})
export class AppComponent implements OnInit {
  items: {
    id: number;
    name: string;
    score: number;
    note?: string;
  }[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.handleChanges(changes => {
      this.items = this.calcScore(changes);
    });
  }

  fn(e) {
    console.log(e);
  }

  calcScore(items) {
    return items.map(item => ({
      ...item,
      score: Math.round((item.rate / 100) * 5)
    }));
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, RowComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
