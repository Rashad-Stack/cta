interface FormButtonsProps {
  setIsOpen(isOpen: boolean): void;
}
export default function FormButtons({ setIsOpen }: FormButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="rounded-sm border border-primary px-4 py-2 text-sm font-bold text-primary"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </button>
      <button
        className="rounded-sm bg-primary px-4 py-2 text-sm font-bold"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
}
