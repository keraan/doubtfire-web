import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/api/models/task';

@Pipe({
  name: 'tasksInCache',
})
export class TasksInCachePipe implements PipeTransform {
  transform(tasks: Task[], useCache: boolean): Task[] {
    if (!useCache || tasks == null) {
      return tasks;
    }

    try {
      const storedTasks = localStorage.getItem('recently-viewed-submissions');
      const parsedIds = JSON.parse(storedTasks)
      return tasks.filter((task: Task) =>
          parsedIds.includes(task.id)
      );
    } catch (error) {
      console.error('Failed to parse stored tasks:', error)
      // this.tasksInCache = []
    }

    return tasks;
  }
}
