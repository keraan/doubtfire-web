import {Injectable} from '@angular/core';
import {RxStorage} from 'ngx-reactive-storage';

@Injectable({
  providedIn: 'root',
})
export class RecentlyInteractedTaskService {
  storage = new RxStorage();

  constructor() {
    this.storage.get('recentlyInteractedTasks').then((data) => {
      if (data) {
        console.log(JSON.parse(data));
        this.recentlyInteractedTasks = JSON.parse(data);
      }
    });
  }

  private recentlyInteractedTasks = [];

  // TODO: Add unit id to the task id
  public addInteractedTask(taskId: number, unitId: number): void {
    const dateStamp = new Date().getTime();
    if (!this.recentlyInteractedTasks.includes(taskId)) {
      this.recentlyInteractedTasks.push({task_id: taskId, date: dateStamp});
      this.syncTaskIdsToLocalStorage();
    }
  }

  public clearRecentlyInteractedTasks(): void {
    this.recentlyInteractedTasks = [];
    this.syncTaskIdsToLocalStorage();
  }

  public getRecentlyInteractedTasksIDs(): number[] {
    return this.recentlyInteractedTasks;
  }

  private syncTaskIdsToLocalStorage(): void {
    this.storage.set('recentlyInteractedTasks', this.recentlyInteractedTasks);
  }
}
