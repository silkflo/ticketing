import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@silkflo-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
