import { useState } from "react";
import { TeamTypes } from "../types";
import ModalDialog from "./ModalDialog";
import UserAddCard from "./UserAddCard";

interface TeamCardProps {
  team: TeamTypes;
}

export default function AddMember({ team }: TeamCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="w-full rounded-sm bg-primary px-2 py-1 text-sm font-bold text-stone-900"
        onClick={() => setIsOpen(true)}
      >
        Add Member
      </button>
      <ModalDialog
        title="Select Member"
        ModalElement={() => <UserAddCard team={team} setIsOpen={setIsOpen} />}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
