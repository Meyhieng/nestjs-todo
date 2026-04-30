import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from '../../orders/orders.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query('orders')
  orders() {
    return this.ordersService.findAll();
  }

  @Mutation('createOrder')
  createOrder(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('issuedAt') issuedAt: string,
  ) {
    return this.ordersService.create({ name, price, issuedAt });
  }
}