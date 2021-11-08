import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuGroup } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  menuGroups: MenuGroup[] = [];
  menuGroupSubscription!: Subscription;

  addMode = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuGroupSubscription = this.menuService
      .fetchMenu()
      .subscribe(menuGroupsData => (this.menuGroups = menuGroupsData));
  }

  ngOnDestroy(): void {
    this.menuGroupSubscription.unsubscribe();
  }

  onAddMenuGroup(): void {
    this.addMode = true;
  }

  onCloseMenuGroup(): void {
    this.addMode = false;
  }
}
