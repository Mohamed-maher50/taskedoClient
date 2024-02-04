import { Todo } from "../model/todo";
import { DropResult } from "react-beautiful-dnd";
import { put } from "../utils/Requsts";

export const onDragEnd = async (
  e: DropResult,
  CompletedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const { destination, source, draggableId } = e;
  if (!destination) return;
  if (destination.droppableId === source.droppableId) return;
  let active = [...todos];
  let add;
  let complete = [...CompletedTodos];
  if (destination.droppableId === "todoListDrop")
    add = active.splice(source.index, 1);
  else add = complete.splice(source.index, 1);
  if (destination.droppableId === "todoListDrop") {
    complete.splice(destination.index, 0, complete[destination.index]);
    complete.splice(destination.index, 1);
    complete.splice(destination.index, 0, add[0]);
  } else {
    active.splice(destination.index, 0, complete[destination.index]);
    active.splice(destination.index, 1);
    active.splice(destination.index, 0, add[0]);
  }

  const [data, err] = await put(`/api/completed/${draggableId}`);

  setTodos(active);
  setCompletedTodos(complete);
};
