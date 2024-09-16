/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";

export default function VerificationFailure({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#171C20] w-full max-w-[1150px] rounded-[15px] text-center px-12 py-20 flex flex-col gap-8 justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[32px] font-bold text-white m-0">
          Verification Error: Please Try Again
        </p>
        <p className="text-[20px] text-[#CACACA] text-center m-0 max-w-[828px]">
          There was an issue generating your wallet. Please click 'Try Again'
          and we'll automatically resend your request. No need to re-enter the
          code.
        </p>
        <button
          className="uppercase text-center verify-failure failure-verification rounded-[33px] w-[300px] h-[55px] mt-3"
          onClick={onClose}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}