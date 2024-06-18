import { useState, React, useEffect } from "react";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Radio } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import "../../utilities/hideScrollBar.scss";
import "../../utilities/inputForm.module.scss";

import CancelIcon from "@mui/icons-material/Cancel";
import AlertDialog from "../../components/AlertDialog/AlerDialog";

const GET_QUESTIONS_URL = "/question";
const CREATE_QUESTION_URL = "/question";
const UPDATE_QUESTION_URL = "/question";
const DELETE_QUESTION_URL = "/question";
const DELETE_QUIZ_URL = "/quiz";

function EditQuiz() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState();
  const [quizId, setQuizId] = useState(useParams().quizId);

  const [numberOfQuestions, setNumberOfQuestions] = useState();
  const [isQuestionNew, setIsQuestionNew] = useState();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionText, setQuestionText] = useState();
  const [selectedRadio, setSelectedRadio] = useState();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (isQuestionNew) {
      setAnswers([]);
      setQuestionText([]);
      setSelectedRadio(-1);
    } else {
      setQuestionText(questions?.[currentQuestion]?.text);
      setAnswers(questions?.[currentQuestion]?.answers?.value);
      setSelectedRadio(() => {
        return questions?.[currentQuestion]?.answers?.value?.findIndex(
          (element) => element.correct == true
        );
      });
    }
  }, [currentQuestion, isQuestionNew]);

  // useEffect(() => {
  //   setRightAnswer();
  // }, [selectedRadio]);

  const getButtonStatus = () => {
    return answers?.length >= 2 && questionText && selectedRadio >= 0;
  };

  const addQuestion = () => {
    setIsQuestionNew(true);
  };

  const deleteQuestion = async (e) => {
    e.preventDefault();
    const payload = { id: questions?.[currentQuestion]?.id };
    await axiosPrivate.delete(DELETE_QUESTION_URL, { data: payload });
    getQuestions();
  };

  const addNewAnswer = () => {
    const newAnswers = [...answers, { value: "", correct: false }];
    setAnswers(newAnswers);
  };

  const discardChanges = (e) => {
    e.preventDefault();
    setQuestionText("");
    setAnswers([]);
  };

  const deleteQuiz = async () => {
    await axiosPrivate
      .delete(DELETE_QUIZ_URL, { data: { id: quizId } })
      .then(() => navigate("/yourQuizes", { replace: true }));
    console.log("Deleted");
  };

  const deleteAnswer = (itemIndex) => {
    const newAnswers = answers.filter((i) => {
      return i != answers[itemIndex];
    });
    setAnswers(newAnswers);
  };

  const renderQuestionsBookmarks = () => {
    return (
      <div className="mt-3 h-[460px] overflow-x-hidden no-scrollbar  relative left-[2px]">
        {questions?.map((item, i) => {
          if (i == currentQuestion && !isQuestionNew) {
            return (
              <div
                className="border-[#D9D9D9] bg-gray-100 w-8   h-12 rounded-l-md border-2 border-r-gray-100 flex justify-center items-center "
                key={i}
              >
                {i + 1}
              </div>
            );
          } else {
            return (
              <div
                className=" bg-black text-white w-[30px]  h-[46px] rounded-l-md border-2 border-white border-r-0 flex justify-center items-center cursor-pointer hover:bg-gray-800 duration-300"
                key={i}
                onClick={() => {
                  setIsQuestionNew(false);
                  setCurrentQuestion(i);
                }}
              >
                {i + 1}
              </div>
            );
          }
        })}
        <div
          className={
            (isQuestionNew
              ? "bg-gray-100 text-black"
              : " bg-black text-white cursor-pointer hover:bg-gray-800 duration-300 border-2 border-white border-r-0") +
            " rounded-l-md   w-[30px]  h-[46px] flex justify-center items-center "
          }
          onClick={addQuestion}
        >
          +
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    return (
      <>
        <div
          className={
            answers?.length > 0
              ? "mt-10 no-scrollbar flex flex-col justify-center "
              : "mt-10 mr-[42px] no-scrollbar flex flex-col justify-center"
          }
        >
          <textarea
            className="inputForm resize-none bg-gray-200 focus:bg-white ml-[24px]"
            name="answer"
            id="answer-text"
            cols="20"
            rows="2"
            placeholder="Question"
            required
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <div className="mx-auto flex flex-col">
            {answers?.map((item, i) => {
              return (
                <div
                  className=" flex mt-[24px] justify-center items-center"
                  key={i}
                >
                  <CancelIcon
                    onClick={() => deleteAnswer(i)}
                    sx={{
                      color: "black ",
                      transitionDuration: "4s",
                      "&:hover": {
                        color: "rgb(55 65 81)",
                      },
                    }}
                  />
                  <input
                    className=" text-[#3E3E3E] font-semibold text-[20px] inputForm "
                    placeholder={`Answer # ${i + 1}`}
                    key={i}
                    value={answers?.[i]?.value}
                    required
                    onChange={(e) => {
                      handleAnswersForms(i, e.target.value);
                    }}
                  />
                  <Radio
                    checked={selectedRadio == i}
                    onChange={handleRadioButtons}
                    value={i}
                    required
                    name="radio-buttons"
                    inputProps={{ "aria-label": 0 }}
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "black",
                      },
                    }}
                  />
                </div>
              );
            })}
          </div>

          {answers?.length < 4 && (
            <div
              onClick={addNewAnswer}
              className="w-[415px] mt-[24px] ml-[24px] rounded-[4px] text-[15px] font-semibold  bg-black text-white px-[11px] py-[10px] text-center cursor-pointer hover:bg-gray-800 duration-300"
            >
              Add new answer
            </div>
          )}
        </div>
      </>
    );
  };

  const createQuestion = async (e) => {
    e.preventDefault();
    const newAnswers = setRightAnswer();
    const payload = {
      quizId,
      text: questionText,
      answers: newAnswers,
      answerType: "single",
      ord: currentQuestion,
    };

    const response = await axiosPrivate.post(CREATE_QUESTION_URL, payload);

    await getQuestions();
    setAnswers([]);
    setQuestionText("");
    setSelectedRadio(-1);
  };

  const updateQuestion = async (e) => {
    e.preventDefault();
    const newAnswers = setRightAnswer();
    const payload = {
      quizId,
      id: questions?.[currentQuestion]?.id,
      text: questionText,
      answers: newAnswers,
      answerType: "single",
      ord: currentQuestion,
    };

    await axiosPrivate.patch(UPDATE_QUESTION_URL, payload);

    getQuestions();
  };

  const setRightAnswer = () => {
    ("Radio button changed \n");
    const newAnswers = answers.map((item, i) => {
      "Cycle N" + i;
      if (i == selectedRadio) {
        "true" + i;
        return { value: item.value, correct: true };
      } else {
        ("Else");
        "selectedRadio \n" + selectedRadio;
        "i \n" + i;
        return { value: item.value, correct: false };
      }
    });
    setAnswers(newAnswers);
    return newAnswers;
  };

  const getQuestions = async () => {
    await axiosPrivate(GET_QUESTIONS_URL, { params: { quizId } }).then(
      (res) => {
        if (!res?.values) {
          setIsQuestionNew(true);
        }
        setQuestions(res.data.values);
        setNumberOfQuestions(res?.data?.values?.length);
      }
    );
  };

  const handleRadioButtons = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleAnswersForms = (i, newValue) => {
    const newAnswers = answers.map((item, index) => {
      ("answer map");
      if (i === index) {
        return { value: newValue, correct: false };
      } else {
        ("else");
        return item;
      }
    });
    setAnswers(newAnswers);
  };

  return (
    <div className="">
      <Header />
      <div className="mt-10 mx-auto">
        <h1 className="text-[46px] text-center font-bold">Editing quiz:</h1>
        <div className="flex justify-center mt-10">
          {/* <div className="">{renderQuestions()}</div> */}
          {renderQuestionsBookmarks()}
          <form
            action=""
            // onSubmit={isQuestionNew ? createQuestion : updateQuestion}
          >
            <div className="w-[645px] h-[478px] rounded-[7px] border-2 bg-gray-100 border-[#D9D9D9] flex items-center flex-col ">
              {renderQuestion()}

              <div className=" flex mt-[24px] w-[430px] justify-between pr-[20px]">
                <button
                  type="cancel"
                  onClick={isQuestionNew ? discardChanges : deleteQuestion}
                  className="bg-[#5C5C5C] text-white px-11 py-3 rounded-[4px] cursor-pointer hover:bg-gray-800 duration-300 disabled:bg-gray-400 disabled:cursor-default"
                  disabled={isQuestionNew ? false : !getButtonStatus()}
                >
                  {isQuestionNew ? "Discard changes" : "Delete question"}
                </button>
                <button
                  onClick={isQuestionNew ? createQuestion : updateQuestion}
                  type="submit"
                  className="bg-[#5C5C5C] text-white px-11 py-3 rounded-[4px] cursor-pointer hover:bg-gray-800 duration-300 disabled:bg-gray-400 disabled:cursor-default"
                  disabled={!getButtonStatus()}
                >
                  {isQuestionNew ? "Add question" : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-5">
          <AlertDialog
            buttonText={"Delete quiz"}
            resolvePositiveAnswer={deleteQuiz}
          />
        </div>
      </div>
    </div>
  );
}

export default EditQuiz;
