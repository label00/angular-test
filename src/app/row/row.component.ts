import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

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
        type="text"
        [formControl]="item.control"
      />
    </td>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RowComponent {
  @Input() item: ItemModel;
}

interface ItemModel {
  id: number;
  name: string;
  score: number;
  control: FormControl;
}

export { RowComponent, ItemModel }
