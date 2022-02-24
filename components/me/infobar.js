import {signOut, useSession} from 'next-auth/react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus} from "@fortawesome/free-solid-svg-icons";
import fetch from "isomorphic-unfetch";
export default function MeInfoBar(){
    const {data:session,status} = useSession()
    function HandleUnRegister(){
        fetch('/api/unregister',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                signOut()
            }
        })
    }
    if(status === 'loading'){
        return (
            <>
                <div className="card col-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <p className="card-title">유저ID - 불러오는중입니다.</p>
                        <p className="card-text">
                            Email - 불러오는중입니다.
                        </p>
                        <div className="flex card-actions items-baseline justify-end">
                            <button className="btn btn-outline btn-error gap-1" disabled={true}><FontAwesomeIcon icon={faUserMinus}/>회원탈퇴</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if(status==="authenticated"){
        return (
            <>
                <div className="modal" id="unregister">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">정말로 탈퇴하시겠습니까?</h3>
                        <p className="py-4">탈퇴하시게 될 경우 모든 정보가 삭제되며 복구가 불가능합니다.</p>
                        <div className="modal-action">
                            <a href="#" className="btn btn-outline">취소</a>
                            <a href="#" className="btn btn-outline btn-error gap-1" onClick={HandleUnRegister}><FontAwesomeIcon icon={faUserMinus}/>탈퇴</a>
                        </div>
                    </div>
                </div>
                <div className="card col-span-2 shadow-2xl bg-base-200">
                    <div className="card-body">
                        <p className="card-title">유저ID - {session?(session.user.id):"불러올수없음"}</p>
                        <p className="card-text">
                            Email - {session?(session.user.email):"불러올수없음"}
                        </p>
                        <div className="flex card-actions items-baseline justify-end">
                            <a href="#unregister"><button className="btn btn-outline btn-error gap-1"><FontAwesomeIcon icon={faUserMinus}/>회원탈퇴</button></a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
