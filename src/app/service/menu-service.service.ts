import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuOptions
} from '../shared/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuId: string = 'xc43sds';
  menuOptions!: MenuOptions;
  menuGroups: MenuGroup[] = [];

  constructor(private firebase: AngularFirestore) {}

  fetchMenu(): Observable<MenuGroup[]> {
    this.firebase
      .collection('menus')
      .doc(this.menuId)
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
              });

              // Sort menu items in there added order
              menuGroup.menuItems = this.sortMenu(menuGroup.menuItems);
            })
            .catch(err => {
              console.error(err);
            });

          // Push each menu group data to the main menu group array
          this.menuGroups.push(menuGroup);
          this.menuGroups = this.sortMenu(this.menuGroups);
        });
      });
    return of(this.menuGroups);
  }

  addMenuItem(menuGroupId: string, menuItem: MenuItem): void {
    // Set the order of the newly added Item
    let order = 0;

    if (this.menuGroups.length > 0) {
      for (let i = 0; i < this.menuGroups.length; i++) {
        if (menuGroupId === this.menuGroups[i].id) {
          order = <number>this.menuGroups[i].menuItems?.length;
        }
      }
    }

    const menuItemData = {
      order: order,
      ...menuItem
    };

    this.firebase
      .collection('menus')
      .doc(this.menuId)
      .collection('menu-groups')
      .doc(menuGroupId)
      .collection('menu-items')
      .add(menuItemData)
      .then(docRef => {
        // console.log('Document written with ID: ', docRef.id);
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            this.menuGroups[i].menuItems?.push({
              id: docRef.id,
              ...menuItem
            });
            break;
          }
        }
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  editMenuItem(
    menuGroupId: string,
    menuItemID: string,
    menuItem: MenuItem
  ): void {
    this.firebase
      .collection('menus')
      .doc(this.menuId)
      .collection('menu-groups')
      .doc(menuGroupId)
      .collection('menu-items')
      .doc(menuItemID)
      .update(menuItem)
      .then(() => {
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            const itemArr = <MenuItem[]>this.menuGroups[i].menuItems;

            for (let j = 0; j < itemArr.length; j++) {
              if (itemArr[j].id === menuItemID) {
                itemArr[j] = menuItem;
              }
              break;
            }
          }
        }
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  addMenuGroup(menuGroup: MenuGroup): void {
    // Set the order of the newly added Item
    let order = this.menuGroups.length;

    const menuGroupData: MenuGroup = {
      order: order,
      ...menuGroup
    };

    this.firebase
      .collection('menus')
      .doc(this.menuId)
      .collection('menu-groups')
      .add(menuGroupData)
      .then(docRef => {
        this.menuGroups.push({
          id: docRef.id,
          menuItems: [],
          ...menuGroup
        });
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  editMenuGroup(menuGroupId: string, menuGroup: MenuGroup): void {
    this.firebase
      .collection('menus')
      .doc(this.menuId)
      .collection('menu-groups')
      .doc(menuGroupId)
      .update(menuGroup)
      .then(() => {
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            this.menuGroups[i] = menuGroup;
          }
        }
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  ///////////////////////////////////////////////////////
  // Helper functions
  private sortMenu(menuArray: any[] | undefined): any[] {
    if (menuArray == undefined) {
      return [];
    }

    return menuArray.sort((a, b) => {
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
