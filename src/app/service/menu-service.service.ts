import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/compat/firestore';
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

  menuId!: string;

  constructor(private firebase: AngularFirestore) {}

  getMenus(): Observable<Menu[]> {
    return of(this.menus);
  }

  fetchMenus() {
    this.firebase
      .collection('menus')
      .doc('xc43sds')
      .collection('menu-groups')
      .get()
      .subscribe(docs => docs.forEach(doc => console.log(doc.id)))
  }

  addMenuItem(newItem: Menu) {
    this.menus.push(newItem);
  }
}
