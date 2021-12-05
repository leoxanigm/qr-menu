import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { MenuGroup, MenuItem, MenuOptions } from '../shared/menu.interface';
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuId: string = 'xc43sds';
  menuOptions!: MenuOptions;
  menuGroups: MenuGroup[] = [];

  menuDoc!: AngularFirestoreDocument;

  constructor(
    private firebase: AngularFirestore,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService
  ) {
    this.menuDoc = this.firebase.collection('menus').doc(this.menuId);

    this.firebaseService.fetchMenu(this.menuId);
  }

  fetchMenu(): Observable<MenuGroup[]> {
    return from(
      this.firebaseService.fetchMenuGroups().then(resp => {
        this.menuGroups = resp;
        return this.menuGroups;
      })
    );
  }

  addMenuItem(menuGroupId: string, menuItem: MenuItem, imgBlob: File): void {
    if (this.menuDoc == undefined) return;

    // Set the order of the newly added Item
    let order = 0;

    if (this.menuGroups.length > 0) {
      for (let i = 0; i < this.menuGroups.length; i++) {
        if (menuGroupId === this.menuGroups[i].id) {
          order = <number>this.menuGroups[i].menuItems?.length;
        }
      }
    }

    this.uploadImg(menuGroupId, menuItem, imgBlob).then(itemData => {
      const menuItemData = {
        order: order,
        ...itemData
      };

      this.menuDoc
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
                ...menuItemData
              });
              break;
            }
          }
        })
        .catch(err => console.error('Error writing document: ', err));
    });
  }

  editMenuItem(
    menuGroupId: string,
    menuItemID: string,
    menuItem: MenuItem
  ): void {
    if (this.menuDoc == undefined) return;

    this.menuDoc
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

  deleteMenuItem(menuGroupId: string, menuItemID: string): void {
    if (this.menuDoc == undefined) return;

    this.menuDoc
      .collection('menu-groups')
      .doc(menuGroupId)
      .collection('menu-items')
      .doc(menuItemID)
      .delete()
      .then(() => {
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            const itemArr = <MenuItem[]>this.menuGroups[i].menuItems;

            for (let j = 0; j < itemArr.length; j++) {
              if (itemArr[j].id === menuItemID) {
                itemArr.splice(j, 1);
              }
              break;
            }
          }
        }
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  addMenuGroup(menuGroup: MenuGroup): void {
    if (this.menuDoc == undefined) return;

    // Set the order of the newly added Item
    let order = this.menuGroups.length;

    const menuGroupData: MenuGroup = {
      order: order,
      ...menuGroup
    };

    this.menuDoc
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
    if (this.menuDoc == undefined) return;

    this.menuDoc
      .collection('menu-groups')
      .doc(menuGroupId)
      .update(menuGroup)
      .then(() => {
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            this.menuGroups[i].name = menuGroup.name;
            this.menuGroups[i].imgSrc = menuGroup.imgSrc;
          }
        }
      })
      .catch(err => console.error('Error writing document: ', err));
  }

  deleteMenuGroup(menuGroupId: string): void {
    if (this.menuDoc == undefined) return;

    // Get document reference for the main main group
    const docRef = this.menuDoc.collection('menu-groups').doc(menuGroupId);

    docRef
      .collection('menu-items')
      .ref.get()
      .then(menuItems => {
        menuItems.forEach(menuItem => {
          menuItem.ref.delete();
        });
      })
      .then(() => {
        for (let i = 0; i < this.menuGroups.length; i++) {
          if (menuGroupId === this.menuGroups[i].id) {
            this.menuGroups.splice(i, 1);
          }
        }

        // Finally delete the whole document
        docRef.delete();
      })
      .catch(err => {
        console.error(err);
      });
  }

  //
  //
  // TO DO: Redesign form to accomodate image upload and update
  //        Change button text depending on add and edit
  //        Add cancel button to forms
  //
  //

  uploadImg(
    menuGroupID: string,
    data: MenuItem | MenuGroup,
    file: File
  ): Promise<MenuItem | MenuGroup> {
    const uploadPromise = new Promise<MenuItem | MenuGroup>(
      (resolve, reject) => {
        if (file?.name) {
          const menuRef = this.storage.storage.ref().child(this.menuId);
          let fileRef;

          if (menuGroupID) {
            const menuGroupRef = menuRef.child(menuGroupID);
            fileRef = menuGroupRef.child(file.name);
          } else {
            fileRef = menuRef.child(file.name);
          }

          fileRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              resolve({
                ...data,
                imgSrc: url,
                imgRef: snapshot.ref.fullPath
              });
            });
          });
        } else {
          resolve({
            ...data,
            imgSrc: '',
            imgRef: null
          });
        }
      }
    );

    return uploadPromise;
  }
}
