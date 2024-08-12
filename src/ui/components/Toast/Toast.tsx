import { ToastType } from "@/providers/toast/types";

interface Props {
  type: ToastType
  message: string;
}

export function Toast({ message, type }: Props) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-md flex gap-5 items-center">
      <div className={`w-6 h-6 rounded-full ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />
      <p>{message}</p>
    </div>
  );
}