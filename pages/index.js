import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HeadTag from "../components/headtag";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import TypeAnimation from 'react-type-animation';
export default function Home() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 30) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
  return (
      <div className="grid p-2 lg:p-5 grid-cols-1 gap-6 bg-base-100">
        <HeadTag title="Hi" />
        <Navbar />
        <main>
          {showButton && (
              <button onClick={scrollToTop} className="btn btn-primary fixed" style={{bottom:'20px',right:'20px'}}>
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
          )}
          <div className="min-h-screen space-y-96">
            <div className="col-span-1 m-64 animate__animated animate__fadeIn">
              <div>
                <div className="flex gap-10">
                  <div className="place-self-center">
                    <h1 className="text-5xl font-bold">개발자라면 유용한 서비스</h1><br/>
                    <p>개발에 도움이 되는 유용한 API서비스가 준비되어있습니다.</p>
                  </div>
                  <div className="mockup-code w-auto bg-slate-700">
                    <pre data-prefix="1"><code>await fetch("https://webtool.apcedev.space/api/url")</code></pre>
                  </div>
                </div>
                <button className="mt-2 btn btn-primary">Get Started</button>
              </div>
            </div>
            <div className="col-span-1 m-64 text-center">
              <div className="animate__animated animate__fadeIn">
                <div className="gap-10 space-y-4">
                  <div className="place-self-center">
                    <h1 className="text-5xl font-bold">누구나 사용할수있습니다.</h1>
                  </div>
                  <TypeAnimation
                      cursor={true}
                      sequence={['학생 개발자', 3000, '주니어 개발자',3000,'앱 개발자',3000,'웹 개발자',3000,'기타 개발자',3000]}
                      wrapper="p"
                      className="text-6xl font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

        </main>
        <Footer />
      </div>
  )
}
