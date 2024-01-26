import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/product-nest'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
