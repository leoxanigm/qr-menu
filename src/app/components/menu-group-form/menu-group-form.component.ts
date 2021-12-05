import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/service/form.service';
import { MenuService } from 'src/app/service/menu-service.service';
import { MenuGroup } from 'src/app/shared/menu.interface';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.scss']
})
export class MenuGroupFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() groupData!: MenuGroup;

  submitSuccess = false;

  menuGroupForm!: FormGroup;

  constructor(private menuService: MenuService, private fS: FormService) {}

  ngOnInit(): void {
    if (this.editMode) {
      this.menuGroupForm = this.fS.editGroupForm(this.groupData);
    } else {
      this.menuGroupForm = this.fS.newGroupForm();
    }
  }

  onSubmit(): void {
    if (!this.menuGroupForm.valid) {
      return;
    }

    if (this.editMode) {
      this.menuService.editMenuGroup(
        <string>this.groupData.id,
        this.menuGroupForm.value
      );
    } else {
      this.menuService.addMenuGroup(this.menuGroupForm.value);
    }

    this.menuGroupForm.reset();
  }
}
