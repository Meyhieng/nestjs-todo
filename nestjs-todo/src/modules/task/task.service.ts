import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private nextId = 1;

  private tasks: Array<{
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    completedAt: string | null;
    userId?: number;
  }> = [
    {
      id: 1,
      name: 'IP task',
      description: 'Edit this task',
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: 1,
    },
  ];

  constructor() {
    this.nextId = this.tasks.length + 1;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    const taskId = Number(id);
    return this.tasks.find((task) => task.id === taskId);
  }

  createTask(body: any) {
    const task = {
      id: this.nextId++,
      name: body?.name ?? 'Untitled task',
      description: body?.description ?? null,
      createdAt: new Date().toISOString(),
      completedAt: null,
      userId: body?.userId ?? 1,
    };

    this.tasks.push(task);
    return task;
  }

  markDone(id: string) {
    const taskId = Number(id);
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) return null;

    task.completedAt = new Date().toISOString();
    return task;
  }

  markPending(id: string) {
    const taskId = Number(id);
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) return null;

    task.completedAt = null;
    return task;
  }

  deleteTask(id: string) {
    const taskId = Number(id);
    const before = this.tasks.length;

    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    return {
      message: before === this.tasks.length ? 'not_found' : 'success',
    };
  }
}