import { useState, useEffect, React } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Header from "../../components/Header";

const GET_QUESTIONS_URL = "/question";
const VALIDATE_ANSWERS_URL = "/quiz/validateAnswers";

function Quiz() {
  const { quizId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [questions, setQuestions] = useState();
  const [numberOfQuestions, setNumberOfQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState();
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [results, setResults] = useState();

  const fetchQuestions = async () => {
    const response = await axiosPrivate.get(GET_QUESTIONS_URL, {
      params: { quizId: quizId },
    });

    setQuestions(response.data.values);
    setNumberOfQuestions(response.data.values.length);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const submitQuestion = (e) => {
    if (!isQuizComplete) {
      e.preventDefault();
      setAnswers([
        ...answers,
        { questionId: questions[currentQuestion - 1].id, value: currentAnswer },
      ]);
    }
  };

  const changeCurrentAnswer = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const completeQuiz = async () => {
    setIsQuizComplete(true);
    const newCurrentQuestion = currentQuestion + 1;
    setCurrentQuestion((prev) => prev + 1);

    const newAnswers = [
      ...answers,
      { questionId: questions[currentQuestion].id, value: currentAnswer },
    ];
    setAnswers(newAnswers);
    const payload = {
      quizId,
      answers: newAnswers,
    };

    const response = await axiosPrivate.post(VALIDATE_ANSWERS_URL, payload);
    setResults(response.data);
  };

  const renderRadioTypeAnswer = () => {
    return (
      <form
        id="answer"
        onSubmit={submitQuestion}
        className={currentQuestion >= 0 ? "block" : "hidden"}
      >
        {questions?.[currentQuestion]?.answers?.value.map((answer, i) => {
          return (
            <>
              <div className="flex flex-row gap-y-[13px]">
                <input
                  id={"question" + i}
                  className="accent-[#8A8A8A]"
                  type="radio"
                  name="answers"
                  value={questions ? answer.value : "asdsa"}
                  onChange={(e) => changeCurrentAnswer(e)}
                  checked={currentAnswer == answer?.value ? true : false}
                />
                <label
                  className="text-[#3E3E3E] font-medium ml-3 break-all"
                  htmlFor={"question" + i}
                >
                  {questions ? answer?.value : "asdsa"}
                </label>
              </div>
            </>
          );
        })}
      </form>
    );
  };

  return (
    <>
      <Header />
      {/* <Link to="/catalogue">
            <button className="mt-[140px] cursor-pointer rounded-md text-white bg-black  font-extrabold text-[40px] px-[122px] py-[22px]">
              Back to the catalogue
            </button>
          </Link> */}

      <div className="flex justify-between items-center flex-col">
        <div
          className="mt-[242px]
         lg:w-[645px] min-h-[278px] rounded-[7px] border-2 border-[#D9D9D9] flex items-center justify-between flex-col px-5 pb-2 mx-3"
        >
          {isQuizComplete ? (
            <div className="mt-6 text-lg text-[#3E3E3E]">
              You scored {results?.score} of {results?.maxScore}
            </div>
          ) : (
            <>
              <div className=" text-[#3E3E3E] mt-5 font-semibold text-[20px] break-all ">
                {currentQuestion >= 0
                  ? questions?.[currentQuestion]?.text
                  : "Loading"}
              </div>
              <div className="mt-[30px]">{renderRadioTypeAnswer()}</div>
              <div className="mt-[100px] text-[#3E3E3E] font-semibold text-[12px]">
                {currentQuestion + 1} of {numberOfQuestions}
              </div>
            </>
          )}
        </div>
        <div className="mt-[30px] gap-x-3 flex">
          {/* <button className="text-[#8A8A8A] border-[3px] border-[#C6C6C6] py-3 px-[30px] rounded-[5px]">
            Previous
          </button> */}
          {isQuizComplete ? (
            <Link to="/catalogue">
              <button
                className="bg-[#5C5C5C] text-white px-11 py-3 rounded-[4px]"
                type="submit"
                form="answer"
              >
                Return to catalogue
              </button>
            </Link>
          ) : !(currentQuestion == numberOfQuestions - 1) ? (
            <button
              className="bg-[#5C5C5C] text-white px-11 py-3 rounded-[4px]"
              type="submit"
              form="answer"
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-[#5C5C5C] text-white px-11 py-3 rounded-[4px]"
              type="submit"
              form="answer"
              onClick={completeQuiz}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
