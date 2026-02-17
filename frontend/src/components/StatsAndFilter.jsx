import { Badge, Filter } from 'lucide-react';
import { FilterType } from '../lib/data';
import { Button } from './ui/button';
import React from 'react'

const StatsAndFiller = ({completedTasksCount = 0, activeTasksCount = 0, filter = "all", setFilter}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Thống kê */}
        <div className="flex gap-3">
          <div
            variant="secondary"
            className="p-1 text-sm font-bold bg-white/50 text-accent-foreground rounded-sm border-info/20"
          >
            {activeTasksCount} {FilterType.active}
          </div>
          <div
            variant="secondary"
            className="p-1 text-sm font-bold bg-white/50 text-success rounded-sm border-success/20"
          >
            {completedTasksCount} {FilterType.completed}
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {
            Object.keys(FilterType).map((type) => (
              <Button
                key={type}
                variant={filter === type ? "gradient" : "ghost"}
                size="sm"
                className="capitalize text-white"
                onClick={() => setFilter(type)}
              >
                <Filter className="size-4" />
                {FilterType[type]}
              </Button>
            ))
          }
        </div>
    </div>
  );
};
export default StatsAndFiller;