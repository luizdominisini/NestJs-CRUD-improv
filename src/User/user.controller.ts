import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "../Auth/guards/auth.guard";

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
    return this.userService.userShou(id);
  }

  @Put("/:id")
  async Update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateUserDto
  ) {
    return this.userService.userUpdate(id, data);
  }

  @Delete("/:id")
  async Delete(@Param("id", ParseIntPipe) id: number) {
    return this.userService.userDelete(id);
  }
}
