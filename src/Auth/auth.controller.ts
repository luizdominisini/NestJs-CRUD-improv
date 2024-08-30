import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "../file/file.service";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "../decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) {}

  @Post("login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post("forget")
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forgetPass(email);
  }

  @Post("reset")
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.resetPass(password, token);
  }

  @Post("file")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async fileUpload(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: "image/jpeg" }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const path = join(
      __dirname,
      "..",
      "..",
      "..",
      "upload",
      "files",
      `${user.id}-${file.originalname}`
    );
    try {
      this.fileService.upload(path, file);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return { success: user.id };
  }
}
