import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@silkflo-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

//
//new TicketUpdatedPublisher(natsWrapper.client).publish({
//
//})
