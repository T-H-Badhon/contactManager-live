import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

const SuccessToast = ({ message }: { message: string }) => {
  return (
    <div>
      <Toast className=" flex  justify-between items-center p-3 mx-auto max-w-md">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center h-8 w-8 shrink-0  rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
        </div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
};

export default SuccessToast;
