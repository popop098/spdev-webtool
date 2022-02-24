import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import HeadTag from "../../components/headtag";
import "animate.css";
import {useState} from 'react'
import {ToastContainer, toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from "next-auth/react";
import fetch from "isomorphic-unfetch";
import PasswordStrengthBar from 'react-password-strength-bar';
import CountdownTimer from '@sakit-sa/countdown-timer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import * as path from "path";
export default function Home() {
    const [Id, SetId] = useState('')
    const [Pwd, SetPwd] = useState('')
    const [PwdRe, SetPwdRe] = useState('')
    const [Email, SetEmail] = useState('')
    const [SendEmail, SetSendEmail] = useState(false)
    const [IsVerify, SetIsVerify] = useState(false)
    const [IsError,SetIsError] = useState(false)
    const [IsOk,SetIsOk] = useState(false)
    const [IsLoading,SetIsLoading] = useState(false)
    const {query} = useRouter()
    const router = useRouter()
    const IdChange = (content) => {
        // console.log(content);
        SetId(content.target.value)
    };
    const PwdChange = (content) => {
        // console.log(content);
        SetPwd(content.target.value)
    };
    const PwdReChange = (content) => {
        // console.log(content);
        SetPwdRe(content.target.value)
        if(content.target.value === Pwd){
            SetIsError(false)
            SetIsOk(true)
        }else{
            SetIsError(true)
        }
    };

    const register = async (e) => {
        SetIsLoading(true)
        const loadid = toast.loading("재설정중입니다...");
        await fetch("/api/resetpwd", {
            method: "POST",
            body: JSON.stringify(
                {
                    'uuid':query.uuid,
                    'token':query.code,
                    "pwd": Pwd
                }
            ),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    // SetEmail('')
                    // SetCode('')
                    // SetIsCountDown(false)
                    // SetVerifyCode('')
                    // SetSendEmail(false)
                    // SetCanEditAddress(false)
                    SetIsLoading(false)
                    await router.push('/resetpwd/success')
                    // toast.update(
                    //     loadid,
                    //     {type: "success", render: "입력하신 이메일로 ID를 안내해드렸습니다. 메일함을 확인해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
                    // )
                } else {
                    SetIsLoading(false)
                    toast.update(
                        loadid,
                        {
                            type: "error",
                            render: "비밀번호를 재설정할 권한이 없습니다.",
                            autoClose: 5000,
                            isLoading: false,
                            transition: Flip
                        }
                    )
                }

            })
            .catch(err => {
                if (err) {
                    toast.update(
                        loadid,
                        {type: "error", render: "시스템에 오류가 발생하였습니다.", autoClose: 5000, isLoading: false, transition: Flip}
                    )
                }
            })
    }

    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="px-8 py-8 my-24 text-left card bg-base-100 shadow-lg w-1/2">
                        <ToastContainer position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover/>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center">비밀번호 재설정하기</h3>
                        <form>
                            <div className="mt-4 form-control">
                                <div className="mt-4">
                                    <label className="block">비밀번호</label>
                                    <div className="relative">
                                        <input placeholder="password"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password"
                                               name="pwd" required={true}
                                               onChange={PwdChange}/>
                                        <PasswordStrengthBar password={Pwd}
                                                             minLength={5}/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block">비밀번호 재입력</label>
                                    <div className="relative">
                                        <input placeholder="password-re"
                                               className={IsError?("w-full px-4 py-2 mt-2 input input-primary input-error"):("w-full px-4 py-2 mt-2 input input-primary")} type="password"
                                               name="pwdre" required={true}
                                               onChange={PwdReChange} />
                                        {
                                            IsError?(
                                                <label className="label">
                                                    <span className="label-text-alt text-red-500">⚠ 비밀번호가 서로 달라요.</span>
                                                </label>
                                            ):null
                                        }

                                    </div>
                                </div>

                                <div className="flex items-baseline justify-end" style={{textAlign: 'right'}}>
                                    <button className={IsLoading?("btn btn-md text-sm mt-2 loading"):("btn btn-md text-sm mt-2")} type="button" onClick={register} disabled={!IsOk}>{IsLoading?('재설정중입니다.'):('재설정하기')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
