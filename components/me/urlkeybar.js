import fetcher from "../../lib/fetch";
import useSWR from "swr";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash,faCopy,faCheck} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import fetch from "isomorphic-unfetch";
export default function UrlKeyBar(){
    const { data, error, mutate } = useSWR("/api/me", fetcher);
    const [copied, setCopied] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [publickey, setPublickey] = useState("");
    const [token, setToken] = useState("");
    const [show, setShow] = useState(false);
    function handleCopy(){
        setCopied(true);
        setTimeout(()=>{
            setCopied(false);
        },2000);
    }
    async function KeyRefresh(){
        await fetch('/api/me/refreshkeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            console.log(res.headers.get('X-RateLimit-Remaining'));
            if(res.status === 200){
                mutate();
                setRefresh(true);
                setTimeout(()=>{
                    setRefresh(false);
                },2000);
            } else if(res.status === 429){
                alert("토큰발급이 제한되었습니다. 잠시 후 다시 시도해주세요.");
            }
        });
    }
    // useEffect(()=>{
    //     if(data){
    //         setPublickey(data.data.uuid);
    //         setToken(data.data.token);
    //     }
    // },[data]);
    console.log(data);
    if(!data){
        return(
            <>
                <div className="card col-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <p className="card-title">URL 단축 API Key</p>
                        <pre className="card-text">
                            Public-Key : 불러오는중입니다.
                        </pre>
                        <pre className="card-text">
                            Token : 불러오는중입니다.
                        </pre>
                        <div className="flex card-actions items-baseline justify-end">
                            <button className="btn btn-outline btn-error" disabled={true}>↻ 재발급</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if(error){
        return(
            <>
                <div className="card col-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <p className="card-title">URL 단축 API Key</p>
                        <pre className="card-text">
                            Public-Key : 에러가 발생했습니다.
                        </pre>
                        <pre className="card-text">
                            Token : 에러가 발생했습니다.
                        </pre>
                        <div className="flex card-actions items-baseline justify-end">
                            <button className="btn btn-outline btn-error" disabled={true}>↻ 재발급</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if(data){
        return(
            <>
                <div className="card col-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <p className="card-title">URL 단축 API Key</p>
                        <pre className="card-text">
                            Public-Key : {data.data.uuid}
                        </pre>
                        <pre className="card-text">
                            Token : {show?(data.data.token):("***********")}
                        </pre>
                        <div className="flex card-actions items-baseline justify-end">
                            <button className="btn btn-outline gap-1" onClick={()=>setShow(!show)}><FontAwesomeIcon icon={show?(faEye):(faEyeSlash)}/> {show?('토큰가리기'):('토큰보기')}</button>
                            <CopyToClipboard text={data.data.token} onCopy={handleCopy}>
                                <button className={copied?("btn btn-outline btn-success gap-1"):("btn btn-outline gap-1")}><FontAwesomeIcon icon={copied?(faCheck):(faCopy)}/> {copied?('복사됨'):('복사하기')}</button>
                            </CopyToClipboard>
                            <button className={refresh?("btn btn-outline btn-success"):("btn btn-outline btn-error")} onClick={KeyRefresh}>{refresh?(<><FontAwesomeIcon icon={faCheck}/>{"재발급됨"}</>):"재발급"}</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
