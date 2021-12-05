import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuItem } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuItemData!: MenuItem;
  @Input() menuGroupId!: string;

  editMode = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
  }

  onEdit(): void {
    this.editMode = !this.editMode;
  }

  onDelete(): void {
    if(!this.menuGroupId || !this.menuItemData.id) {
      console.error('Error deleting menu item!')
      return;
    }

    this.menuService.deleteMenuItem(this.menuGroupId, this.menuItemData.id);
  }
}
