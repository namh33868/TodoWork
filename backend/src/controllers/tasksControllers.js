// Nơi chứa logic sử lý chính cho các request
import Task from '../model/Task.js';

export const getAllTasks = async (req, res) => {
  const {filter = 'topday'} = req.query;
  const now = new Date();

  switch (filter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'Week':
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    case 'Month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'all':
    default:
      break;
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const resuilt = await Task.aggregate([
      {
        $match: query
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [{ $match: { status: 'completed' } }, { $count: 'count' }],
        }
      }
    ]);

    const tasks = resuilt[0].tasks;
    const activeCount = resuilt[0].activeCount[0]?.count || 0;
    const completedCount = resuilt[0].completedCount[0]?.count || 0;
    res.status(200).json({tasks, activeCount, completedCount});
  } catch (error) {
    console.error('Error fetching getAllTasks:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({title});
    // Kiểm tra title có rỗng không
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completedAt, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id, {
            title,
            completedAt,
            status,
        },
        {
            new: true,
        }
    );
    // Kiểm tra task có tồn tại không
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    // Kiểm tra task có tồn tại không
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted!' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
