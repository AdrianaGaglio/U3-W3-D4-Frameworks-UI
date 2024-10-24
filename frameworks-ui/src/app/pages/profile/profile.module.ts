import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { CryptoPipe } from '../../pipes/crypto.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, CryptoPipe],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, SharedModule],
})
export class ProfileModule {}
