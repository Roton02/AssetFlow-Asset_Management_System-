import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../CustomHook/UseAuth";
import { Helmet } from "react-helmet-async";

const AssetList = () => {
  const { user } = UseAuth();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [assetType, setAssetType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [matched, setMatched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/assets")
      .then((res) => res.json())
      .then((data) => {
        setData(data.filter((item) => item.postedBy === user.email));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStockStatusChange = (e) => {
    setStockStatus(e.target.value);
  };

  const handleAssetTypeChange = (e) => {
    setAssetType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((item) =>
      item?.productName?.toLowerCase()?.includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      stockStatus
        ? item?.availibility?.toLowerCase() === stockStatus?.toLowerCase()
        : true
    )
    .filter((item) =>
      assetType
        ? item?.productType?.toLowerCase() === assetType?.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.productQuantity - b.productQuantity;
      } else if (sortOrder === "desc") {
        return b.productQuantity - a.productQuantity;
      } else {
        return 0;
      }
    });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assetflow-server-side.vercel.app/assets/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              // Remove the deleted item from matched state
              const updatedMatched = matched.filter((item) => item._id !== id);
              setMatched(updatedMatched);
              // Show success message
              Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            // Show error message
            Swal.fire({
              title: "Error",
              text: "Failed to delete item. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg1">
      <Helmet>
        <title>Assetlist</title>
      </Helmet>
      <div className="contain pt-1 pb-10 px-2 md:px-3 lg:px-0">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-3 border-2 p-1 rounded-lg border-purple">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md outline-none"
          />
          <select
            onChange={handleStockStatusChange}
            className="p-2 border rounded-md"
          >
            <option value="">All Stock Status</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            onChange={handleAssetTypeChange}
            className="p-2 border rounded-md"
          >
            <option value="">All Asset Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-Returnable</option>
          </select>
          <select onChange={handleSortChange} className="p-2 border rounded-md">
            <option value="">Sort by Quantity</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {loading ? (
          <div className="h-[65vh] w-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {filteredData.map((item) => (
              <div className="w-full border p-3 rounded-lg shad" key={item._id}>
                <img
                  src={item.productImage}
                  alt=""
                  className="rounded-lg h-44 w-full object-cover"
                />
                <h1 className="text-base  font-semibold mt-2 text-gray-700">
                  Product Name:{" "}
                  <span className="text-black">{item.productName}</span>
                </h1>
                <h2 className="text-base font-semibold text-gray-700">
                  Product Type:{" "}
                  <span className="text-black">{item.productType}</span>
                </h2>
                <h2 className="text-base font-semibold text-gray-700">
                  Product Quantity:{" "}
                  <span className="text-black">{item.productQuantity}</span>
                </h2>
                <h2 className="text-base font-semibold text-gray-700">
                  Availability:{" "}
                  <span className="text-black">{item.availibility}</span>
                </h2>
                <h2 className="text-base font-semibold text-gray-700">
                  Added Date:{" "}
                  <span className="text-black">{item.addedDate}</span>
                </h2>
                <div className="flex justify-center gap-5 mt-5 mb-2">
                  <Link
                    to={`/updateasset/${item._id}`}
                    className="w-full bg-cyan-500 text-center text-md text-white py-1 rounded-md font-semibold"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-full bg-red-500 text-md text-white py-1 rounded-md font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;
