import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@silkflo-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
