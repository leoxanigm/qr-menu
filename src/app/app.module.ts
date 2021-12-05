import { environment } from 'src/environments/environment';

// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './shared/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/common/button.component';
import { MenuItemComponent } from './components/common/menu-item/menu-item.component';
import { MenuGroupComponent } from './components/common/menu-group/menu-group.component';
import { MenuItemFormComponent } from './components/menu-item-form/menu-item-form.component';
import { MenuGroupFormComponent } from './components/menu-group-form/menu-group-form.component';
import { MenuComponent } from './components/common/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MenuItemComponent,
    MenuGroupComponent,
    MenuItemFormComponent,
    MenuGroupFormComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
