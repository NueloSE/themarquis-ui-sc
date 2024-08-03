"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();

    const handleClick = ()=>{
        router.push('/signup/verification');
    }
    return (
        <div>
            <div
                className="flex flex-col justify-center py-8 px-12 gap-4 md:gap-4 h-[630px]"
                style={{
                    backgroundImage: `url(/bg-transparent.svg)`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="text-4xl font-medium">
                    <span>WELCOME</span><span className="text-[#00ECFF]"> THE MARQUIS !</span>
                </div>
                <span className="text-[#CACACA]">Use your credentials below and sign up to your account</span>
                <div className="bg-[#21262B] w-[400px] h-[111px] flex flex-col p-4 gap-4 rounded-[8px]">
                    <span>Email</span>
                    <input type="text" placeholder="example@gmail.com" className="bg-transparent focus:outline-none"></input>
                </div>
                <div className="bg-[#21262B] w-[400px] h-[111px] flex flex-col p-4 gap-4 rounded-[8px]">
                    <span>Referral Code</span>
                    <input type="text" placeholder="12DE45KK" className="bg-transparent focus:outline-none"></input>
                </div>

                <div className="flex flex-col justify-start">
                    <span>Already have an account? 
                        <Link href="/login" className="text-[#00ECFF]"> Login here .</Link>
                    </span>
                    <div className="flex gap-4">
                    <input type="checkbox"></input>
                    <span>Remember me</span>
                    </div>

                </div>
                <button className="shadow-button w-[260px] py-4 px-7" onClick={handleClick}>NEXT</button>
            </div>
        </div>
    )
}

export default Page