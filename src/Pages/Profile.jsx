import { updateProfile } from "firebase/auth"
import auth from "../Firebase/Firebase.init"
import { ToastContainer, toast } from "react-toastify"
import UseAuth from "../CustomHook/UseAuth"
import { Helmet } from "react-helmet-async"

const Profile = () => {
  const { user } = UseAuth()
  const handleUpdateProfile = (e) => {
    e.preventDefault()
    const name = e.target.name.value 
    const url = e.target.url.value 
    updateProfile(auth.currentUser, {
        displayName: name, photoURL: url
      })
      toast.success("Profile updated successfully. But it takes few times to make the change in UI. please wait")
}
  return (
    <div className="h-screen w-full bg1">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <form className="contain px-2 md:px-3 lg:px-0" onSubmit={handleUpdateProfile}>
        <div className="max-w-[500px] pt-10">
        <label htmlFor="name" className="block text-lg font-semibold">Update Name</label>
          <input type="text" name="name" id="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="max-w-[500px] mt-5">
        <label htmlFor="url" className="block text-lg font-semibold">Update Photo</label>
          <input type="url" name="url" id="url" placeholder="Your URL" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-purple border-2 px-5 py-1 mt-5 text-white rounded-md text-lg font-semibold">Update Profile</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Profile
