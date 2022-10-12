import { error } from "console";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { QueryErrorResetBoundary } from "react-query";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from "recoil";
import {
  categoryState,
  todoCategories,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  newCategory: string;
}

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [addCategory, setAddCategory] = useState(todoCategories);
  const onSubmit = ({ newCategory }: IForm) => {
    setAddCategory((oldCategory) => [...oldCategory, newCategory]);
    console.log(addCategory);
    setValue("newCategory", "");
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
        onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("newCategory", { required: "값을 입력해야합니다." })}
          placeholder="Write a new category"
        />
        <button>add</button>
      </form>
      <hr />
      <select value={category} onInput={onInput}>
        {addCategory.map((category: string) => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};
export default ToDoList;
