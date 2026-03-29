import { Module } from '@nestjs/common';
import { EventPublisherService } from './event-publisher/event-publisher.service';

@Module({
  providers: [EventPublisherService]
})
export class CoreModule {}
