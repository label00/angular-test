import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

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
        [formControl]="item.control"
      />
    </td>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @Input() item;
}
