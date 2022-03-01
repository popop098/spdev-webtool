import fetcher from "../../lib/fetch";
import useSWR from "swr";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash,faCopy,faCheck,faCloudUploadAlt,faQuestionCircle,faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {useEffect} from "react";
import fetch from "isomorphic-unfetch";
export default function WebHookBar(){
    const { data, error, mutate } = useSWR("/api/me/webhook", fetcher);
    const [isuse, setisuse] = useState(false);
    const [url, seturl] = useState(false);
    const [saved, setsaved] = useState(false);
    const [tested, settested] = useState(false);
    // const { data, error, mutate } = useSWR("/api/me", fetcher);
    // const [copied, setCopied] = useState(false);
    // const [refresh, setRefresh] = useState(false);
    // const [publickey, setPublickey] = useState("");
    // const [token, setToken] = useState("");
    // const [show, setShow] = useState(false);
    // function handleCopy(){
    //     setCopied(true);
    //     setTimeout(()=>{
    //         setCopied(false);
    //     },2000);
    // }
    // async function KeyRefresh(){
    //     await fetch('/api/me/refreshkeys',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(res=>{
    //         console.log(res.headers.get('X-RateLimit-Remaining'));
    //         if(res.status === 200){
    //             mutate();
    //             setRefresh(true);
    //             setTimeout(()=>{
    //                 setRefresh(false);
    //             },2000);
    //         } else if(res.status === 429){
    //             alert("토큰발급이 제한되었습니다. 잠시 후 다시 시도해주세요.");
    //         }
    //     });
    // }
    useEffect(()=>{
        if(data){
            setisuse(data.data.isuse);
            seturl(data.data.webhookurl);
        }
    },[data]);
    function handletogle(e){
        setisuse(e.target.checked);
    }
    function handleurl(e){
        seturl(e.target.value);
    }
    function save(){
        if(!url){
            alert("URL을 입력해주세요.");
            return;
        }
        fetch('/api/me/webhook',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isuse: isuse,
                url: url
            })
        }).then(res=>{
            if(res.status === 200){
                mutate();
                setsaved(true);
                setTimeout(()=>{
                    setsaved(false);
                },2000);
            } else if(res.status === 429){
                alert("API요청이 제한되었습니다. 잠시 후 다시 시도해주세요.");
            }
        });
    }
    function TestSendWebhook(){
        fetch('/api/me/webhook',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            if(res.status === 200){
                settested(true);
                setTimeout(()=>{
                    settested(false);
                },2000);
            } else if(res.status === 429){
                alert("API요청이 제한되었습니다. 잠시 후 다시 시도해주세요.");
            }
        });
    }
    console.log(data);
    if(!data){
        return <div>로딩중...</div>
    } else if(error){
        return <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
    } else if(data){
        return(
            <>
                <div className="card col-span-1 row-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">

                        <p className="card-title"><FontAwesomeIcon icon={faDiscord}/> Discord Webhook <div
                            className="tooltip tooltip-bottom tooltip-primary" data-tip="Discord Webhook을 통해 사용자의 이벤트로그를 발송해드리는 서비스입니다."><FontAwesomeIcon icon={faQuestionCircle}/></div> <div
                            className="tooltip tooltip-bottom tooltip-primary" data-tip="주의하세요. Webhook URL이 유출될시 테러로 이어질수있습니다!"><FontAwesomeIcon icon={faExclamationCircle} color={'red'}/></div></p>
                        {
                            saved?(
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
                                            정상적으로 저장되었습니다.
                                        </span>
                                        </div>
                                    </div>
                                </>
                            ):null
                        }
                        {
                            tested?(
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
                                            정상적으로 발송되었습니다.
                                        </span>
                                        </div>
                                    </div>
                                </>
                            ):null
                        }
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Webhook 사용</span>
                                <input type="checkbox" className="toggle toggle-accent" checked={isuse} onChange={handletogle}/>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Webhook URL입력</span>
                            </label>
                            <input type="password" className="input input-primary w-full" placeholder="여기에 Webhook 링크입력" name="webhook" value={url} onChange={handleurl} disabled={!isuse}/>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={TestSendWebhook} disabled={!isuse}>테스트</button>
                            <button className="btn btn-primary gap-2" onClick={save} disabled={saved}><FontAwesomeIcon icon={faCloudUploadAlt}/>저장</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
