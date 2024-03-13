import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, viewChild } from '@angular/core';
import { IListItems } from '../../interfaces/IListItem';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  @ViewChild("inputText") inputText!: ElementRef;
  @Output() outputAddListItem = new EventEmitter<IListItems>();
  @Input({required:true}) inputListItems:  Array<IListItems> = [];
  #cdr = inject(ChangeDetectorRef);

    focusAndAddItem(value:string){
      if(value){
        this.#cdr.detectChanges();
        this.inputText.nativeElement.value = "";

        const currentDate = new Date();
        const timeStamp = currentDate.getTime();
        const id = timeStamp.toString();

        this.outputAddListItem.emit({
          id,
          checked:false,
          value
        });
        
        return this.inputText.nativeElement.focus();
      }
      
    }
}
