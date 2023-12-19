import React, { useEffect, useState } from "react";
import useGetComplain from "@/apiHooks/complain/useGetComplain";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { Typography } from "@material-tailwind/react";
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import EmployeeSelect from "@/widgets/employee/EmployeeSelect";
import useAssignComplain from "@/apiHooks/complain/useAssignComplain";
import ComplainStatus from "@/widgets/complain/ComplainStatus";
import SelectStatus from "@/widgets/htmlComponents/StatusSelect";
import WorkerSelect from "@/widgets/worker/WorkerSelect";
import useGetWorker from "@/apiHooks/worker/useGetWorker";
import useGetEmployees from "@/apiHooks/employee/useGetEmployees";
import useUpdateStatus from "@/apiHooks/status/useUpdateStatus";
import StatusSelect from "@/widgets/complain/StatusSelect";
import useStatus from "@/apiHooks/status/useStatus";
import UserData from "./user-data-popup";
import { Spinner } from "@material-tailwind/react";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import Description from "../htmlComponents/Description";
const ComplainTable = ({
  loading,
  fetchComplains,
  pending,
  headings,
  complains,
  show,
  setshow,
  employee,
  statuses,
  setstatus,
  admin,
  official,
  selectedEmployee,
  setselectedEmployee,
  assignComplain,
  data,
  setworker,
  handleUpdate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // You can adjust the number of items per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = complains.slice(indexOfFirstItem, indexOfLastItem);

  const paginateComplains = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    paginateComplains(1); // Set initial page to 1 when complains change
  }, [complains]);

  console.log(complains);
  return (
    <>
      {loading && <div>Loading...</div>}
      <div>
        <div className="flex flex-col">
          {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="overflow-hidden"> */}
          <div className="overflow-x-auto ">
            <div>
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                {currentItems?.length < 0 && !loading && (
                  <div className="flex h-screen items-center justify-center text-3xl text-gray-700">
                    No Complains Found
                  </div>
                )}
                {/* {loading && complains.length > 0 && <span>Loading...</span>} */}
                {!loading && currentItems?.length > 0 && (
                  <table className="min-w-full text-left text-sm font-light ease-in">
                    <thead className="dark:border-neutral-500 border-b font-medium">
                      <tr>
                        {headings?.map((e, index) => (
                          <th className="" key={index}>
                            {e}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {currentItems?.map((item) => (
                        <tr
                          key={item?._id}
                          className="dark:border-neutral-500 border-b"
                        >
                          <td className=" whitespace-nowrap  px-3 py-2 font-medium">
                            {item.category.name}
                          </td>
                          <td className=" whitespace-nowrap  px-3 py-2">
                            {item.subcategory.name}
                          </td>
                          <td className=" whitespace-nowrap  px-3 py-2 font-medium">
                            <UserData
                              userName={item?.name}
                              id={item?._id}
                              userId={item?.userId}
                            />
                          </td>

                          {/* <td className="whitespace-nowrap px-3 py-2">
                            <span className="bred w-52">
                              short {item.description?.substring(0, 40)}
                            </span>

                            {show.id === item._id && show.display && (
                              <span>
                                long {item.description?.substring(40)}
                              </span>
                            )}

                            {item.description.length > 40 && (
                              <span
                                onClick={() =>
                                  setshow((prev) => ({
                                    ...prev,
                                    display:
                                      show.id === item._id
                                        ? !show.display
                                        : true,
                                    id: item._id,
                                  }))
                                }
                                className="text-sm text-blue-800"
                              >
                                {show.id === item._id && show.display
                                  ? "See Less"
                                  : "...See More"}
                              </span>
                            )}
                          </td> */}
                          <td>
                            <Description description={item?.description} />
                          </td>
                          {admin && (
                            <td className=" whitespace-nowrap px-3 py-2">
                              <Popover
                                placement="bottom"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <PopoverHandler>
                                  <Button
                                    variant="text"
                                    disabled={!item.official?.name}
                                  >
                                    {item.official?.name ? (
                                      <div>{item.official.name}</div>
                                    ) : (
                                      <div className="text-gray-800">
                                        Not Assigned
                                      </div>
                                    )}
                                  </Button>
                                </PopoverHandler>
                                <PopoverContent>
                                  {/* {item.statusChangeTime} */}
                                  {item.statusChangeTime && (
                                    <span>
                                      {formatDistanceToNow(
                                        new Date(item.statusChangeTime),
                                        { addSuffix: true }
                                      )}
                                    </span>
                                  )}
                                </PopoverContent>
                              </Popover>
                            </td>
                          )}

                          <td className=" whitespace-nowrap px-3 py-2">
                            {formatDistanceToNowStrict(new Date(item.date), {
                              addSuffix: true,
                            })}
                          </td>
                          <td className=" whitespace-nowrap px-3 py-2">
                            {!admin && (
                              <ComplainStatus name={item?.status?.name} />
                            )}
                            {admin && statuses?.length > 0 && (
                              <StatusSelect
                                fetchComplains={fetchComplains}
                                disable={official}
                                data={statuses}
                                setvalue={setstatus}
                                id={item?.status?._id}
                                complainId={item?._id}
                              />
                            )}
                          </td>
                          <td className=" whitespace-nowrap px-3 py-2">
                            {admin && (
                              <WorkerSelect
                                disable={official}
                                setvalue={setworker}
                                data={data}
                                id={item?.worker?._id}
                                complainId={item?._id}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {/* Pagination */}
                {!loading && complains?.length > itemsPerPage && (
                  <div className="mt-4 flex justify-center">
                    <ul className="flex space-x-2">
                      {Array.from({
                        length: Math.ceil(complains.length / itemsPerPage),
                      }).map((_, index) => (
                        <li key={index}>
                          <button
                            className={`px-2 py-1 ${
                              currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                            }`}
                            onClick={() => paginateComplains(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainTable;
