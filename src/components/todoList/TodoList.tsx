import React, { useRef } from "react";
import { Todo } from "../../model/todo";
import { motion } from "framer-motion";
import SingleTodo from "../SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import DargList from "../DargList";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: () => Promise<void>;
  fetchCompletedTodos: () => Promise<void>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  fetchTodos,
  fetchCompletedTodos,
}: Props) => {
  const taskScrollBox = useRef<HTMLDivElement>(null);
  const completedScrollBox = useRef<HTMLDivElement>(null);
  const onScroll = (div: React.RefObject<HTMLDivElement>) => {
    if (div.current) {
      const { scrollTop, scrollHeight, clientHeight } = div.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO get More todo
        if (div.current.id == "dropList") {
          fetchTodos();
        } else fetchCompletedTodos();
      }
    }
  };
  return (
    <div className="flex justify-around gap-7  mx-auto flex-col lg:flex-row container">
      <DargList
        todos={todos}
        header={"tasks"}
        listId={"dropList"}
        setTodos={setTodos}
        reference={taskScrollBox}
        onScroll={onScroll}
      />
      <DargList
        todos={CompletedTodos}
        header={"completed"}
        listId={"todoListDrop"}
        setTodos={setCompletedTodos}
        reference={completedScrollBox}
        onScroll={onScroll}
      />
    </div>
  );
};

export default TodoList;
