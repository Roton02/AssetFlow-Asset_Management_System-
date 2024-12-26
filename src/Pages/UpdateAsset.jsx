/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { register } from "swiper/element";
import UseAuth from "../CustomHook/UseAuth";
import { Helmet } from "react-helmet-async";

const UpdateAsset = () => {
    const { user } = UseAuth()
    const { id } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("https://assetflow-server-side.vercel.app/assets")
          .then((res) => res.json())
          .then((data) => {
            const filterData = data.filter((item) => item._id === id)
            setData(filterData)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    const {
		register,
        reset,
		handleSubmit,
		formState: { errors }, 
	  } = useForm()

      const handleUpdateAsset = (data) => {

        const {productName, productImage, productType, productQuantity, availibility} = data

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const updatedAsset = {
            postedBy: user.email,
            addedDate: formattedDate,
            productName,
            productImage,
            productQuantity: parseInt(productQuantity),
            productType,
            availibility 
        }
    
        fetch(`https://assetflow-server-side.vercel.app/assets/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedAsset) 
      })
      .then(res => res.json())
      .then(data => {
          if (data.modifiedCount > 0) {
              toast.success("Successfully Updated");
          } else {
              toast.error("Already Updated")
          }
      })
      .catch(error => console.error("Error updating Asset:", error));
    
      }
      
  return (
    <div className="w-full h-screen bg1">
      <Helmet>
        <title>Update Asset</title>
      </Helmet>
      <div className="max-w-md mx-auto">
        <form action="" className="pt-5" onSubmit={handleSubmit(handleUpdateAsset)}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="productName"
                className="block text-base font-bold"
              >
                Product Name
              </label>
              <input
                type="text"
                value={data[0]?.productName}
                name="productName"
                id="productName"
                placeholder="Your Pruduct's Name"
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                {...register("productName", { required: true })}
              />
              {errors.productName && (
                <span className="text-sm text-red-600 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="productImage"
                className="block text-base font-bold"
              >
                Product Image
              </label>
              <input
                type="url"
                name="productImage"
                defaultValue={data[0]?.productImage}
                id="productImage"
                placeholder="Your Product's Image URL"
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                {...register("productImage", { required: false })}
              />
              {errors.productImage && (
                <span className="text-sm text-red-600 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="productType"
                className="block text-base font-bold"
              >
                Your Product Type
              </label>
              <select
                name="productType"
                defaultChecked={data[0]?.productType}
                id="productType"
                className="w-full px-3 bg-transparent py-2 border border-black rounded-md"
                {...register("productType", { required: true })}
              >
                <option value="">Select Product Type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-Returnable">Non-Returnable</option>
              </select>
              {errors.productType && (
                <span className="text-sm text-red-600 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="productQuantity"
                className="block text-base font-bold"
              >
                Product Quantity
              </label>
              <input
                type="number"
                name="productQuantity"
                defaultValue={data[0]?.productQuantity}
                id="productQuantity"
                placeholder="Your Product's Quantity"
                className="w-full bg-transparent px-3 py-2 border border-black rounded-md"
                {...register("productQuantity", { required: true })}
              />
              {errors.productQuantity && (
                <span className="text-sm text-red-600 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="productType"
                className="block text-base font-bold"
              >
                Select Availibility
              </label>
              <select
                name="availibility"
                defaultChecked={data[0]?.availibility}
                id="availibility"
                className="w-full px-3 bg-transparent py-2 border border-black rounded-md"
                {...register("availibility", { required: true })}
              >
                <option value="">Select Availibility</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              {errors.availibility && (
                <span className="text-sm text-red-600 font-semibold">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-7 px-8 py-3 font-semibold rounded-md bg-purple text-white"
            >
              Update Asset
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateAsset;
