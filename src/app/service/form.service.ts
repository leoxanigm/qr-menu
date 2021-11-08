import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuGroup, MenuItem } from '../shared/menu.interface';
import { MenuService } from './menu-service.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  menuItemForm!: FormGroup;

  constructor(private menuService: MenuService) {}

  newItemForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'price': new FormControl(''),
      'imgSrc': new FormControl('')
    });
  }

  editItemForm(menuItemData: MenuItem): FormGroup {
    return new FormGroup({
      'name': new FormControl(menuItemData.name),
      'description': new FormControl(menuItemData.description),
      'price': new FormControl(menuItemData.price),
      'imgSrc': new FormControl(menuItemData.imgSrc)
    });
  }

  newGroupForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl(''),
      'imgSrc': new FormControl('')
    });
  }

  editGroupForm(menuGroupData: MenuGroup): FormGroup {
    return new FormGroup({
      'name': new FormControl(menuGroupData.name),
      'imgSrc': new FormControl(menuGroupData.imgSrc)
    });
  }
}
