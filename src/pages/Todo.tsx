import React, { FormEvent, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { onDragEnd } from "../dragAndDropLogic";
import { Todo } from "../model/todo";
import InputFelid from "../components/InputFeild";
import TodoList from "../components/todoList/TodoList";
import { get, post } from "../utils/Requsts";
let limit: number = 7;
let skipNotDone: number = 0;
let skipCompleted: number = 0;
let noMoreOfTodoNotCompleted = false;
let noMoreOfTodoCompleted = false;
const containerVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};
function Todos() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      const [data, err] = await post("/api/create", { todo });
      if (!err) setTodos([...todos, { ...data }]);
      setTodo("");
    }
  };
  const fetchTodos = async () => {
    // if (noMoreOfTodoNotCompleted) return;
    const [data, err] = await get(`/api?limit=${limit}&skip=${skipNotDone}`);
    if (!err) setTodos((prev) => [...prev, ...data]);
    if ((data as Todo[]).length == 0) noMoreOfTodoNotCompleted = true;
    skipNotDone += limit;
  };
  const fetchCompletedTodos = async () => {
    // if (noMoreOfTodoCompleted) return;
    const [data, err] = await get(
      `/api?limit=7&skip=${skipCompleted}&isDone=true`
    );
    if (!err) setCompletedTodos((prev) => [...prev, ...data]);
    if ((data as Todo[]).length === 0) noMoreOfTodoCompleted = true;
    skipCompleted += limit;
  };
  useEffect(() => {
    fetchTodos();
    fetchCompletedTodos();
  }, []);

  if (loading)
    return (
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        className=" fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center"
      >
        <img src="/loading.svg" alt="loading" />
      </motion.div>
    );
  return (
    <DragDropContext
      onDragEnd={(e) =>
        onDragEnd(e, CompletedTodos, setCompletedTodos, todos, setTodos)
      }
    >
      <motion.div
        className="w-full h-full flex flex-col items-center py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          initial={{
            boxShadow: "0px 0px 20px 0px white",
            scale: 1.1,
          }}
          animate={{
            boxShadow: "0px 0px -10px 2px white",
            scale: 1,
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
            },
          }}
          className=" text-center py-2 px-5 text-4xl mb-7 rounded-full font-Neucha text-white "
        >
          Taskedo
        </motion.span>
        <div className="w-fit  flex flex-col items-center">
          <InputFelid todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            CompletedTodos={CompletedTodos}
            setCompletedTodos={setCompletedTodos}
            fetchTodos={fetchTodos}
            fetchCompletedTodos={fetchCompletedTodos}
          />
        </div>
      </motion.div>
    </DragDropContext>
  );
}

export default Todos;
