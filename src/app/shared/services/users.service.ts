import { Injectable, signal } from '@angular/core';

export interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersState = signal<UserItem[]>([
    { id: 1, name: 'Ana Perez', email: 'ana@demo.com', phone: '600111222' },
    { id: 2, name: 'Luis Gomez', email: 'luis@demo.com', phone: '600333444' },
    { id: 3, name: 'Marta Diaz', email: 'marta@demo.com', phone: '600555666' }
  ]);

  readonly users = this.usersState.asReadonly();

  getNextId(): number {
    const users = this.usersState();
    if (users.length === 0) {
      return 1;
    }

    return Math.max(...users.map((item) => item.id)) + 1;
  }

  createUser(user: UserItem): { ok: boolean; error?: 'duplicate-id' } {
    const users = this.usersState();
    if (users.some((item) => item.id === user.id)) {
      return { ok: false, error: 'duplicate-id' };
    }

    this.usersState.set([...users, user]);
    return { ok: true };
  }

  updateUser(currentId: number, user: UserItem): { ok: boolean; error?: 'duplicate-id' } {
    const users = this.usersState();
    const hasDuplicateId = users.some((item) => item.id === user.id && item.id !== currentId);

    if (hasDuplicateId) {
      return { ok: false, error: 'duplicate-id' };
    }

    this.usersState.set(users.map((item) => (item.id === currentId ? user : item)));
    return { ok: true };
  }

  deleteUser(id: number): void {
    this.usersState.set(this.usersState().filter((item) => item.id !== id));
  }
}