import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../Auth/guards/auth.guard";
import { PatchUserDto } from "./dto/patch-user.dto";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async Create(@Body() createUserDto: CreateUserDto) {
    return this.userService.userCreate(createUserDto);
  }

  @Get()
  async Read() {
    return this.userService.userList();
  }

  @Get("/:id")
  async Show(@Param("id", ParseIntPipe) id: number) {
    return this.userService.userShow(id);
  }

  @Put("/:id")
  async Update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateUserDto
  ) {
    return this.userService.userUpdate(id, data);
  }

  @Patch("/:id")
  async Patch(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: PatchUserDto
  ) {
    return this.userService.userPatch(id, data);
  }

  @Delete("/:id")
  async Delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.userDelete(id);
  }
}
