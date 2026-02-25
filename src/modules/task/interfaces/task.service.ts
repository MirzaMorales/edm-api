import { Inject, Injectable } from "@nestjs/common";
import { Client } from "pg";
import { CreateTaskDTO } from "src/modules/auth/dto/create-task.dto";
import { UpdateTaskDto } from "src/modules/auth/dto/update.task.dto";
import { Task } from "src/modules/auth/entities/task.entity";

@Injectable()
export class TaskService {

    constructor(
        @Inject('DATABASE_CONNECTION') private db: Client
    ) { }

    private tasks: any[] = [];

    async getTasks(): Promise<Task[]> {
        const query = 'SELECT * FROM tasks';
        const result = await this.db.query(query);
        return result.rows;
    }

    public async getTaskById(id: number): Promise<Task>{
        const query = 'SELECT * FROM tasks WHERE id = $1';
        const result = (await this.db.query(query, [id])).rows;
        return result[0];
    }

    public async insertTask(task: CreateTaskDTO): Promise<number>{
        const query = 'INSERT INTO tasks (name, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *';

        const result = await this.db.query(query, [task.name, task.description, task.priority, task.user_id]);
        return result.oid;
    }

    public async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<any>{

        const task = await this.getTaskById(id);
        task.name = taskUpdated.name ?? task.name;
        task.description = taskUpdated.description ?? task.description;
        task.priority = taskUpdated.priority ?? task.priority;

        const query = 
        'UPDATE tasks SET name = $1, description = $2, priority = $3 WHERE id = $4 RETURNING *';

        const result = await this.db.query(query, [task.name, task.description, task.priority, id]);
        return result.rows[0];
    }

    public async deleteTask(id: number): Promise<boolean>{
        const sql = 'DELETE FROM tasks WHERE id = $1';
        const result = await this.db.query(sql, [id]);

        return result.rowCount! > 0;
    }


}