import HeadTag from "../../components/headtag";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function Finish() {
    return(
        <>
            <div
                className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">

                <HeadTag title="로그인"/>

                <Navbar/>

                <main>
                    <div className="flex items-center justify-center card min-h-screen bg-base-200">
                        <div className="align-middle">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">성공적으로 비밀번호를 변경하였습니다.</h1>
                                <p className="text-xl">
                                    아래 버튼을 통해 로그인 페이지로 이동합니다.
                                </p>
                                <div className="mt-6">
                                    <button className="btn btn-primary" onClick={()=>signIn()}>로그인하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>

    )
}
