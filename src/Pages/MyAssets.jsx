import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../CustomHook/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintAsset from "../Components/PrintAsset";
import { Helmet } from "react-helmet-async";

const MyAssets = () => {
  const { user } = UseAuth();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [assetType, setAssetType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/requests")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter(
          (item) => item.requesterEmail === user.email
        );
        setData(filterData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAssetTypeChange = (e) => {
    setAssetType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredData = data
    .filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      assetType
        ? item.productType.toLowerCase() === assetType.toLowerCase()
        : true
    )
    .filter((item) =>
      statusFilter
        ? item.status.toLowerCase() === statusFilter.toLowerCase()
        : true
    );

  const handleRequestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assetflow-server-side.vercel.app/requests/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              const updatedMatched = matched.filter((item) => item._id !== id);
              setMatched(updatedMatched);
              Swal.fire({
                title: "Cancelled!",
                text: "Your request has been cancelled",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error",
              text: "Failed to cancel. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleReturn = (id, id2) => {
    fetch(`https://assetflow-server-side.vercel.app/requests/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          const updatedMatched = matched.filter((item) => item._id !== id);
          setMatched(updatedMatched);
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });

    fetch(`https://assetflow-server-side.vercel.app/assets/increment/${id2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Successfully Returned");
        } else {
          toast.error("Already Returned");
        }
      })
      .catch((error) => console.error("Error updating Asset:", error));
  };

  return (
    <div>
      <Helmet>
        <title>My Assets</title>
      </Helmet>
      <div className="w-full min-h-screen bg1">
        <div className="contain pt-1 pb-10 px-2 md:px-3 lg:px-0">
          <div className="mb-4 grid  grid-cols-1 md:grid-cols-3 w-full gap-3 border-2 p-1 rounded-lg border-purple">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border rounded-md outline-none"
            />
            <select
              onChange={handleAssetTypeChange}
              className="p-2 border rounded-md"
            >
              <option value="">All Asset Types</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
            <select
              onChange={handleStatusChange}
              className="p-2 border rounded-md"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <img src="/src/assets/NotFoundSVG.svg" alt="" className="w-full lg:w-[35%]" />
              <h1 className="text-center text-sm md:text-base pt-5 font-bold text-red-500">
                Currently your not affiliate with any company, Please contact
                with your HR manager
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {filteredData.map((item) => (
              <div className="w-full border p-3 rounded-lg shad" key={item._id}>
                <img
                  src={item.productImage}
                  alt=""
                  className="rounded-lg h-44 w-full object-cover"
                />
                <h1 className="text-base 2xl:text-lg font-semibold mt-2 text-gray-700">
                  Product Name:{" "}
                  <span className="text-black">{item.productName}</span>
                </h1>
                <h2 className="text-base 2xl:text-lg font-semibold text-gray-700">
                  Product Type:{" "}
                  <span className="text-black">{item.productType}</span>
                </h2>
                <h2 className="text-base 2xl:text-lg font-semibold text-gray-700">
                  Requested Date:{" "}
                  <span className="text-black">{item.requestedDate}</span>
                </h2>
                <h2 className="text-base 2xl:text-lg font-semibold text-gray-700">
                  Approval Date:{" "}
                  <span className="text-black">
                    {item.approvalDate || "Not Approved Yet"}
                  </span>
                </h2>
                <h2 className="text-base 2xl:text-lg font-semibold text-gray-700">
                  Request Status:{" "}
                  <span className="text-black">{item.status}</span>
                </h2>
                <div className="flex justify-center gap-5 mt-5 mb-2">
                  {item.status === "Pending" && (
                    <button
                      onClick={() => handleRequestDelete(item._id)}
                      className="w-full bg-red-500 text-md text-white py-1 rounded-md font-semibold"
                    >
                      Cancel
                    </button>
                  )}
                  {item.status === "Approved" &&
                    item.productType === "Returnable" && (
                      <button
                        onClick={() => handleReturn(item._id, item.productId)}
                        className="w-full bg-purple text-md text-white py-1 rounded-md font-semibold"
                      >
                        Return
                      </button>
                    )}
                  {item.status === "Approved" && (
                    <PDFDownloadLink
                      document={<PrintAsset asset={item} />}
                      fileName="asset_details.pdf"
                      className="w-full flex justify-center bg-cyan-500 text-md text-white py-1 rounded-md font-semibold"
                    >
                      {({ loading }) =>
                        loading ? "Loading document..." : "Print as PDF"
                      }
                    </PDFDownloadLink>
                  )}
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyAssets;
