import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import HeadTag from "../../components/headtag";
import {useSession} from "next-auth/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock,faUserMinus,faCheck} from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from "react-password-strength-bar";
import {useState,useEffect} from "react";
import {Flip, toast, ToastContainer} from "react-toastify";
import fetch from "isomorphic-unfetch";
import {useRouter} from "next/router";
import MeInfoBar from "../../components/me/infobar";
import UrlKeyBar from "../../components/me/urlkeybar";
import LogBar from "../../components/me/logbar";
import WebHookBar from "../../components/me/webhookbar";
export default function Me() {
    const {data: session,status} = useSession();
    const [Pwd, SetPwd] = useState('')
    const [PwdRe, SetPwdRe] = useState('')
    const [IsError,SetIsError] = useState(false)
    const [IsOk,SetIsOk] = useState(false)
    const [IsLoading,SetIsLoading] = useState(false)
    const [ResetPwd,SetResetPwd] = useState(false)
    const router = useRouter()
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
            SetIsOk(false)
        }
    };
    const register = async (e) => {
        SetIsLoading(true)
        await fetch("/api/me/resetpwd", {
            method: "POST",
            body: JSON.stringify(
                {
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
                    SetResetPwd(true)
                    SetPwd('')
                    SetPwdRe('')
                    SetIsOk(false)
                    setTimeout(() => {
                        SetResetPwd(false)
                    }, 2000);
                    // toast.update(
                    //     loadid,
                    //     {type: "success", render: "입력하신 이메일로 ID를 안내해드렸습니다. 메일함을 확인해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
                    // )
                } else {
                    SetIsLoading(false)
                }

            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }
    useEffect(()=>{
        if(status=== "unauthenticated"){
            alert('로그인 후 이용해주세요.')
            router.push('/login')
        }
    },[router, status])
    return (
        <div className="p-2 lg:p-5 bg-base-100">
            <HeadTag title="Me"/>
            <Navbar/>
            <main>
                <div className="grid grid-cols-3 grid-rows-4 gap-6 mb-6 mt-6">
                    <MeInfoBar/>
                    <div className="card col-span-1 row-span-2 shadow-2xl bg-base-200">
                        <div className="card-body">
                            <div className="card-title">
                                <p><FontAwesomeIcon icon={faLock}/> 비밀번호 변경</p>
                            </div>
                            {
                                ResetPwd?(
                                    <>
                                        <div className="alert shadow-lg alert-success">
                                            <div className="gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                <span>
                                                    비밀번호가 변경되었습니다.
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ):null
                            }

                            <form>
                                <div className="mt-4 form-control">
                                    <div className="mt-4">
                                        <label className="block">비밀번호</label>
                                        <div className="relative">
                                            <input placeholder="password"
                                                   className="w-full px-4 py-2 mt-2 input input-primary" type="password"
                                                   name="pwd" required={true}
                                                   onChange={PwdChange} value={Pwd}/>
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
                                                   onChange={PwdReChange} value={PwdRe} />
                                            {
                                                IsError?(
                                                    <label className="label">
                                                        <span className="label-text-alt text-red-500">⚠ 비밀번호가 서로 달라요.</span>
                                                    </label>
                                                ):null
                                            }

                                        </div>
                                    </div>

                                </div>
                            </form>
                            <div className="flex card-actions items-baseline justify-end" style={{textAlign: 'right'}}>
                                <button className={IsLoading?("btn btn-md text-sm mt-2 loading"):("btn btn-md btn-primary text-sm mt-2")} type="button" onClick={register} disabled={!IsOk}>{IsLoading?('재설정중입니다.'):('재설정하기')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <UrlKeyBar/>
                    <LogBar/>
                    <WebHookBar/>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
