"use client";

import { useState } from "react";
import ToDosContext from "./contexts/ToDosContext";
import InputComponent from "./components/InputComponent";
import CompleteAllComponent from "./components/CompleteAllComponent";
import TaskListItem from "./components/TaskListItem";
import FilterComponent from "./components/FilterComponent";

import { Task } from "../types/types";
export default function MainPage() {
  const [toDos, setToDos] = useState<Task[]>([]);

  const [filter, setFilter] = useState<boolean | undefined>();

  const onAdd = (task: string) => {
    setToDos((prevState) => {
      return [...prevState, { taskName: task, completed: false }];
    });
  };

  const onDelete = (index: number) => {
    setToDos((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);

      return newState;
    });
  };

  const onCompleted = (index: number, status: boolean) => {
    setToDos((prevState) => {
      const newState = [...prevState];
      newState[index].completed = status;

      return newState;
    });
  };

  const onFilter = (filter) => {
    setFilter(filter);
  };

  const onClear = () => {
    console.log("clear");
    setToDos((prevState) => {
      const newState = [...prevState];

      return newState.filter((todo) => todo.completed !== true);
    });
  };

  const onCompleteAll = () => {
    setToDos((prevState) => {
      const newState = [...prevState];

      newState.map((todo) => {
        todo.completed = true;
      });

      return newState;
    });
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
                <div key={index} hidden={filter === task.completed}>
                  <TaskListItem
                    task={task}
                    index={index}
                    onDelete={onDelete}
                    onCompleted={onCompleted}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center p-2 border-t-2">
              <FilterComponent
                count={toDos.length}
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
