import { Skeleton } from "@mui/material";
import React from "react";

function QuizCardSkeleton() {
  return (
    <div className="w-[190px] h-[300px] bg-gray-200 rounded-[10px] flex flex-col ">
      <div className="mt-[10px] px-5">
        <Skeleton variant="text" sx={{ fontSize: "14px" }} />
      </div>
      <div className="px-8 mt-2">
        <Skeleton variant="text" sx={{ fontSize: "10px" }} />
      </div>
      <div className="flex justify-center">
        <div className="w-[130px] h-[130px] mt-[15px]">
          <Skeleton variant="rectangular" width={130} height={130} />
        </div>
      </div>
      <div className="mt-[15px] px-5">
        <Skeleton variant="text" sx={{ fontSize: "15px" }} />
        <Skeleton variant="text" sx={{ fontSize: "15px" }} />
        <Skeleton variant="text" sx={{ fontSize: "15px" }} />
      </div>
      <span className="mt-[15px] font-normal px-[15px] leading-none text-center"></span>
    </div>
  );
}

export default QuizCardSkeleton;
