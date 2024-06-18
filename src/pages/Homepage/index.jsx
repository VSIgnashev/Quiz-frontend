import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="">
      <Header></Header>
      <div className="flex flex-col items-center mt-[146px]">
        <div>
          <img
            className="w-[394px] h-[316px]"
            src="./images/homepage_image.jpg"
            alt="guy solving quiz"
          />
        </div>
        <div className="mt-[72px] flex flex-col items-center">
          <h1 className="font-bold text-4xl ">
            Create your own quiz or take a quiz.
          </h1>
          <span className="font-normal text-base text-[#5C5C5C] mt-[26px]">
            With <span className="font-bold">HonkHONK</span> you can craft your
            own quiz or take on the captivating quizzes created by others.
          </span>
          <div className="mt-[27px] flex gap-x-[43px]">
            <Link to="/CreateQuiz">
              <button className="bg-black text-white rounded-[5px] text-xl w-[289px] h-[40px]">
                Create your first quiz
              </button>
            </Link>
            <Link to="/catalogue">
              <button className="bg-black text-white rounded-[5px] text-xl w-[289px] h-[40px]">
                Take a quiz
              </button>
            </Link>
          </div>
        </div>
        <span className="text-base font-bold mt-[188px]">Socials</span>
      </div>
    </div>
  );
}

export default Homepage;
