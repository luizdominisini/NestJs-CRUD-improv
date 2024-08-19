import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(data: CreateProductDto) {
    const nameExist = await this.nameExist(data.name);

    if (nameExist) {
      throw new ForbiddenException('Produto já existe com este nome');
    }

    const { name, quantity, price } = data;
    const product = this.productRepository.create({ name, quantity, price });
    await this.productRepository.save(product);
    return product;
  }

  async listProduct() {
    const products = await this.productRepository.find();
    return products;
  }

  async showProduct(id: number) {
    const product = await this.productExist(id);

    return product;
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.productExist(id);

    const { name, quantity, price } = data;

    await this.productRepository.update(id, {
      name,
      quantity,
      price,
    });

    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.productExist(id);
    return this.productRepository.remove(product);
  }

  async nameExist(name: string) {
    const product = await this.productRepository.findOneBy({ name });
    if (product) {
      return product;
    }
  }

  async productExist(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return product;
  }
}
