import { Injectable } from "@nestjs/common";

@Injectable()
export class UtilService {
    public async hashPassword(password: string): Promise<string> {
        const bcrypt = await import('bcrypt');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    public async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return await bcrypt.compare(password, hashedPassword);
    }
}