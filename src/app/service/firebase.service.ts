import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { MenuGroup, MenuItem } from '../shared/menu.interface';
import { MenuService } from './menu-service.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  menuDoc!: AngularFirestoreDocument;

  constructor(
    private firebase: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  fetchMenu(menuId: string) {
    this.menuDoc = this.firebase.collection('menus').doc(menuId);
  }

  fetchMenuGroups(): Promise<MenuGroup[]> {
    try {
      let menuGroupArr: MenuGroup[] = [];

      return new Promise((resolve, rej) => {
        this.menuDoc
          .collection('menu-groups')
          .get()
          .subscribe(menuGroupDocs => {
            menuGroupDocs.forEach(menuGroupDoc => {
              // Get document reference for each document in 'menu-groups'
              const menuGroupDocRef = menuGroupDoc.ref;

              // Set up the parent menu group object
              const menuGroup: MenuGroup = {
                id: menuGroupDoc.id,
                menuItems: [],
                ...menuGroupDoc.data()
              };

              // Get each menu in 'menu-groups' reference and add is to the parent menu group
              menuGroupDocRef
                .collection('menu-items')
                .get()
                .then(menuItems => {
                  menuItems.forEach(menuItem => {
                    const menuItemData: MenuItem = {
                      id: menuItem.id,
                      ...menuItem.data()
                    };
                    menuGroup.menuItems?.push(menuItemData);
                    this.sortMenu(menuGroup.menuItems);
                  });
                })
                .catch(err => {
                  console.error(err);
                });

              // Push each menu group data to the main menu group array
              menuGroupArr.push(menuGroup);
              this.sortMenu(menuGroupArr);
            });
            resolve(menuGroupArr);
          });
      });
    } catch (err) {
      throw err;
    }
  }

  addMenuItem() {}

  editMenuItem() {}

  deleteMenuItem() {}

  addMenuGroup() {}

  editMenuGroup() {}

  deleteMenuGroup() {}

  ///////////////////////////////////////////////////////
  // Helper functions
  private sortMenu(menuArray: any[] | undefined): void {
    if (menuArray == undefined) {
      return;
    }

    // console.log(menuArray[0], menuArray.length);

    menuArray.sort((a, b) => {
      if (a.order - b.order < 0) {
        return -1;
      } else if (a.order - b.order > 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
