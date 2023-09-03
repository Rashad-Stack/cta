import { ErrorMessage, useField } from "formik";
interface TextareaProps {
  placeholder: string;
  name: string;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}
export default function Textarea({ ...props }: TextareaProps) {
  const [field] = useField(props);
  return (
    <div className="relative">
      <textarea
        {...field}
        {...props}
        className="w-full rounded-sm border-none bg-[#bcbcbc]  p-2 text-xs text-stone-900 outline-none placeholder:text-xs placeholder:text-stone-700 dark:bg-[#3d3f41] dark:text-stone-300 placeholder:dark:text-stone-200"
      ></textarea>
      <ErrorMessage
        name={field.name}
        component="div"
        className="mt-1 text-left text-xs text-red-500"
      />
    </div>
  );
}
