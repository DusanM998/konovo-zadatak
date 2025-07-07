import { useState } from "react"
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../storage/redux/store";

const UserProfile = () => {
    const [showPassword, setShowPassword] = useState(false);

    const user = useSelector((state: RootState) => state.userAuthStore);

    return(
        <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-col items-center gap-4">
                <FaUserCircle className="text-6xl text-gray-500" />

                <div className="text-center">
                    <p className="text-lg font-semibold">Korisnicko ime: </p>
                    <p className="text-gray-700">{user.username}</p>
                </div>

                <div className="w-full">
                    <p className="text-lg font-semibold mb-1">Lozinka</p>
                    <div className="relative w-full">
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            readOnly
                            className="border border-gray-300 rounded px-4 py-2 pr-12 w-full 
                            focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;