import { useEffect, useState } from "react";
import gsap from "gsap";
import jeremy from "./assets/image-jeremy.png";
import Card from "./components/Card";
import work from "./assets/icon-work.svg";
import play from "./assets/icon-play.svg";
import study from "./assets/icon-study.svg";
import exercise from "./assets/icon-exercise.svg";
import social from "./assets/icon-social.svg";
import selfCare from "./assets/icon-self-care.svg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const cardImages = [work, play, study, exercise, social, selfCare];
const tabs = ["daily", "weekly", "monthly"];

function App() {
  const [cardData, setCardData] = useState([]);
  const [activeTab, setActiveTab] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      "#big-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [cardData]);

  useGSAP(() => {
    gsap.fromTo(
      ".card-animate",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
    );
  }, [cardData, activeTab]);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen bg-navy-950">
      <div className="text-white text-lg">Loading...</div>
    </div>
  ) : (
    <main className="font-[family-name:var(--font-rubik)] relative flex items-center justify-center min-h-screen bg-navy-950 w-full px-6 py-20">
      <div className="grid grid-cols-1 grid-rows-[1fr_repeat(6,10.5rem)] gap-6 sm:grid-cols-[repeat(2,15rem)] sm:grid-rows-4 lg:grid-cols-[repeat(4,14rem)] lg:grid-rows-2">
        <article
          id="big-card"
          className="bg-navy-900 flex flex-col rounded-xl sm:col-span-2 lg:row-span-2 lg:col-span-1"
        >
          <div className="bg-purple-600 flex items-center gap-x-4 rounded-xl py-8 px-6 lg:flex-col lg:items-start lg:px-7 lg:pb-16 lg:gap-y-8">
            <img
              src={jeremy}
              alt="jeremy"
              className="w-18 border-3 border-white rounded-full lg:w-17"
            />
            <div className="flex flex-col">
              <p className="text-navy-200 text-sm">Report for</p>
              <h1 className="text-white font-light text-2xl lg:text-4xl">
                Jeremy Robson
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-around px-4 py-5 lg:flex-col lg:items-start lg:px-7 lg:gap-y-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-purple-500 cursor-pointer outline-0 capitalize hover:text-white transition-colors duration-200 lg:text-sm ${
                  activeTab === tab ? "text-white" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </article>

        {cardData.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            timeFrames={item.timeframes}
            activeTab={activeTab}
            bgColor={item.bgColor}
            imgSrc={cardImages[index]}
            className="card-animate"
          />
        ))}
      </div>

      <div class="text-white text-sm absolute bottom-4 left-1/2 transform -translate-x-1/2">
        Challenge by{" "}
        <a
          className="text-blue-200 hover:text-blue-300"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          className="text-blue-200 hover:text-blue-300"
          href="https://www.frontendmentor.io/profile/HammamYousef"
        >
          Hammam Yousef
        </a>
        .
      </div>
    </main>
  );
}

export default App;
