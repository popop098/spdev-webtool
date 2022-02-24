import fetcher from "../../lib/fetch";
import useSWR from "swr";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash,faCopy,faCheck} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import fetch from "isomorphic-unfetch";
export default function WebHookBar(){
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
    // useEffect(()=>{
    //     if(data){
    //         setPublickey(data.data.uuid);
    //         setToken(data.data.token);
    //     }
    // },[data]);
    return(
        <>
            <div className="card col-span-1 row-span-2 shadow-2xl bg-base-200">
                <div className="card-body">
                    <p className="card-title">URL 단축 API Key</p>
                    <pre className="card-text">
                            Public-Key : abcd
                        </pre>
                    <pre className="card-text">
                            Token : abcd
                        </pre>
                </div>
            </div>
        </>
    )
}
