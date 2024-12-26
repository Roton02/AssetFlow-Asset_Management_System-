/* eslint-disable no-mixed-spaces-and-tabs */
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import UseAuth from "../CustomHook/UseAuth"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
const AddAnAsset = () => {
  const [company, setCompany] = useState(null)
  const { user } = UseAuth()
  const {
		register,
    reset,
		handleSubmit,
		formState: { errors }, 
	  } = useForm()

    useEffect(() => {
      fetch("https://assetflow-server-side.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const currentAdmin = data.filter((item) => item.email === user.email)
        setCompany(currentAdmin[0].companyName)
      })
    }, [])

    const assetSubmit = (data) => {
        const { productName, productImage, productType, productQuantity } = data

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        console.log(formattedDate);
        const addAsset = {
          postedBy: user.email,
          addedDate: formattedDate,
          productName,
          productImage,
          productQuantity: parseInt(productQuantity),
          productType,
          availibility: "available",
          companyName: company
        }

        fetch("https://assetflow-server-side.vercel.app/assets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(addAsset)
			})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to Add: ${res.status} ${res.statusText}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log(data)
				if(data.insertedId){
					toast.success("Successfully Added");
				}
			})
			.catch(error => {
				console.error('Error adding job:', error);
				toast.error("Failed to Added");
			});
      reset()
    }
  return (
    <div className="w-full h-screen bg1">
      <Helmet>
        <title>Add an Asset</title>
      </Helmet>
      <div className="max-w-md mx-auto px-2 md:px-3 lg:px-0">
      <form action="" className="pt-5" onSubmit={handleSubmit(assetSubmit)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="productName" className="block text-base font-bold">Product Name</label>
            <input type="text" name="productName" id="productName" placeholder="Your Pruduct's Name" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("productName", { required: true })}/>
            {errors.productName && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="productImage" className="block text-base font-bold">Product Image</label>
            <input type="url" name="productImage" id="productImage" placeholder="Your Product's Image URL" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("productImage", { required: false })}/>
            {errors.productImage && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="productType" className="block text-base font-bold">Your Product Type</label>
            <select name="productType" id="productType" className="w-full px-3 bg-transparent py-2 border border-black rounded-md" {...register("productType", { required: true })}>
              <option value="">Select Product Type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
            {errors.productType && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="productQuantity" className="block text-base font-bold">Product Quantity</label>
            <input type="number" name="productQuantity" id="productQuantity" placeholder="Your Product's Quantity" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("productQuantity", { required: true })}/>
            {errors.productQuantity && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
          </div>
          <button type="submit" className="w-full mt-7 px-8 py-3 font-semibold rounded-md bg-purple text-white">Add This Asset</button>
        </div>
      </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AddAnAsset
