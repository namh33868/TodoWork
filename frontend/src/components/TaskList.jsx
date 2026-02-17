import TaskEmptyState from './TaskEmptyState'
import TaskCard from './TaskCard'
import React from 'react'

const TaskList = ({filteredTasks, filter}) => {
  if(!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
        {filteredTasks.map((task, index, handleTaskChange) => (
          <TaskCard
            key={task._id ?? index}
            task={task}
            index={index}
            handleTaskChange={handleTaskChange}
          />
        ))}
    </div>
  );
};
export default TaskList;
