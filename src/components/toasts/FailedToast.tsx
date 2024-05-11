import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { TError } from "../../types/dataTypes";

const FailedToast = ({ error }: { error: TError }) => {
  console.log(error.data);
  return (
    <div>
      <Toast className=" flex  justify-between items-center p-3 mx-auto max-w-md">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center h-8 w-8 shrink-0  rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            {error?.data?.errorMessage}
          </div>
        </div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
};

export default FailedToast;
