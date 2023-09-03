import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createTask } from "../features/task/taskSlice";
import useAuth from "../hooks/useAuth";
import { TaskTypes } from "../types";
import FormButtons from "./FormButtons";
import Input from "./Input";
import PriorityLevel from "./PriorityLevel";
import Textarea from "./Textarea";

interface AddTaskFormProps {
  setIsOpen(isOpen: boolean): void;
}

const initialState = {
  title: "",
  description: "",
  dueDate: "",
};

const taskValidation = Yup.object({
  title: Yup.string().required("Title is required").min(3).max(30),
  description: Yup.string().required("Description is required").min(3),
  dueDate: Yup.string().required("Due date is required"),
});

export default function AddTaskForm({ setIsOpen }: AddTaskFormProps) {
  const { currentUser } = useAuth();
  const [priority, setPriority] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleOnSubmit(
    values: Partial<TaskTypes>,
    { resetForm }: { resetForm: () => void },
  ) {
    const task = {
      ...values,
      userId: currentUser?.id,
      priority,
    };

    dispatch(createTask(task));
    resetForm();
    setIsOpen(false);
    navigate("/tasks");
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={taskValidation}
      onSubmit={handleOnSubmit}
    >
      {(form) => (
        <Form className="space-y-4">
          <Input
            name="title"
            type="text"
            placeholder="Enter a title"
            onChange={form.handleChange}
          />
          <Textarea
            name="description"
            placeholder="Enter description"
            onChange={form.handleChange}
          />
          <Input
            name="dueDate"
            type="date"
            placeholder="Select Dur date"
            onChange={form.handleChange}
          />

          <PriorityLevel setPriority={setPriority} />

          <FormButtons setIsOpen={setIsOpen} />
        </Form>
      )}
    </Formik>
  );
}
