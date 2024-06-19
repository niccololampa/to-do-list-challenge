"use client";

import { useState, useEffect } from "react";
import ToDosContext from "./contexts/ToDosContext";
import InputComponent from "./components/InputComponent";
import CompleteAllComponent from "./components/CompleteAllComponent";
import TaskListItem from "./components/TaskListItem";
import FilterComponent from "./components/FilterComponent";
import {
  addTask,
  updateTask,
  getTasks,
  deleteTask,
  completeAllTask,
  deleteAllCompleted,
} from "./api/api";

import { Task } from "../types/types";
export default function MainPage() {
  const [toDos, setToDos] = useState<Task[]>([]);

  const [filter, setFilter] = useState<boolean | undefined>();

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const data = await getTasks();
      setToDos(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onAdd = async (task: string) => {
    // setToDos((prevState) => {
    //   return [...prevState, { taskName: task, completed: false }];
    // });

    try {
      await addTask(task);
      getAllTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onDelete = async (index: number) => {
    // setToDos((prevState) => {
    //   const newState = [...prevState];
    //   newState.splice(index, 1);

    //   return newState;
    // });

    try {
      await deleteTask(toDos[index].id);
      getAllTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onCompleted = async (index: number, status: boolean) => {
    // setToDos((prevState) => {
    //   const newState = [...prevState];
    //   newState[index].completed = status;

    //   return newState;
    // });
    const task = toDos[index];
    try {
      await updateTask(task.id, task.taskName, status);
      getAllTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onFilter = (filter: boolean | undefined) => {
    setFilter(filter);
  };

  const onClear = async () => {
    console.log("clear");
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   return newState.filter((todo) => todo.completed !== true);
    // });
    //

    try {
      await deleteAllCompleted();
      getAllTasks();
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const onCompleteAll = async () => {
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   newState.map((todo) => {
    //     todo.completed = true;
    //   });

    //   return newState;
    // });

    try {
      await completeAllTask();
      getAllTasks();
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const onEdit = async (inputValue: string, index: number) => {
    // setToDos((prevState) => {
    //   const newState = [...prevState];

    //   newState[index].taskName = inputValue;

    //   return newState;
    // });

    const task = toDos[index];
    try {
      await updateTask(task.id, inputValue, task.completed);
      getAllTasks();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <ToDosContext.Provider value={toDos}>
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
              {toDos.map((task, index) => (
                <div key={index} hidden={filter == task.completed}>
                  <TaskListItem
                    task={task}
                    index={index}
                    onDelete={onDelete}
                    onCompleted={onCompleted}
                    onEdit={onEdit}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center p-2 border-t-2">
              <FilterComponent
                count={toDos.filter((todo) => todo.completed == false).length}
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
