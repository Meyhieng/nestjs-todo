import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { ReceiptsService } from 'src/receipts/receipts.service';

@Resolver()
export class ReceiptCodeFirstResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query('receipts')
  receipts() {
    return this.receiptsService.findAll();
  }

  @Mutation('createReceipt')
  createReceipt(
    @Args('name') name: string,
    @Args('price', { type: () => Float }) price: number,
    @Args('issuedAt') issuedAt: string,
  ) {
    return this.receiptsService.create({ name, price, issuedAt });
  }
}