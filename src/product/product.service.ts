import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(filter: number, sort: string): Promise<Product[]> {
    const products = await this.productModel
      .find()
      .limit(filter)
      .sort({ name: sort === 'desc' ? -1 : 1 });
    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO);
    await product.save();
    return product;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDTO,
      { new: true }, //Para que devuelva el valor modificado
    );
    return product;
  }
}
