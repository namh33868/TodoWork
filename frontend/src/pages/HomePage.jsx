import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [TaskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  usetEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // logic 
  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(response.data.tasks);
      setActiveTaskCount(response.data.activeCount);
      setCompletedTaskCount(response.data.completedCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks. Please try again.');
    }
  };

  const handleTaskChange = () => {
    fetchTasks();
  }

  const handlePrev = () => {
    if(page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  const handleNext = () => {
    if(page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  // Biến
  const filteredTasks = TaskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });
  const visibleTasks = filteredTasks.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit);
  
  if(visibleTasks.length === 0) {
    handlePrev();
  }
  
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (

    <div className="min-h-screen w-full relative">
      {/* Violet Dream Sphere Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at center, #DDD6FE 0%, #C4B5FD 25%, #A78BFA 50%, #8B5CF6 75%, #7C3AED 100%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Header */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChange} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters />
          filter={filter}
          setFilter={setFilter}
          activeTaskCount={activeTaskCount}
          completedTaskCount={completedTaskCount}

          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTasks={filteredTasks} filter={filter} handleTaskChange={handleTaskChange} />

          {/* Phân trang và lọc theo date */}
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination 
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Footer */}
          <Footer />
          activeTaskCount={activeTaskCount}
          completedTaskCount={completedTaskCount}
        </div>
      </div>
    </div>


  );
};
export default HomePage;
