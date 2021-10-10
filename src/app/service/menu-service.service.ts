import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from '../shared/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menus: Menu[] = [
    {
      id: 'sdjkfhiweu',
      name: 'Item Name',
      description: 'Description',
      imgSrc: 'http://via.placeholder.com/200',
      price: '20'
    }
  ];

  constructor() {}

  getMenus(): Observable<Menu[]> {
    return of(this.menus);
  }

  addMenuItem(newItem: Menu) {
    this.menus.push(newItem);
  }
}
