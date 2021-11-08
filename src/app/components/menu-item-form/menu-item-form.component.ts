import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuItem } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent implements OnInit {
  @Input() menuGroupId!: string;
  @Input() editMode = false;
  @Input() itemData!: MenuItem;

  submitSuccess = false;

  menuItemForm!: FormGroup;

  constructor(private menuService: MenuService, private fS: FormService) {}

  ngOnInit(): void {
    if (this.editMode) {
      this.menuItemForm = this.fS.editItemForm(this.itemData);
    } else {
      this.menuItemForm = this.fS.newItemForm();
    }
  }

  onSubmit(): void {
    if (!this.menuItemForm.valid) {
      return;
    }

    if (this.editMode) {
      this.menuService.editMenuItem(
        this.menuGroupId,
        <string>this.itemData.id,
        {
          id: this.itemData.id,
          ...this.menuItemForm.value
        }
      );
    } else {
      this.menuService.addMenuItem(this.menuGroupId, this.menuItemForm.value);
    }

    this.menuItemForm.reset();
  }
}
