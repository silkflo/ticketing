import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  //by the error check , it tell typescrit that the env is not undefined but string

  console.log('Starting up...');


  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
