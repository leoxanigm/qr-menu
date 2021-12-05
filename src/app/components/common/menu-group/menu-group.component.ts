import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuGroup, MenuItem } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu-group',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.scss']
})
export class MenuGroupComponent implements OnInit {
  @Input() menuGroupData!: MenuGroup;

  menuGroupId!: string;

  addMode = false;
  editMode = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuGroupId = <string>this.menuGroupData.id;
  }

  onAddMenuItem() {
    this.addMode = true;
  }

  onCloseMenuItem() {
    this.addMode = false;
  }

  onEditMode() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    if (!this.menuGroupId) return;

    this.menuService.deleteMenuGroup(this.menuGroupId);
  }
}
