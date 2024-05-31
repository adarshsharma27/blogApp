import React from "react";
import { useTranslation } from "react-i18next";

const DashBoardTable = ({ users }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="overflow-x-auto overflow-y-scroll h-[80vh] container my-6 mx-auto rounded-lg border border-gray-200  dark:bg-slate-700 card-shadow-custom">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-medium dark:bg-slate-700">
          <thead className="text-center bg-gray-100 dark:bg-slate-200 ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-bold text-gray-900">
                {t("DashBoardTitle.Id")}
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-lg font-bold text-gray-900">
                {t("commonTitle.Name")}
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-bold text-gray-900">
                {t("commonTitle.Email")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users?.map((elements) => (
              <tr
                className="even:bg-gray-50 dark:even:bg-gray-400 dark:bg-slate-600 text-center"
                key={elements.$id}
              >
                <td className="whitespace-nowrap px-4 py-2 text-base font-semibold  text-gray-600 dark:text-white">
                  {elements.$id}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-semibold text-gray-600 dark:text-white text-transform: capitalize">
                  {elements.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-semibold text-gray-600 dark:text-white">
                  {elements.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardTable;
