import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
  }

  onEdit(): void {
    this.editMode = !this.editMode;
  }
}
