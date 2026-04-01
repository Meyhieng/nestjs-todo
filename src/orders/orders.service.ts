import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly notifications: NotificationsService,
  ) {}

  async findAll() {
    return this.orderModel.find().sort({ issuedAt: -1 });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(dto: CreateOrderDto) {
    const order = new this.orderModel({
      name: dto.name,
      price: dto.price,
      issuedAt: new Date(dto.issuedAt),
    });
    const saved = await order.save();

    this.notifications.notify('order_created', {
      name: saved.name,
      price: saved.price,
    });

    return saved;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      {
        ...(dto.name && { name: dto.name }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.issuedAt && { issuedAt: new Date(dto.issuedAt) }),
      },
      { new: true },
    );
    if (!order) throw new NotFoundException('Order not found');

    this.notifications.notify('order_updated', {
      name: order.name,
      price: order.price,
    });

    return order;
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Order not found');
    return { deleted: true, id };
  }
}