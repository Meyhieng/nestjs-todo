import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateReceiptInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  issuedAt: string;
}