import { ErrorMessage, useField } from "formik";
interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
export default function Input({ ...props }: InputProps) {
  const [field] = useField(props);
  return (
    <div className="relative">
      <input
        {...field}
        {...props}
        className="w-full rounded-sm border-none bg-[#bcbcbc]  p-2 text-xs text-stone-900 outline-none placeholder:text-xs placeholder:text-stone-700 dark:bg-[#3d3f41] dark:text-stone-300 placeholder:dark:text-stone-200"
      />

      <ErrorMessage
        name={field.name}
        component="div"
        className="mt-1 text-left text-xs text-red-500"
      />
    </div>
  );
}
