import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async Create(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get()
  async Read() {
    return this.productService.listProduct();
  }

  @Get('/:id')
  async Show(@Param('id', ParseIntPipe) id: number) {
    return this.productService.showProduct(id);
  }

  @Put('/:id')
  async Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, data);
  }

  @Delete('/:id')
  async Delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
