import { Module } from '@nestjs/common';
import { ReceiptsModule } from '../receipts/receipts.module';
import { OrdersModule } from '../orders/orders.module';
import { ReceiptCodeFirstResolver } from './resolvers/receipt.codefirst.resolver';
import { OrderCodeFirstResolver } from './resolvers/order.codefirst.resolver';

@Module({
  imports: [ReceiptsModule, OrdersModule],
  providers: [ReceiptCodeFirstResolver, OrderCodeFirstResolver],
})
export class GraphqlModule {}
