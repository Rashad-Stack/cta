import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { addTeam } from "../features/team/teamSlice";
import { addToTeam } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";
import { TeamTypes } from "../types";
import FormButtons from "./FormButtons";
import Input from "./Input";

interface NewTeamFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const teamFormValidation = Yup.object({
  teamName: Yup.string().required("Team name is required").min(3).max(20),
});

export default function NewTeamForm({ setIsOpen }: NewTeamFormProps) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  function handleSubmit(
    values: Partial<TeamTypes>,
    { resetForm }: { resetForm: () => void },
  ) {
    const team = {
      ...values,
      id: uuidv4(),
      userId: currentUser!.id,
    };
    // Creating new team
    dispatch(addTeam(team));
    // adding current user to the team
    dispatch(addToTeam({ userId: currentUser!.id, teamId: team.id }));
    resetForm();
    setIsOpen(false);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        teamName: "",
      }}
      validationSchema={teamFormValidation}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <Form className="space-y-4">
          <Input
            type="text"
            name="teamName"
            placeholder="Team Name"
            onChange={form.handleChange}
          />
          <FormButtons setIsOpen={setIsOpen} />
        </Form>
      )}
    </Formik>
  );
}
