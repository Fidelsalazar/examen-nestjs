import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Auth(ValidRoles.user)
  @Post('/create')
  async createPost(
    @Res() res: any,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Producto Creado Correctamente',
      product: product,
    });
  }

  @Get()
  @Auth(ValidRoles.user)
  async getProducts(
    @Res() res: any,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ) {
    const products = await this.productService.getProducts(limit, sort);
    return res.status(HttpStatus.OK).json({
      message: 'Listado de Productos',
      products: products,
    });
  }
  @Get('/:productId')
  @Auth(ValidRoles.user)
  async getProduct(@Res() res: any, @Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);
    if (!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Producto',
      product: product,
    });
  }
  @Delete('/delete')
  @Auth(ValidRoles.user)
  async deleteProduct(@Res() res: any, @Query('deleteId') deleteId: string) {
    const product = await this.productService.deleteProduct(deleteId);
    if (!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Delete Product',
      product: product,
    });
  }

  @Put('/update/:productId')
  @Auth(ValidRoles.user)
  async updateProduct(
    @Res() res: any,
    @Param('productId') productId: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      productId,
      createProductDTO,
    );
    if (!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'Update Product',
      product: product,
    });
  }
}
