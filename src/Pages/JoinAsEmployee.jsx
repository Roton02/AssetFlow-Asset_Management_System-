/* eslint-disable no-mixed-spaces-and-tabs */
import { GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UseAuth from '../CustomHook/UseAuth';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from "../Firebase/Firebase.init"
import { Helmet } from "react-helmet-async";

const JoinAsEmployee = () => {
	const navigate = useNavigate()
    const [show, setShow] = useState(false)
	const toggleShow = () => {
		setShow(!show)
	}
    

	  function isPasswordValid(password) {		
		const uppercaseRegex = /[A-Z]/;
		const lowercaseRegex = /[a-z]/;
		return (
		  password.length >= 6 &&
		  uppercaseRegex.test(password) &&
		  lowercaseRegex.test(password)
		);
	  }
	  const notify = () => toast.error("Password should have 1 uppercase letter, 1 lowercase letter and 6 character long");
	//   const { createUser, updateUserProfile, googleLogin } = UseAuth()
	  const { createUser, updateUserProfile, } = UseAuth()
	  const {
		register,
		handleSubmit,
		formState: { errors }, 
	  } = useForm()

	  const googleProvider = new GoogleAuthProvider();
	  const googleLogin = () => {
       signInWithPopup(auth, googleProvider)
	   .then((result) => {
		const addUser = {
			name: result.user?.displayName,
			email: result.user?.email,
			role: "Employee",
			affiliateWith: "",
		}
		fetch("https://assetflow-server-side.vercel.app/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(addUser)
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Failed to Login: ${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.then((data) => {
			console.log(data)
			if(data.insertedId){
				toast.success("Successfully Login");
			}
		})
		.catch(error => {
			console.error('Error adding job:', error);
			toast.error("Failed to Login");
		});
	   })
     }

	  const onSubmit = (data) => {					
		const {email, password, image, name, dateofbirth, employeePhoto} = data
		const addUser = {
			name,
			email,
			role: "Employee",
			dateofbirth,
			affiliateWith: "",
			employeePhoto
		}
		if(isPasswordValid(password)){
			createUser(email, password)
		.then((result) => {
			updateUserProfile(name, image)
			.then(() => {
				navigate("/")
			})
			// toast.success("Successfully Login")
		})
		} else {
			notify()
		}
		fetch("https://assetflow-server-side.vercel.app/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(addUser)
			})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to Login: ${res.status} ${res.statusText}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log(data)
				if(data.insertedId){
					toast.success("Successfully Login");
				}
			})
			.catch(error => {
				console.error('Error adding job:', error);
				toast.error("Failed to Login");
			});
		  
	  }
	  
  return (
    <div className='w-full bg2 h-full'>
		<Helmet>
        <title>Join as Employee</title>
      </Helmet>
		<div className='w-full mx-auto max-w-md p-4 rounded-md  sm:p-8'>
		<button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border border-black rounded-md focus:ring-2 focus:ring-offset-1" onClick={() => googleLogin()}>
			<img src="/src/assets/googleLogo.png" alt="" className="w-6"/>
			<p>Login with Google</p>
		</button>
		<div className="flex items-center w-full my-4">
			<hr  className="w-full border border-black" />
			<p className="px-3">OR</p>
			<hr  className="w-full border border-black" />
		</div>
      <form noValidate="" action="" className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="name" className="block text-sm">Full Name</label>
				<input type="text" name="name" id="name" placeholder="Your Name" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("name", { required: true })}/>
				{errors.name && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="youremail@gmail.com" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("email", { required: true })}/>
				{errors.email && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="employeePhoto" className="block text-sm">Your Photo</label>
				<input type="url" name="employeePhoto" id="employeePhoto" placeholder="Your Photo URL" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("employeePhoto", { required: false })}/>
				{errors.employeePhoto && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="dateofbirth" className="block text-sm">Date of Birth</label>
				<input type="date" name="dateofbirth" id="dateofbirth" placeholder="" className="w-full px-3 py-2 border bg-transparent border-black rounded-md" {...register("dateofbirth", { required: true })}/>
				{errors.dateofbirth && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm">Password</label>
				</div>
				<div className='w-full px-3 py-2 border border-black bg-transparent rounded-md flex  justify-between items-center'>
					<input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" className="w-full bg-transparent outline-none" {...register("password", { required: true })}/>					
					{show ? <IoEyeOutline className='text-xl cursor-pointer' onClick={toggleShow}/> : <IoEyeOffOutline className='text-xl cursor-pointer' onClick={toggleShow}/>}
					</div>
				{errors.password && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
		</div>
		<button type="submit" className="w-full mt-5 px-8 py-3 font-semibold rounded-md bg-purple text-white">Sign Up</button>
	</form>
    <p className="text-md text-center mt-3">Already have account?
		<Link to={"/login"} rel="noopener noreferrer" className="focus:underline hover:underline font-semibold"> Sign In here</Link>
	</p>
	<ToastContainer />
    </div>
	</div>
  )
}

export default JoinAsEmployee
