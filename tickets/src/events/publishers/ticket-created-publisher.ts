import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@silkflo-tickets/common';
import { natsWrapper } from '../../nats-wrapper';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
