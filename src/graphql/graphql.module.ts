import { Module } from '@nestjs/common';
import { ReceiptResolver } from './resolvers/receipt.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { ReceiptsModule } from '../receipts/receipts.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ReceiptsModule, OrdersModule],
  providers: [ReceiptResolver, OrderResolver],
})
export class GraphqlModule {}