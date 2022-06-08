import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: title,
    price: price,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket('Metalica', 50);
  await createTicket('NOFX', 30);
  await createTicket('Iron Maiden', 50);

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
