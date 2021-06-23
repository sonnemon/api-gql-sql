import { Field, InputType, Int, ObjectType } from "type-graphql"

@ObjectType()
export class ProductType {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  img_url: string;
}

@ObjectType()
export class ProductPayloadType {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field( { nullable: true })
  img_url: string;
}

@ObjectType()
export class FindAndCountProductType {
  @Field(() => Int, { nullable: true })
  count: number;

  @Field(() => [ProductType], { nullable: true })
  rows: ProductType[];
}


@InputType()
export class CreateProductInputType {
  @Field(() => Int, { nullable: true})
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field({ nullable: true })
  description: string;

  @Field( { nullable: true })
  img_url: string;
}