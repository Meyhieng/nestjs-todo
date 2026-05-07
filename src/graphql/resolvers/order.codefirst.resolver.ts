import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { OrderType } from '../types/order.type';
import { CreateOrderInput } from '../inputs/create-order.input';
import { OrdersService } from 'src/orders/orders.service';

@Resolver(() => OrderType)
export class OrderCodeFirstResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [OrderType])
  orders() {
    return this.ordersService.findAll();
  }

  @Query(() => [OrderType])
  async ordersByMinPrice(@Args('minPrice', { type: () => Float }) minPrice: number) {
    const all = await this.ordersService.findAll();
    return all.filter((o: any) => o.price >= minPrice);
  }

  @Mutation(() => OrderType)
  createOrder(@Args('input') input: CreateOrderInput) {
    return this.ordersService.create({
      name: input.name,
      price: input.price,
      issuedAt: input.issuedAt,
    });
  }
}