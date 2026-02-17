// Nơi chứa logic kết nối cơ sở dữ liệu
import mongoose from 'mongoose';

// Bất cứ khi nào làm việc với hàm bất đồng bộ đều phải dùng try catch
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_CONNECTIONSTRING;
    if (!uri) {
      throw new Error('MONGODB_CONNECTIONSTRING environment variable is not set');
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); //exit with failure
  }
};

export default connectDB;
