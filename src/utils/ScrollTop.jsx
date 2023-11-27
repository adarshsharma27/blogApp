import React, { useEffect, useState } from "react";
import { LuChevronsUp } from "react-icons/lu";
const ScrollTop = () => {
  const [visibleScrollTop, setVisibleScrollTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setVisibleScrollTop(true);
      } else {
        setVisibleScrollTop(false);
      }
    });
  }, []);
  const scrollTopBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {visibleScrollTop && (
        <div className="fixed bottom-10 right-12" onClick={scrollTopBtn}>
          <LuChevronsUp className="w-12 h-12 p-2 hover:bg-indigo-600 hover:text-white text-white rounded-full bg-gray-900 font-bold hover:cursor-pointer dark:text-white" />
        </div>
      )}
    </>
  );
};

export default ScrollTop;
