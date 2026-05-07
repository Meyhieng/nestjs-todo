import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ReceiptType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  issuedAt: string;
}