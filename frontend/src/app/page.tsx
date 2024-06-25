"use client";

import { useState, useEffect } from "react";
import ToDosContext from "./contexts/ToDosContext";
import InputComponent from "./components/InputComponent";
import CompleteAllComponent from "./components/CompleteAllComponent";
import TaskListItem from "./components/TaskListItem";
import FilterComponent from "./components/FilterComponent";
import Loader from "./components/Loader";

import {
  addTask,
  updateTask,
  getTasks,
  deleteTask,
  completeAllTask,
  deleteAllCompleted,
} from "./api/api";

import { Task } from "../types/types";

import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

function ToDoApp() {
  // const [toDos, setToDos] = useState<Task[]>([]);

  const [filter, setFilter] = useState<boolean | undefined>();

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["todosquery"],
    queryFn: getTasks,
  });

  const invalidateToDosQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["todosquery"] });
  };

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: invalidateToDosQuery,
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: invalidateToDosQuery,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: invalidateToDosQuery,
  });

  const deleteAllCompletedMutation = useMutation({
    mutationFn: deleteAllCompleted,
    onSuccess: invalidateToDosQuery,
  });

  const completeAllTaskMutation = useMutation({
    mutationFn: completeAllTask,
    onSuccess: invalidateToDosQuery,
  });

  // useEffect(() => {
  //   getAllTasks();
  // }, []);

  // const getAllTasks = async () => {
  //   try {
  //     const data = await getTasks();
  //     setToDos(data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const onAdd = async (task: string) => {
    try {
      addTaskMutation.mutate(task);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    //
    // setToDos((prevState) => {
    //   return [...prevState, { taskName: task, completed: false }];
    // });

    // try {
    //   await addTask(task);
    //   getAllTasks();
    // } catch (error) {
    //   console.error("Error fetching tasks:", error);
    // }
  };

  const onDelete = async (index: number) => {
    try {
      deleteTaskMutation.mutate(data[index].id);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    //
    // setToDos((prevState) => {
    //   const newState = [...prevState];
    //   newState.splice(index, 1);

    //   return newState;
    // });

    // try {
    //   await deleteTask(toDos[index].id);
    //   getAllTasks();
    // } catch (error) {
    //   console.error("Error fetching tasks:", error);
    // }
  };

  const onCompleted = async (index: number, status: boolean) => {
    const task = data[index];
    try {
      updateTaskMutation.mutate({
        taskId: task.id,
        taskName: task.taskName,
        completed: status,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);

      // setToDos((prevState) => {
      //   const newState = [...prevState];
      //   newState[index].completed = status;

      //   return newState;
      // });

      // const task = toDos[index];
      // try {
      //   await updateTask({
      //     taskId: task.id,
      //     taskName: task.taskName,
      //     completed: status,
      //   });
      //   getAllTasks();
      // } catch (error) {
      //   console.error("Error fetching tasks:", error);
      // }
    }
  };

  const onFilter = (filter: boolean | undefined) => {
    setFilter(filter);
  };

  const onClear = async () => {
    try {
      deleteAllCompletedMutation.mutate();
    } catch (error) {
      console.log("Error deleting task", error);
    }
    //
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   return newState.filter((todo) => todo.completed !== true);
    // });
    //

    // try {
    //   await deleteAllCompleted();
    //   getAllTasks();
    // } catch (error) {
    //   console.log("Error deleting task", error);
    // }
  };

  const onCompleteAll = async () => {
    try {
      completeAllTaskMutation.mutate();
    } catch (error) {
      console.log("Error completing task", error);
    }
    //
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   newState.map((todo) => {
    //     todo.completed = true;
    //   });

    //   return newState;
    // });

    // try {
    //   await completeAllTask();
    //   getAllTasks();
    // } catch (error) {
    //   console.log("Error completing task", error);
    // }
  };

  const onEdit = async (inputValue: string, index: number) => {
    const task = data[index];
    try {
      updateTaskMutation.mutate({
        taskId: task.id,
        taskName: inputValue,
        completed: task.completed,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   newState[index].taskName = inputValue;

    //   return newState;
    // });

    // const task = toDos[index];
    // try {
    //   await updateTask(task.id, inputValue, task.completed);
    //   getAllTasks();
    // } catch (error) {
    //   console.error("Error fetching tasks:", error);
    // }
  };

  return (
    <div className="flex justify-center">
      <ToDosContext.Provider value={data}>
        <div className="flex items-center flex-col w-[1000px]">
          <div className="flex justify-center p-2 text-[80px] text-red-800">
            todos
          </div>
          <div className="border-2">
            <div className="flex  p-2 border-b-2">
              <CompleteAllComponent onCompleteAll={onCompleteAll} />
              <InputComponent onAdd={onAdd} />
            </div>
            <div className="flex pl-2  flex-col">
              {isLoading ? (
                <Loader />
              ) : (
                data.map((task: Task, index: number) => (
                  <div key={index} hidden={filter == task.completed}>
                    <TaskListItem
                      task={task}
                      index={index}
                      onDelete={onDelete}
                      onCompleted={onCompleted}
                      onEdit={onEdit}
                    />
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-center p-2 border-t-2">
              <FilterComponent
                count={
                  data?.filter((todo: Task) => todo.completed == false).length
                }
                onFilter={onFilter}
                onClear={onClear}
                filter={filter}
              />
            </div>
          </div>
        </div>
      </ToDosContext.Provider>
    </div>
  );
}

export default function MainPage() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToDoApp />
    </QueryClientProvider>
  );
}
