"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa6";

const ButtonForm = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="grid w-28 place-items-center rounded border border-gray-400 p-2 "
    >
      {pending ? (
        <span className="block animate-spin">
          <FaSpinner className="rotate-90 transform" />
        </span>
      ) : (
        "Add"
      )}
    </button>
  );
};

export default ButtonForm;
