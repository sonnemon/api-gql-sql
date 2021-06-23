import { myslqWrapper } from '../models/wrapper';
import { Product } from '../models/product';
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
} from 'type-graphql';
import {
  ProductType,
  FindAndCountProductType,
  CreateProductInputType,
} from '../types/product-types';

@Resolver()
export class ProductResolver {
  @Query(() => ProductType)
  async Product(@Arg('productId') productId: number) {
    const product = await Product(myslqWrapper.client).findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return null;
    }
    return product;
  }

  @Query(() => FindAndCountProductType)
  async Products() {
    const product = await Product(myslqWrapper.client).findAndCountAll();
    return product;
  }

  @Mutation(() => ProductType)
  async CreateProduct(
    @Arg('input') input: CreateProductInputType,
    @PubSub() pubSub: PubSubEngine
  ) {
    const product = await Product(myslqWrapper.client).create(input); //esto dura 1 minuto
    await pubSub.publish('CREATE_PRODUCT', product.toJSON());
    return product;
  }

  @Mutation(() => ProductType)
  async UpdateProduct(
    @Arg('productId') productId: number,
    @Arg('input') input: CreateProductInputType
  ) {
    await Product(myslqWrapper.client).update(input, {
      where: {
        id: productId,
      },
    });
    const product = Product(myslqWrapper.client).findOne({
      where: {
        id: productId,
      },
    });
    return product;
  }

  @Subscription({
    topics: 'CREATE_PRODUCT',
    filter: ({ payload, args }) =>
      args.isGreaterThan ? payload.price > 15 : payload.price < 15,
  })
  NewProduct(
    @Root() product: ProductType,
    @Arg('isGreaterThan') isGreaterThan: boolean
  ): ProductType {
    return product;
  }
}
