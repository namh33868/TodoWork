import { Badge, Calendar, Circle, SquarePen, Trash2, CircleCheck } from 'lucide-react';
import React, { useState } from "react";
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from "@/lib/axios";
import { toast } from "sonner";


const TaskCard = ({ task, index, handleTaskChange }) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            toast.success(`Task ${task.title} deleted successfully`);
            handleTaskChange();
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task. Please try again.');
        }
    }

    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task._id}`, {
                title: updateTaskTitle
            });
            toast.success(`Task updated to ${updateTaskTitle}`);
            handleTaskChange();
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task. Please try again.');
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if(task.status === 'active') {
                await api.put(`/tasks/${task._id}`, {
                    status: 'completed',
                    completedAt: new Date().toISOString(),
                });
                toast.success(`Task ${task.title} is completed.`);
                handleTaskChange();
            } else {
                await api.put(`/tasks/${task._id}`, {
                    status: 'active',
                    completedAt: null,
                });
                toast.success(`Task ${task.title} not done.`);
                handleTaskChange();
            }
        } catch (error) {
            console.error('Error toggling task status:', error);
            toast.error('Error toggling task status. Please try again.');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateTask();
        }
    }

    return (
        <Card className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "completed" && 'opacity-75'
        )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className='flex item-center gap-4'>
                {/* Nút tròn */}
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                        task.status === "completed"
                            ? 'text-success hover:text-success/80'
                            : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === "completed" ? (
                        <CircleCheck className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}
                </Button>

                {/* Hiển thị or chỉnh sửa tiêu đề */}
                <div className='flex-1 min-w-0'>
                    {isEditting ? (
                        <Input
                            placeholder="Enter task title"
                            className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50'
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={(e) => { handleKeyPress(e, task._id) }}
                            onBlur={() => {setIsEditting(false); setUpdateTaskTitle(task.title || "")}}
                        />
                    ) : (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )}
                    {/* Ngày tạo và ngày hoàn thành */}
                    <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className='text-xs text-muted-foreground'>
                            {new Date(task.createdAt).toLocaleString()}
                        </span>
                        {task.completedAt && (
                            <>
                                <span className='text-xs text-muted-foreground'> - </span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className='text-xs text-muted-foreground'>
                                    {new Date(task.completedAt).toLocaleString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>



                {/* Nút chỉnh và xoá */}
                <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                    {/* Nút edit */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-info'
                        onClick={() => {setIsEditting(true); setUpdateTaskTitle(task.title || "")}}
                    >
                        <SquarePen className='size-4' />
                    </Button>
                    {/* Nút delete */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-color size-8 text-muted-foreground hover:text-destructive'
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash2 className='size-4' />
                    </Button>
                </div>
            </div>

        </Card>
    )
}
export default TaskCard;
