import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "../Auth/guards/auth.guard";
import { RolesGuard } from "../Auth/guards/roles.guard";
import { Role } from "../Auth/models/role.enum";
import { Roles } from "../decorators/roles.decorator";
import { PatchProductDto } from "./dto/patch-product.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.ADM)
  @Post()
  async Create(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get()
  async Read() {
    return this.productService.listProduct();
  }

  @Get("/:id")
  async Show(@Param("id", ParseIntPipe) id: number) {
    return this.productService.showProduct(id);
  }

  @Roles(Role.ADM)
  @Put("/:id")
  async Update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, data);
  }

  @Roles(Role.ADM)
  @Patch("/:id")
  async Patch(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: PatchProductDto
  ) {
    return this.productService.updateProduct(id, data);
  }

  @Roles(Role.ADM)
  @Delete("/:id")
  async Delete(@Param("id", ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
