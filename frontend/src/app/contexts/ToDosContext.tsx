import { createContext } from "react";
import { Task } from "../../types/types";

const ToDosContext = createContext<Task[]>([]);

export default ToDosContext;
