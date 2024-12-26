/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useForm} from "react-hook-form"
import UseAuth from "../CustomHook/UseAuth";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false)
	const toggleShow = () => {
		setShow(!show)
	}
	const {signInUser, googleLogin} = UseAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm()
	  const onSubmit = (data) => {
		const {email, password} = data;
		signInUser(email, password)
		.then((result) => {
			navigate("/");
			toast.success("Successfuly Login")
		})
		.catch((error) => {
			toast.error("Please enter a valid email & password")
		})
	  }
	
	const googleLogIn = async () => {
		await googleLogin()
		.then(() => {
			navigate("/");
		})
	}

    useEffect(() => {
        document.title = 'Login Page';
        return () => {
          document.title = 'Title';
        };
      }, []);

  return (
    <div className="w-full h-full bg2">
		<div className="contain">
      <div className="w-full mx-auto max-w-md p-4 rounded-md  sm:p-8">
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<div className="my-6 space-y-4">
		<button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border border-black rounded-md focus:ring-2 focus:ring-offset-1" onClick={googleLogIn}>
			<img src="/src/assets/googleLogo.png" alt="" className="w-6"/>
			<p>Login with Google</p>
		</button>
	</div>
	<div className="flex items-center w-full my-4">
		<hr  className="w-full border border-black" />
		<p className="px-3">OR</p>
		<hr  className="w-full border border-black" />
	</div>
	<form noValidate="" action="" className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("email", { required: true })}/>
				{errors.email && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm">Password</label>
				</div>
				<div className='w-full px-3 py-2 border border-black rounded-md flex  justify-between items-center'>
					<input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" className="w-full bg-transparent outline-none" {...register("password", { required: true })}/>					
					{show ? <IoEyeOutline className='text-xl cursor-pointer' onClick={toggleShow}/> : <IoEyeOffOutline className='text-xl cursor-pointer' onClick={toggleShow}/>}
					</div>
				{/* <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md" {...register("password", { required: true })}/> */}
				{errors.password && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
		</div>
		<button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-purple text-white">Sign in</button>
	</form>
    <p className="text-md text-center mt-3">Dont have account?
		<Link to={"/register"} rel="noopener noreferrer" className="focus:underline hover:underline font-semibold"> Sign up here</Link>
	</p>
</div>
<ToastContainer />
    </div>
	</div>
  )
}

export default Login
