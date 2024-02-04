import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { Todo } from "../model/todo";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { Draggable } from "react-beautiful-dnd";
import { Delete, put } from "../utils/Requsts";
type Props = {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};
const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(todo.todo);
  const [hide, setHide] = useState(true);
  const editInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    editInput.current?.focus();
  }, [edit]);

  const handleDelete = async (id: number) => {
    setHide(false);
    const [data, err] = await Delete(`/api/delete/${id}`);
    if (!err)
      setTimeout(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      }, 1000);
  };
  const handleSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const [data, err] = await put(`/api/edit/${id}`, { todo: value });
    if (!err)
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, todo: value } : todo
        )
      );
    setEdit(false);
  };
  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="shadow-md rounded-md overflow-hidden"
          >
            <AnimatePresence>
              {hide && (
                <motion.form
                  onSubmit={(e) => handleSubmit(e, todo._id)}
                  initial={{
                    scale: 0.5,
                  }}
                  animate={{ scale: 1 }}
                  className="flex  bg-white min-w-[400px] p-3 mt-2 duration-500"
                  exit={{ y: "40vh", opacity: 1, scale: 1 }}
                >
                  {edit ? (
                    <input
                      value={value}
                      ref={editInput}
                      type="text"
                      className="grow pl-2 outline-none border p-2"
                      spellCheck="false"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  ) : (
                    <span className={`grow `}>{todo.todo}</span>
                  )}

                  <CiEdit
                    onClick={() => {
                      setEdit(!edit);
                    }}
                    className="  text-2xl   cursor-pointer hover:text-green-800  font-bold"
                  />
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(todo._id)}
                    className=" cursor-pointer text-2xl font-bold hover:text-red-800"
                  />
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SingleTodo;
