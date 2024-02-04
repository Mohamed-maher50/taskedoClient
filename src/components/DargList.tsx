import React from "react";
import { Todo } from "../model/todo";
import { motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import SingleTodo from "./SingleTodo";
interface Props {
  todos: Todo[];
  header: string;
  listId: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  reference: React.RefObject<HTMLDivElement>;
  onScroll: (div: React.RefObject<HTMLDivElement>) => void;
}
const DargList: React.FC<Props> = ({
  todos,
  header,
  listId,
  setTodos,
  reference,
  onScroll,
}) => {
  return (
    <div className="flex justify-around gap-7  mx-auto flex-col lg:flex-row container">
      <motion.div
        animate={{
          x: 0,
        }}
        className="min-w-[500px] shadow-md bg-gray-200 mt-4"
      >
        <Droppable droppableId={listId}>
          {(provided) => {
            return (
              <div
                className=" w-full bg-gray-200 p-2  rounded-sm  md:grid-cols-2 md:gap-4 lg:gap-4 duration-500"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="w-fit mx-auto text-3xl  font-extralight">
                  {header}
                </h1>
                <div
                  className="h-[300px] overflow-y-auto"
                  ref={reference}
                  onScroll={() => onScroll(reference)}
                  id={listId}
                >
                  {todos.map((todo, index) => (
                    <SingleTodo
                      index={index}
                      todo={todo}
                      key={todo._id}
                      setTodos={setTodos}
                      todos={todos}
                    />
                  ))}
                  {!todos.length && (
                    <span className="text-center block mt-14 text-3xl text-gray-500">
                      add some tasks
                    </span>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            );
          }}
        </Droppable>
      </motion.div>
    </div>
  );
};

export default DargList;
