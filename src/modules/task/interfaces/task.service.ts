import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskService {

    public getTasks(): string{
        return "Lista de tareas";
    }

    public getTaskById(id: number): string{
        return `Tarea con id: ${id}`;
    }

    public insertTask(task: any): any{
        return task
    }

    public updateTask(id: number, task: any): any{
        return task;
    }

    public deleteTask(id: number): string{
        return `Tarea con id: ${id} eliminada`;
    }


}