import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from '@silkflo-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
