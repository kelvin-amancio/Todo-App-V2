import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interfaces/IListItem';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  @Input({required:true}) inputListItems: Array<IListItems> =[];
  @Output() public outputDeleteItem = new EventEmitter<string>();
  @Output() outputUpdateItemCheckbox = new EventEmitter<{id: string;checked: boolean;}>();
  @Output() public outputUpdateItemText = new EventEmitter<{id: string;value: string;}>();

  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }

  public deleteItem(id: string) {
    return this.outputDeleteItem.emit(id);
  }
}
