import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

@Injectable()
export class FileService {
  async upload(path: string, file: Express.Multer.File) {
    this.diretoryExist();
    await writeFile(path, file.buffer);
  }

  async diretoryExist() {
    const path = "C:/Users/Desk.PC/NestJs-CRUD-improv/upload/files";
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }
}
