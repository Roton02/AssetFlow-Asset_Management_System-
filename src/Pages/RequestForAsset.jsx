import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import UseAuth from "../CustomHook/UseAuth";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const RequestForAsset = () => {
  const { user } = UseAuth();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [assetType, setAssetType] = useState("");
  const [matched, setMatched] = useState([]);
  const [popup, setPopup] = useState(false);
  const [postedBy, setPostedBy] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productType, setProductType] = useState(null);
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        // console.log(userData)
        setUserData(data.filter((item) => item?.email === user.email));
        // console.log(userData)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // console.log(userData)
    fetch("https://assetflow-server-side.vercel.app/assets")
      .then((res) => res.json())
      .then((data) => {
        setData(
          data?.filter(
            (item) => item?.companyName === userData?.[0]?.affiliateWith
          )
        );
        // console.log(data)
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

  const filteredData = data
    .filter((item) =>
      item?.productName?.toLowerCase().includes(searchQuery.toLowerCase())
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
    );

  const handleRequestAsset = (item) => {
    setPopup(true);
    setPostedBy(item.postedBy);
    setProductName(item.productName);
    setProductImage(item.productImage);
    setProductType(item.productType);
    setId(item._id);
  };
  const hidePopup = () => {
    setPopup(false);
  };

  const handleConfirmRequest = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const request = {
      requesterEmail: user.email,
      requesterName: user.displayName,
      postedBy,
      productName,
      productImage,
      productType,
      productId: id,
      message: message,
      requestedDate: formattedDate,
      status: "Pending",
      approvalDate: "",
    };

    fetch("https://assetflow-server-side.vercel.app/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to confirm: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success("Successfully confirmed your request");
        }
      })
      .catch((error) => {
        console.error("Error adding job:", error);
        toast.error("Failed to Confirm");
      });
    setMessage("");
    setPopup(false);
  };
  // console.log(postedBy)
  return (
    <div className="w-full min-h-screen bg1 overflow-hidden">
      <Helmet>
        <title>Request for Asset</title>
      </Helmet>
      <div className="contain pt-1 pb-10 px-2 md:px-3 lg:px-0">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 w-full gap-3 border-2 p-1 rounded-lg border-purple">
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
        </div>
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <img src="/src/assets/NotFoundSVG.svg" alt="" className="w-full lg:w-[35%]"/>
            <h1 className="text-center text-sm md:text-base pt-5 font-bold text-red-500">
              Currently your not affiliate with any company, Please contact with
              your HR manager
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
                <h1 className="text-base xxl:text-lg font-semibold mt-2 text-gray-700">
                  Product Name:{" "}
                  <span className="text-black">{item.productName}</span>
                </h1>
                <h2 className="text-base xxl:text-lg font-semibold text-gray-700">
                  Product Type:{" "}
                  <span className="text-black">{item.productType}</span>
                </h2>
                <h2 className="text-base xxl:text-lg font-semibold text-gray-700">
                  Availability:{" "}
                  <span className="text-black">{item.availibility}</span>
                </h2>
                <div className="mt-5 mb-2">
                  <button
                    onClick={() => handleRequestAsset(item)}
                    className={`w-full gradient-bg2 text-md text-white py-1 rounded-md font-semibold ${
                      item.availibility === "Out of Stock" && "grad"
                    }`}
                  >
                    Request for this Asset
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className={`h-96 w-96 bg-white border absolute top-40 popup ${!popup && "hidden"} p-2`}>
            <div className="flex justify-end">
              <button onClick={hidePopup}><IoMdClose  size={25}/></button>
            </div>
          </div> */}
      </div>
      <div
        className={`h-full w-screen bg-transparent backdrop-blur-sm fixed flex items-center justify-center z-50 top-0 ${
          !popup && "hidden"
        }`}
      >
        <div className={`pb-5 w-96 bg-white border popup rounded-md shad p-2`}>
          <div className="flex justify-end">
            <button onClick={hidePopup}>
              <IoMdClose size={25} />
            </button>
          </div>
          <textarea
            value={message}
            rows="5"
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            id="message"
            placeholder="Enter a short note for your HR Manager"
            className="p-1 w-full  border-2 border-purple/50 mt-3 rounded-md resize-none"
          ></textarea>
          <button
            onClick={handleConfirmRequest}
            className="w-full gradient-bg2 text-md text-white py-1 rounded-md font-semibold mt-2"
          >
            Confirm Request
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestForAsset;
