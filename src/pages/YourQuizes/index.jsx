import { useState, useEffect, React } from "react";
import Header from "../../components/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const GET_QUIZES_BY_USER_ID_URL = "quiz";

function YourQuizes() {
  useEffect(() => {
    getUserQuizes();
  }, []);

  const [quizes, setQuizes] = useState();

  const axiosPrivate = useAxiosPrivate();

  const getUserQuizes = async () => {
    const response = await axiosPrivate.get(GET_QUIZES_BY_USER_ID_URL, {
      params: { offset: 0, limit: 999 },
    });
    setQuizes(response.data);
  };

  const renderQuizes = () => {
    return (
      <div className="flex flex-col gap-y-5">
        {quizes?.values?.map((item, i) => {
          return (
            <div
              className="flex justify-between  bg-gray-100 rounded-md border-2 border-black overflow-hidden"
              key={i}
            >
              <div className="py-2 ml-4 flex self-center">{item.title}</div>

              <Link to={"/editQuiz/" + item.id}>
                <div className=" pl-2 pr-2 bg-[#3E3E3E] text-blue-50 h-full flex items-center">
                  Edit
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <h1 className="text-[46px] text-center font-bold">Your Quizes:</h1>
      <div
        className="flex flex-col
      mt-7 mx-auto w-[400px] gap-y-5"
      >
        {renderQuizes()}
      </div>
    </div>
  );
}

export default YourQuizes;
