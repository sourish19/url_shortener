import mongoose from 'mongoose';

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDb connected Successfully'))
    .catch((err) => console.log('Failed to connect to MongoDb'));
};

export default db;
