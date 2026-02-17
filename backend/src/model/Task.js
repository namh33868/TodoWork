// Định nghĩa cấu trúc dữ liệu cho 1 task
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
},
{
    timestamps: true, // mongoose tự thêm vào createdAt và updatedAt
}
);

const Task = mongoose.model('Task', taskSchema);

export default Task;