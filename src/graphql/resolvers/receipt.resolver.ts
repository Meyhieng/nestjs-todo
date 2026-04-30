import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptsService } from '../../receipts/receipts.service';

@Resolver('Receipt')
export class ReceiptResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query('receipts')
  receipts() {
    return this.receiptsService.findAll();
  }

  @Mutation('createReceipt')
  createReceipt(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('issuedAt') issuedAt: string,
  ) {
    return this.receiptsService.create({ name, price, issuedAt });
  }
}