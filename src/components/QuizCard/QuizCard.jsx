import { useState, useRef, useEffect, React } from "react";
import { Link } from "react-router-dom";
import DownloadImage from "../DownloadImage/DownloadImage";

function QuizCard({
  title = `Quiz name`,
  questionsAmount,
  description = `I've used this extension with VS Code for a while now. Works really well with React in both Javascript  `,
  editable = false,
  quizId,
  imageId,
}) {
  const [showButtons, setShowButtons] = useState(false);

  const ref = useRef(null);

  const onClickOutside = () => {
    setShowButtons(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <Link to={`/catalogue/${quizId}`}>
      <div>
        <div
          className={`w-[190px] h-[300px] border-2 border-black flex flex-col items-center   ${
            showButtons ? "rounded-t-[10px]" : "rounded-[10px]"
          }  ${editable ? "" : "rounded-[10px] hover:scale-125 duration-100"}`}
          onClick={() => {
            editable ? setShowButtons(true) : "";
          }}
        >
          <span className="mt-[10px] text-[14px] font-bold">{title}</span>
          <span className="mt-[5px] text-[10px] font-normal">
            Questions: {questionsAmount}
          </span>
          <div className="w-[130px] h-[130px] mt-[15px] overflow-hidden">
            <DownloadImage imagePath={imageId} />
          </div>
          <span className="mt-[15px] font-normal px-[15px] leading-none text-center break-all">
            {description}
          </span>
        </div>
        <div
          ref={editable ? ref : null}
          className={`w-[190px] h-[52px] border-black flex  ${
            showButtons ? "block" : "hidden"
          }`}
        >
          <button className="bg-[#1A4D2E] flex-grow rounded-bl-[10px] border-[2px] border-black border-t-0 font-medium text-[16px]  ">
            Start
          </button>
          <button className="bg-black flex-grow rounded-br-[10px]  border-black border-2 border-l border-t-0 font-medium text-[16px] text-white">
            Edit
          </button>
        </div>
      </div>
    </Link>
  );
}

export default QuizCard;
