import React, { useEffect, useState } from "react";
import UseAuth from "../CustomHook/UseAuth";

const EmployeeHomePage = () => {
  const { user } = UseAuth();
  const [data, setData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const userData = data.find((item) => item.email === user.email);
        setUserData(userData);
        setLoading(false)
      });
    fetch("https://assetflow-server-side.vercel.app/requests")
      .then((res) => res.json())
      .then((data) => {
        const userRequests = data.filter(
          (item) => item.requesterEmail === user.email
        );
        setData(userRequests);

        // Filter pending requests
        const pending = userRequests.filter(
          (item) => item.status === "Pending"
        );
        setPendingRequests(pending);

        // Get current month and year
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // Months are 0-based, so add 1
        const currentYear = today.getFullYear();

        // Filter monthly requests
        const monthly = userRequests.filter((item) => {
          const [day, month, year] = item.requestedDate.split("/").map(Number);
          return month === currentMonth && year === currentYear;
        });

        // Sort by most recent first
        monthly.sort((a, b) => {
          const [dayA, monthA, yearA] = a.requestedDate.split("/").map(Number);
          const [dayB, monthB, yearB] = b.requestedDate.split("/").map(Number);
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);
          return dateB - dateA;
        });

        setMonthlyRequests(monthly);
      })
      .catch(() => setMessage("Contact with your HR"));
  }, [user.email]);

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weeks = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<td key={j}></td>);
        } else if (day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          const isToday = day === today.getDate();
          week.push(
            <td
              key={j}
              className={`border p-2 ${isToday ? "bg-blue-200" : ""}`}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      weeks.push(<tr key={i}>{week}</tr>);
      if (day > daysInMonth) break;
    }

    return (
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <th key={index} className="border p-2">
                  {day}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    );
  };
  console.log(userData);
  return (
    <div className="w-full bg1">
      {
        loading ? 
              <div className="h-[70vh] w-full flex justify-center items-center">
                <span className="loader"></span>
              </div>
                :
        <div className="w-full bg1 min-h-screen">
      {userData?.affiliateWith === "" ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <img src="NotFoundSVG.svg" alt="" className="w-full lg:w-[30%]"/>
          <h1 className="text-center text-sm md:text-base pt-5 font-bold text-red-500">
            Currently your not affiliate with any company, Please contact with
            your HR manager
          </h1>
        </div>
      ) : (
        <div className="contain px-2 md:px-3 lg:scroll-px-40">
          <section className="mb-10">
            <h2 className="text-[2rem] text-center pt-5 font-semibold mb-3">
              My Pending Requests
            </h2>
            {pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
                {pendingRequests.map((item) => (
                  <div
                    className="w-full border p-3 rounded-lg shadow"
                    key={item._id}
                  >
                    <img
                      src={item.productImage}
                      alt=""
                      className="rounded-lg h-44 w-full object-cover"
                    />
                    <h1 className="text-base font-semibold mt-2 text-gray-700">
                      Product Name:{" "}
                      <span className="text-black">{item.productName}</span>
                    </h1>
                    <h2 className="text-base font-semibold text-gray-700">
                      Product Type:{" "}
                      <span className="text-black">{item.productType}</span>
                    </h2>
                    <h1 className="text-base font-semibold text-gray-700">
                      Requester Name:{" "}
                      <span className="text-black">{item.requesterName}</span>
                    </h1>
                    <h2 className="text-base font-semibold text-gray-700">
                      Request Date:{" "}
                      <span className="text-black">{item.requestedDate}</span>
                    </h2>
                  </div>
                ))}
              </div>
            ) : (
              <p>No pending requests</p>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-[2rem] text-center mt-10 lg:mt-20 font-semibold mb-3">
              My Monthly Requests
            </h2>
            {monthlyRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
                {monthlyRequests.map((item) => (
                  <div
                    className="w-full border p-3 rounded-lg shadow"
                    key={item._id}
                  >
                    <img
                      src={item.productImage}
                      alt=""
                      className="rounded-lg h-44 w-full object-cover"
                    />
                    <h1 className="text-base font-semibold mt-2 text-gray-700">
                      Product Name:{" "}
                      <span className="text-black">{item.productName}</span>
                    </h1>
                    <h2 className="text-base font-semibold text-gray-700">
                      Product Type:{" "}
                      <span className="text-black">{item.productType}</span>
                    </h2>
                    <h1 className="text-base font-semibold text-gray-700">
                      Requester Name:{" "}
                      <span className="text-black">{item.requesterName}</span>
                    </h1>
                    <h2 className="text-base font-semibold text-gray-700">
                      Request Date:{" "}
                      <span className="text-black">{item.requestedDate}</span>
                    </h2>
                  </div>
                ))}
              </div>
            ) : (
              <p>No requests made this month</p>
            )}
          </section>

          <section className="pb-10">
            <h2 className="text-[2rem] text-center mt-10 lg:mt-20 font-semibold mb-3">
              Calendar
            </h2>
            {renderCalendar()}
          </section>
        </div>
      )}
    </div>
      }
    </div>
  );
};

export default EmployeeHomePage;
