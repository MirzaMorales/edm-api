import { Controller, Get } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("/api/task")
export class TaskController {

    constructor( private readonly taskSvc: TaskService){}

    @Get("/get-tasks")
    public getTasks(): string{
        return this.taskSvc.getTasks();
    }
}