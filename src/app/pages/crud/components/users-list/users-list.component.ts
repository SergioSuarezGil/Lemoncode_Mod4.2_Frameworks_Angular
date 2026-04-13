import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserItem } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './users-list.component.scss',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  @Input({ required: true }) users: UserItem[] = [];

  @Output() edit = new EventEmitter<UserItem>();
  @Output() remove = new EventEmitter<number>();
}
