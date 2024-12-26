import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import UseAuth from "../CustomHook/UseAuth";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHomePage = () => {
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const [data, setData] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [limitedStockItems, setLimitedStockItems] = useState([]);
  const [returnableCount, setReturnableCount] = useState(0);
  const [nonReturnableCount, setNonReturnableCount] = useState(0);

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/requests")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.postedBy === user.email && item.status === "Pending"
        );
        setData(filteredData);
        calculateTopItems(filteredData);
        calculateItemTypeCounts(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("https://assetflow-server-side.vercel.app/assets")
      .then((res) => res.json())
      .then((assets) => {
        const limitedStock = assets.filter(
          (item) => item.productQuantity < 10 && item.postedBy === user.email
        );
        setLimitedStockItems(limitedStock);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }, [user.email]);

  const calculateTopItems = (filteredData) => {
    const productCount = {};

    filteredData.forEach((item) => {
      const productName = item.productName;
      if (productCount[productName]) {
        productCount[productName].count += 1;
      } else {
        productCount[productName] = {
          count: 1,
          image: item.productImage,
        };
      }
    });

    const productCountArray = Object.entries(productCount);

    productCountArray.sort((a, b) => b[1].count - a[1].count);

    const topRequestedItems = productCountArray
      .slice(0, 4)
      .map(([name, info]) => ({
        name,
        image: info.image,
      }));

    setTopItems(topRequestedItems);
  };

  const calculateItemTypeCounts = (filteredData) => {
    let returnable = 0;
    let nonReturnable = 0;

    filteredData.forEach((item) => {
      if (item.productType === "Returnable") {
        returnable += 1;
      } else if (item.productType === "Non-Returnable") {
        nonReturnable += 1;
      }
    });

    setReturnableCount(returnable);
    setNonReturnableCount(nonReturnable);
  };

  const pieChartData = {
    labels: ["Returnable", "Non-Returnable"],
    datasets: [
      {
        label: "Item Types",
        data: [returnableCount, nonReturnableCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const recentRequests = data.slice(0, 5);

  const statisticsSummary = {
    totalRequests: data.length,
    returnableRequests: returnableCount,
    nonReturnableRequests: nonReturnableCount,
    limitedStockItems: limitedStockItems.length,
  };
  console.log(data);
  return (
    <div className="bg1 min-h-screen w-full">
      {loading ? (
        <div className="h-[70vh] w-full flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div>
          {data.length === 0 ? (
            <div className="contain">
              <h1 className="text-base text-center font-bold pt-10">
                You have not any pending request from emloyees.
              </h1>
            </div>
          ) : (
            <div className="contain px-2 md:px-3 lg:px-0">
              <div>
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Pending Requests
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-7 mt-5">
                  {data.slice(0, 5).map((item) => (
                    <div
                      className="w-full border p-3 rounded-lg shad"
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
              </div>
              <div className="mt-10 lg:mt-20">
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Top Requested Items
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-7 mt-5">
                  {topItems.map((item, index) => (
                    <div
                      className="w-full border p-3 rounded-lg shad"
                      key={index}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="rounded-lg h-44 w-full object-cover"
                      />
                      <h1 className="text-base font-semibold mt-2 text-gray-700">
                        {item.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 lg:mt-20">
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Limited Stock Items
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-7 mt-5">
                  {limitedStockItems.map((item) => (
                    <div
                      className="w-full border p-3 rounded-lg shad"
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
                        Quantity:{" "}
                        <span className="text-black">
                          {item.productQuantity}
                        </span>
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 lg:mt-20">
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Returnable vs Non-Returnable Items
                </h1>
                <div className="flex justify-center mt-5">
                  <div className="w-1/2">
                    <Pie data={pieChartData} />
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-20">
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Most Recent Requests
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-7 mt-5">
                  {recentRequests.map((item) => (
                    <div
                      className="w-full border p-3 rounded-lg shad"
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
              </div>
              <div className="mt-10 lg:mt-20 pb-20">
                <h1 className="text-[2rem] font-bold poppins text-center pt-5">
                  Statistics Summary
                </h1>
                <div className="flex justify-center mt-5">
                  <div className="max-w-[500px] p-5 border rounded-lg shad">
                    <h2 className="text-base font-semibold text-gray-700">
                      Total Requests:{" "}
                      <span className="text-black">
                        {statisticsSummary.totalRequests}
                      </span>
                    </h2>
                    <h2 className="text-base font-semibold text-gray-700">
                      Returnable Requests:{" "}
                      <span className="text-black">
                        {statisticsSummary.returnableRequests}
                      </span>
                    </h2>
                    <h2 className="text-base font-semibold text-gray-700">
                      Non-Returnable Requests:{" "}
                      <span className="text-black">
                        {statisticsSummary.nonReturnableRequests}
                      </span>
                    </h2>
                    <h2 className="text-base font-semibold text-gray-700">
                      Limited Stock Items:{" "}
                      <span className="text-black">
                        {statisticsSummary.limitedStockItems}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
