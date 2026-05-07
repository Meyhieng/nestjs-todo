import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptType } from '../types/receipt.type';
import { CreateReceiptInput } from '../inputs/create-receipt.input';
import { ReceiptsService } from 'src/receipts/receipts.service';

@Resolver(() => ReceiptType)
export class ReceiptCodeFirstResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query(() => [ReceiptType])
  receipts() {
    return this.receiptsService.findAll();
  }

  @Mutation(() => ReceiptType)
  createReceipt(@Args('input') input: CreateReceiptInput) {
    return this.receiptsService.create({
      name: input.name,
      price: input.price,
      issuedAt: input.issuedAt,
    });
  }
}