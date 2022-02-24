import React, {Component, useState} from "react";
import Link from "next/link";
import {useTheme} from "next-themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon,faSun,faUser} from "@fortawesome/free-regular-svg-icons";
import {faToolbox,faLock} from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames";
import { useSession, signIn, signOut } from "next-auth/react"
export default function Navbar() {
    const [menuToggle, setMenuToggle] = useState(false);
    const {theme, setTheme} = useTheme()
    const { data: session } = useSession()
    // }
    return (
        <header className="text-base-content">
            <div className="bg-base-300 rounded-box">
                <div className="navbar">
                    <div className="px-2 mx-2 navbar-start gap-2">
                    <span className="text-lg font-bold">
                        <Link href="/">
                          <a><i><FontAwesomeIcon icon={faToolbox}/> WebTool</i></a>
                        </Link>
                    </span>
                    </div>
                    <div className="hidden md:flex px-2 mx-2 navbar-center">
                        <div className="flex items-stretch">
                            <Link href="/">
                                <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
                            </Link>
                            <Link href="#">
                                <a className="btn btn-ghost btn-sm rounded-btn" onClick={() => alert('준비중입니다.')}>About</a>
                            </Link>
                            <Link href="#">
                                <a className="btn btn-ghost btn-sm rounded-btn" onClick={() => alert('준비중입니다.')}>Contact</a>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-end gap-2">
                        <button className="btn " onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                            <p>{theme==='dark'?'화이트':'다크'}</p>모드
                        </button>
                        {
                            session?(
                                <>
                                    <button className="btn btn-error gap-2" onClick={() => signOut()}>
                                        <FontAwesomeIcon icon={faLock} />
                                        <p>로그아웃</p>
                                    </button>
                                    <div className="tooltip tooltip-bottom" data-tip="프로필">
                                        <Link href="/me">
                                            <button className="btn btn-outline gap-2">
                                                <FontAwesomeIcon icon={faUser} size="2x"/>
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            ):(
                                <button className="btn btn-primary gap-2" onClick={() => signIn()}>
                                    <FontAwesomeIcon icon={faLock} />
                                    <p>로그인</p>
                                </button>
                            )
                        }
                        <div className="md:hidden flex">
                            <button
                                className="btn btn-square btn-ghost"
                                onClick={() => setMenuToggle(!menuToggle)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-6 h-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={classNames(
                        "md:hidden",
                        {hidden: !menuToggle},
                        "animate__animated animate__fadeIn"
                    )}
                >
                    <Link href="/">
                        <a className="block py-2 px-4 text-sm hover:bg-base-200">Home</a>
                    </Link>
                    <Link href="#">
                        <a className="block py-2 px-4 text-sm hover:bg-base-200" onClick={() => alert('준비중입니다.')}>익명게시판</a>
                    </Link>
                    <Link href="#">
                        <a className="block py-2 px-4 text-sm hover:bg-base-200 mb-2" onClick={() => alert('준비중입니다.')}>
                            입시정보
                        </a>
                    </Link>
                </div>
            </div>
        </header>
    );
}
