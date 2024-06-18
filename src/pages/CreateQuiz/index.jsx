import React, { useState } from "react";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./CreateQuiz.scss";

import { Link } from "react-router-dom";
import UploadImage from "../../components/UploadImage/UploadImage";

function CreateQuiz() {
  const CREATE_QUIZ_URL = "/quiz";

  const axiosPrivate = useAxiosPrivate();

  const [quizTitle, setQuizTitle] = useState();
  const [quizDescription, setQuizDescription] = useState();
  const [imageId, setImageId] = useState();
  const [createdQuizId, setCreatedQuizId] = useState(null);
  const [quizCreated, setQuizCreated] = useState(false);

  const handleImage = (id) => {
    setImageId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: quizTitle,
        description: quizDescription,
        imageId: imageId,
      };
      const response = await axiosPrivate.post(CREATE_QUIZ_URL, payload);
      response.data.id;
      setCreatedQuizId(response.data.id);
      setQuizCreated(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Header />
      {quizCreated ? (
        <div className="flex flex-col items-center mt-[100px] gap-y-10">
          <p className="text-[46px] font-bold">Quiz successfully created</p>
          <div className="flex mt-[300px] gap-x-8">
            <Link to="/">
              <button className="bg-black text-white py-[12px] px-[92px] rounded-[4px]">
                Go to main page
              </button>
            </Link>
            <Link to={"/editQuiz/" + createdQuizId}>
              <button className="bg-black text-white py-[12px] px-[92px] rounded-[4px]">
                Create some questions
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-[80px] flex flex-col items-center">
          <h1 className="text-[46px] font-bold text-center">
            Create your quiz
          </h1>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <label
              htmlFor="quizTitile"
              className="text-[24px] font-medium mt-10"
            >
              Give name to your quiz
            </label>
            <input
              className="inputForm mt-[15px]"
              type="text"
              id="quizTitle"
              maxLength={19}
              autoComplete="off"
              onChange={(e) => setQuizTitle(e.target.value)}
              value={quizTitle}
              required
            />
            <label
              htmlFor="quizDescription"
              className="text-[24px] font-medium mt-[60px]"
            >
              Briefly describe your quiz
            </label>
            <input
              className="inputForm mt-[30px]"
              maxLength={52}
              type="text"
              id="quizDescription"
              autoComplete="off"
              onChange={(e) => setQuizDescription(e.target.value)}
              value={quizDescription}
              required
            />
            <div className="mt-10">
              <UploadImage handleUpload={handleImage} />
            </div>
            <button className="signUpButton mt-[60px]"> Create</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
