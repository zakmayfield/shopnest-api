import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query('skip') skip?: number | undefined,
    @Query('take') take?: number | undefined,
    @Query('cursor') cursor?: Prisma.ProductWhereUniqueInput,
    @Query('where') where?: Prisma.ProductWhereInput,
    @Query('orderBy') orderBy?: Prisma.ProductOrderByWithRelationInput,
  ): Promise<Product[]> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor,
      where,
      orderBy,
    };

    return this.productsService.products(params);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.product({ id });
  }
}
