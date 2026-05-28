import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from 'src/orders/orders.service';

@Resolver()
export class OrderCodeFirstResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query('orders')
  orders() {
    return this.ordersService.findAll();
  }

  @Mutation('addOrder')
  addOrder(
    @Args('name') orderName: string,
    @Args('price') orderPrice: number,
    @Args('issuedAt') orderIssuedAt: string,
  ) {
    return this.ordersService.create({
      name: orderName,
      price: orderPrice,
      issuedAt: orderIssuedAt,
    });
  }
}