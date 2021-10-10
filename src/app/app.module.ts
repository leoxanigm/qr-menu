// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './shared/materials.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/common/button.component';
import { MenuItemComponent } from './components/common/menu-item/menu-item.component';
import { MenuGroupComponent } from './components/common/menu-group/menu-group.component';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { MenuGroupFormComponent } from './components/menu-group-form/menu-group-form.component';




@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MenuItemComponent,
    MenuGroupComponent,
    MenuItemFormComponent,
    MenuGroupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
