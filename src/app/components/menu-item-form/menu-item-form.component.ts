import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuItem } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.scss']
})
export class MenuItemFormComponent implements OnInit, OnDestroy {
  @Input() menuGroupId!: string;
  @Input() editMode = false;
  @Input() itemData!: MenuItem;

  submitSuccess = false;

  menuItemForm!: FormGroup;
  menuItemImgFile!: File;

  constructor(private menuService: MenuService, private fS: FormService) {}

  ngOnInit(): void {
    if (this.editMode) {
      this.menuItemForm = this.fS.editItemForm(this.itemData);
    } else {
      this.menuItemForm = this.fS.newItemForm();
    }
  }

  ngOnDestroy(): void {
    this.menuItemForm.reset();
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
          ...this.menuItemForm.value,
          imgSrc: this.menuItemImgFile
        }
      );
    } else {
      this.menuService.addMenuItem(
        this.menuGroupId,
        this.menuItemForm.value,
        this.menuItemImgFile
      );
    }

    this.menuItemForm.reset();
  }

  onFileChange(event: any) {
    if (event && event.target.files && event.target.files?.length > 0) {
      this.menuItemImgFile = event.target.files[0];
    }
  }
}
