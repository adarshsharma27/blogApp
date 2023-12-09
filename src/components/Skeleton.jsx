import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="p-4 sm:mb-0 mb-6 shadow-xl animate-pulse">
        <div className="bg-slate-600 h-60 w-full"></div>
        <div class="flex flex-col gap-y-10 pt-10">
          <div class="h-3 bg-slate-600"></div>
          <div class="h-3 bg-slate-600"></div>
          <div class="h-3 bg-slate-600"></div>
          <div class="h-3 bg-slate-600"></div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
