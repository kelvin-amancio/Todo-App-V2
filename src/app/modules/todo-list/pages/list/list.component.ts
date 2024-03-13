import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interfaces/IListItem';
import { JsonPipe } from '@angular/common';
import { InputListItemComponent } from "../../components/input-list-item/input-list-item.component";
import { ELocalStorage } from '../../enum/ELocalStorage';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list',
    standalone: true,
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    imports: [InputAddItemComponent, JsonPipe, InputListItemComponent]
})
export class ListComponent {
  outputValue = signal("Output Sem Valor");
  addItem = signal(true);
  #setListItems = signal<IListItems[]>(this.#parseItems());
  getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) ?? '[]');
  }

  #updateLocalStorage(){
    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItems()));
  }

  getInputAndAddItem(value:IListItems){
    localStorage.setItem(ELocalStorage.MY_LIST,JSON.stringify([...this.#setListItems(), value]))
    this.outputValue.set(value.value);
    return this.#setListItems.set(this.#parseItems());
  }

  listItemStage(stage: 'pending' | 'completed'){
      return this.getListItems().filter((res : IListItems) => {
          if(stage == 'pending')
            return !res.checked;
          
          if(stage == 'completed')  
            return res.checked;

          return res;
      })
  }

  updateItemCheckbox(newItem : {id:string, checked:boolean}){
      this.#setListItems.update((oldValue: IListItems[]) =>{
        oldValue.filter(res => {
            if(res.id === newItem.id){
              res.checked = newItem.checked;
              return res;
            }
            return res;
        })
        return oldValue;
      });
      return this.#updateLocalStorage();
  }

  updateItemText(newItem : {id:string, value:string}){
    this.#setListItems.update((oldValue: IListItems[]) =>{
      oldValue.filter(res => {
          if(res.id === newItem.id){
            res.value = newItem.value;
            return res;
          }
          return res;
      })
      return oldValue;
    });
    return this.#updateLocalStorage();
  }

  deleteItem(id:string){
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete o item',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });

        return this.#updateLocalStorage();
      }
    });
  }

  deleteAllItems(){
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete tudo',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }

}
