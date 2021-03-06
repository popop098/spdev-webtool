import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import HeadTag from "../../components/headtag";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";
import {useRouter} from "next/router";
import CountdownTimer from "@sakit-sa/countdown-timer";
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

function getAnimationSettings(originXA, originXB) {
    return {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 150,
        origin: {
            x: randomInRange(originXA, originXB),
            y: Math.random() - 0.2
        }
    };
}
export default function Finish() {
    const refAnimationInstance = useRef(null);
    const [intervalId, setIntervalId] = useState();
    const [IsStop, SetIsStop] = useState(false);
    const [IsCountDown, SetIsCountDown] = useState(false);
    const router = useRouter();

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
            refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 400));
        }
    }, [intervalId, nextTickAnimation]);

    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

    const stopAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        refAnimationInstance.current && refAnimationInstance.current.reset();
    }, [intervalId]);
    function starttimer() {
        setTimeout(() => {
            SetIsStop(true);
        }, 5000)
    }
    function fireworkhandle() {
        startAnimation()
        // if (IsStop) {
        //     stopAnimation();
        // }
        setTimeout(() => {
            clearInterval(intervalId);
            setIntervalId(null);
        }, 5000)
    }
    useEffect(() => {
        startAnimation();
        setTimeout(() => {
            SetIsCountDown(true);
        }, 5000)
    }, []);
    // <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    function Timeout(){
        router.push('/')
    }
    return(
        <>
            <div
                className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">

                <HeadTag title="?????????"/>

                <Navbar/>

                <main>
                    <div className="flex items-center justify-center card min-h-screen bg-base-200">
                        <div className="absolute inset-x-0 top-4">
                            <ul className="w-full steps">
                                <li className="step step-primary">???????????? ??????</li>
                                <li className="step step-primary">????????????</li>
                                <li className="step step-primary">????????????</li>
                            </ul>
                        </div>
                        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles}/>
                        <div className="align-middle">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">???? ??????????????????! ????<br/>????????? ?????????????????????.</h1>
                                <p className="text-xl">
                                    ???????????? ???????????? ????????????????????? ?????????????????????.
                                </p>
                                <p className="text-xl">
                                    ????????????????????? ???????????? ??? ?????????????????? ????????? ???????????? ???????????? ??? ????????????.
                                </p>
                                {
                                    IsCountDown?(
                                        <p className="text-xl">
                                            <CountdownTimer
                                                time={180}
                                                format="mm??? ss???"
                                                onComplete={() => Timeout()}
                                            />??? ?????????????????? ???????????????.
                                        </p>
                                    ):null
                                }
                                <div className="mt-6">
                                    <Link href="/login"><button className="btn btn-primary">???????????????</button></Link>
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
