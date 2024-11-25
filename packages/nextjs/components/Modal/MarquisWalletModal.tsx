import Image from "next/image";
import { notification } from "~~/utils/scaffold-stark";
import useScaffoldStrkBalance from "~~/hooks/scaffold-stark/useScaffoldStrkBalance";
import useScaffoldEthBalance from "~~/hooks/scaffold-stark/useScaffoldEthBalance";
import useGetUserInfo from "~~/utils/api/hooks/useGetUserInfo";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useLogout from "~~/utils/api/hooks/useLogout";
import { copyToClipboardAction } from "~~/utils/ToolActions";

interface ModalMarquisWalletProps {
  isOpen: boolean;
  onClose: () => void;
  isInvitationOpen: boolean;
  setIsInvitationOpen: (value: boolean) => void;
}

const MarquisSettingSide = ({
  referralCode,
  onLogout,
  onClose,
  setIsInvitationOpen,
}: {
  referralCode: string;
  onLogout: () => void;
  onClose: () => void;
  setIsInvitationOpen: (value: boolean) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 mt-[4px]">
      <div
        onClick={() => copyToClipboardAction(referralCode)}
        className="cursor-pointer py-[18px] px-3 rounded-[8px]  bg-[#2E353C] hover:bg-[#2E353C] flex items-center gap-3"
      >
        <Image src={"/copy-right.svg"} alt="icon" width={14} height={14} />
        <p>Copy Referral Code</p>
      </div>
      <div
        onClick={() => {
          setIsInvitationOpen(true);
          onClose();
        }}
        className="cursor-pointer py-[18px] px-3 rounded-[8px]  bg-[#2E353C] hover:bg-[#2E353C] flex items-center gap-3"
      >
        <Image src={"/friends.svg"} alt="icon" width={14} height={14} />
        <p>Invite Friend</p>
      </div>
      <div
        onClick={onLogout}
        className="cursor-pointer py-[18px] px-3 rounded-[8px]  bg-[#2E353C] hover:bg-[#2E353C] flex items-center gap-3"
      >
        <Image src={"/logout-icon.svg"} alt="icon" width={14} height={14} />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default function MarquisWalletModal({
  isOpen,
  onClose,
  setIsInvitationOpen,
}: ModalMarquisWalletProps) {
  const { data } = useGetUserInfo();
  const [animateModal, setAnimateModal] = useState<boolean>(false);
  const [isSetting, setIsSetting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const strkBalanceWallet = useScaffoldStrkBalance({
    address: data?.account_address,
  });
  const ethBalanceWallet = useScaffoldEthBalance({
    address: data?.account_address,
  });

  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text).then(
        () => {
          notification.success("Coppied successfully");
        },
        (err) => {
          console.error("Failed to copy: ", err);
        }
      );
    }
  };

  const handleLogoutSuccess = () => {
    queryClient.setQueryData(["userEmail"], null);
    queryClient.removeQueries({ queryKey: ["userInfo"] });
    queryClient.invalidateQueries({
      refetchType: "active",
    });
    queryClient.setQueryData(["userInfo"], null);
    localStorage.removeItem("loginCountdown");
    localStorage.removeItem("signupCountdown");
    onClose();
    notification.success("Logout successfully");
    router.push("/login");
  };

  const handleLogoutFailed = (error: any) => {
    console.log("Logout failed", error);
  };

  const { mutate: logout } = useLogout(handleLogoutSuccess, handleLogoutFailed);

  const handleLogout = () => {
    logout();
    onClose();
    setIsSetting(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
        setIsSetting(false);
      }
    }

    if (isOpen) {
      setAnimateModal(true);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setAnimateModal(false);
      setTimeout(() => {
        document.removeEventListener("mousedown", handleClickOutside);
      }, 300);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ${
          animateModal ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 1000 }}
      ></div> */}
      <div
        className="h-fit absolute top-[80px] right-0"
        style={{ zIndex: 1000 }}
      >
        <div
          ref={modalRef}
          className={`font-arial w-[355px] h-[auto] rounded-[30px] px-[30px] py-[36px] bg-[#171C20] transition-all duration-300 transform ${
            animateModal
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 translate-y-10 opacity-0"
          }`}
          style={{
            border: "1px solid #5C5C5C",
          }}
        >
          <div className="">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <Image
                  src="/marquis-icon.svg"
                  alt="logo"
                  width={22}
                  height={22}
                />
                <p className="font-bold text-[14px]">Marquis Wallet</p>
              </div>
              <button
                onClick={onClose}
                className=" hover:text-gray-400 transition-colors"
              >
                X
              </button>
            </div>

            <div className="flex items-center gap-2 ml-9">
              <Image
                src="/marquis-point.svg"
                height={16}
                width={16}
                alt="icon"
              />
              <p className="text-[12px]">{data?.user?.points} Pts.</p>
            </div>
          </div>

          <div>
            <div
              className="text-[20px] font-semibold cursor-pointer mt-[44px] whitespace-nowrap"
              onClick={() => copyToClipboard(data?.user?.email)}
            >
              <p className="text-center">{data?.user?.email}</p>
            </div>
            <div
              onClick={() => {
                onClose();
              }}
            >
              <a
                href="/withdrawal"
                className="mt-[20px] w-[118px] h-[30px] mx-auto cursor-pointer text-[14px] text-[#000] font-medium bg-[#00ECFF] rounded-[5px] flex justify-center items-center gap-[7px] mb-5"
              >
                <Image
                  src={"/withdraw-dropdown.svg"}
                  alt="icon"
                  width={14}
                  height={14}
                />
                <p>Withdraw</p>
              </a>
            </div>

            {/* here it is  */}
            <div className="p-3 bg-[#21262B] rounded-xl ">
              <div className="rounded-lg   ">
                <div className="bg-[#2E353C] rounded-lg p-3 mb-4 hover:bg-[#2A3036] transition-colors ">
                  <div className="flex items-center justify-center text-white mb-2 text-[16px] font-Arial font-bold">
                    Balance
                  </div>

                  <div className="flex flex-col gap-[23px] mt-[5px]">
                    <div className="flex justify-between items-center">
                      <Image
                        src={"/logo-starknet.svg"}
                        alt="icon"
                        width={22}
                        height={22}
                      />
                      <p className="text-[14px] uppercase text-right">
                        {parseFloat(strkBalanceWallet.formatted).toFixed(2)}{" "}
                        STRK
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Image
                        src={"/logo-eth.svg"}
                        alt="icon"
                        width={22}
                        height={22}
                      />
                      <p className="text-[14px] uppercase text-right">
                        {parseFloat(ethBalanceWallet.formatted).toFixed(8)} ETH
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Image
                        src={"/usdc.svg"}
                        alt="icon"
                        width={22}
                        height={22}
                      />
                      <p className="text-[14px] uppercase text-right text-[#7A7A7A]">
                        0.00 USDC
                      </p>
                    </div>
                  </div>
                </div>
                <MarquisSettingSide
                  referralCode={data?.referral_code ?? ""}
                  onLogout={handleLogout}
                  onClose={onClose}
                  setIsInvitationOpen={setIsInvitationOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
