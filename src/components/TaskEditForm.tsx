import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { taskSelectors, updateTask } from "../features/task/taskSlice";
import { TaskTypes } from "../types";
import FormButtons from "./FormButtons";
import Input from "./Input";
import PriorityLevel from "./PriorityLevel";
import StatusDropdown from "./StatusDropdown";
import Textarea from "./Textarea";

interface TaskEditFormProps {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}

const taskValidation = Yup.object({
  title: Yup.string().required("Title is required").min(3).max(30),
  description: Yup.string().required("Description is required").min(3),
  dueDate: Yup.date().required("Due date is required"),
});

export default function TaskEditForm({ id, setIsOpen }: TaskEditFormProps) {
  const tasks = useSelector(taskSelectors);
  const [newStat, setNewStat] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const taskToEdit = tasks.find((task) => task.id === id);

  const initialState = {
    ...taskToEdit,
    title: taskToEdit?.title,
    description: taskToEdit?.description,
    dueDate: taskToEdit?.dueDate,
    priority: taskToEdit?.priority,
  };

  const dispatch = useDispatch();

  function handleOnSubmit(
    values: Partial<TaskTypes>,
    { resetForm }: { resetForm: () => void },
  ) {
    const task = {
      ...taskToEdit,
      ...values,
      status: newStat,
      priority,
    };

    dispatch(updateTask({ id, task }));

    resetForm();
    setIsOpen(false);
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
            placeholder="Enter description"
            onChange={form.handleChange}
          />

          <div className="flex justify-between gap-4">
            <StatusDropdown
              preStatus={taskToEdit?.status}
              setNewStat={setNewStat}
            />
            <PriorityLevel
              prevState={taskToEdit?.priority}
              setPriority={setPriority}
            />
          </div>

          <FormButtons setIsOpen={setIsOpen} />
        </Form>
      )}
    </Formik>
  );
}
