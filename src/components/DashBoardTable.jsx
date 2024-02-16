import React from "react";

const DashBoardTable = () => {
  return (
    <>
      <div className="flex flex-wrap sm:flex-row flex-col pt-6">
        <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
          Users Details
        </h1>
      </div>
      <div className="overflow-x-auto overflow-y-scroll h-[500px] container my-6 mx-auto rounded-lg border border-gray-200  dark:bg-slate-700">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-medium dark:bg-slate-700">
          <thead className="text-center bg-gray-100 dark:bg-slate-200 ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900">
                Id
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-lg font-semibold text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900">
                Email
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="text-center">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                Web Developer
              </td>
            </tr>

            <tr className="even:bg-gray-50 dark:bg-slate-600 text-center">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Jane Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                04/11/1980
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                Web Designer
              </td>
            </tr>

            <tr className="text-center">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Gary Barlow
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                24/05/1995
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                Singer
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardTable;
