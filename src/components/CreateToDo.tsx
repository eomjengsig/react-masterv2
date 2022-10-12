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
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
      }}
      onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "값을 입력해야합니다." })}
        placeholder="Write a to do"
      />

      <button>Add</button>
      <span>{errors?.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
