import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@silkflo-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
