import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import "animate.css";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const router = useRouter()
    const [Id, SetId] = useState('')
    const [Pwd, SetPwd] = useState('')
    const [ShowPwd, SetShowPwd] = useState(false)
    const IdChange = (content) => {
        SetId(content.target.value)
    };
    const PwdChange = (content) => {
        // console.log(content);
        SetPwd(content.target.value)
    };
    const login = async (e) => {
        // 원래 실행되는 이벤트 취소
        e.preventDefault();
        // Form 안에서 이메일, 패스워드 가져오기
        const id = Id
        const pwd = Pwd
        const response = await signIn("credentials", {
            id,
            pwd,
            redirect: false,
            callbackUrl:process.env.CALLBACKURL
        });
        console.log(response);
        if(response.status===200){
            await router.push(response.url)
        }else{
            alert("아이디 또는 비밀번호가 잘못되었습니다.")
        }

    }
    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-100 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-300">
                    <div className="px-10 py-8 mt-4 text-left card bg-base-100 shadow-lg">
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
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                        <form>
                            <div className="mt-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">ID</span>
                                    </label>
                                    <input type="text" placeholder="ID" name="id" className="input input-bordered" required={true}
                                           onChange={IdChange}/>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="input-group">
                                        <input type={ShowPwd?("text"):("password")} placeholder="Password" name="pwd" className="input input-bordered" required={true}
                                               onChange={PwdChange}/>
                                        <button className="btn btn-outline" onClick={()=>SetShowPwd(!ShowPwd)} type="button"><FontAwesomeIcon icon={ShowPwd? (faEye):(faEyeSlash)}/></button>
                                    </div>

                                </div>
                                <div className="my-4 form-control" style={{textAlign:'right'}}>
                                    <div>
                                        <button type="button" className="btn" onClick={login}>로그인</button>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <div className="divider">or</div>
                                </div>
                                <div className="flex items-baseline justify-between gap-2">
                                    <Link href="/register/tos"><button className="btn">회원가입</button></Link>
                                    <Link href="/findid"><button className="btn">ID찾기</button></Link>
                                    <Link href="/findpwd"><button className="btn">비밀번호찾기</button></Link>
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
