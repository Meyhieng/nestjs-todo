import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receipt, ReceiptDocument } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectModel(Receipt.name)
    private readonly receiptModel: Model<ReceiptDocument>,
  ) {}

  async findAll() {
    return this.receiptModel.find().sort({ issuedAt: -1 });
  }

  async findOne(id: string) {
    const receipt = await this.receiptModel.findById(id);
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = new this.receiptModel({
      issuedAt: new Date(dto.issuedAt),
      name: dto.name,
      price: dto.price,
    });
    return receipt.save();
  }

  async update(id: string, dto: UpdateReceiptDto) {
    const receipt = await this.receiptModel.findByIdAndUpdate(
      id,
      {
        ...(dto.issuedAt && { issuedAt: new Date(dto.issuedAt) }),
        ...(dto.name && { name: dto.name }),
        ...(dto.price !== undefined && { price: dto.price }),
      },
      { new: true },
    );
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async remove(id: string) {
    const receipt = await this.receiptModel.findByIdAndDelete(id);
    if (!receipt) throw new NotFoundException('Receipt not found');
    return { deleted: true, id };
  }
}