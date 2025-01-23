import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { updateIsOwner } from "@/redux/slices/compilerSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const windowWidth = useSelector(
    (state: RootState) => state.appSlice.windowWidth
  );
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );
  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false));
    } catch (error) {
      handleError(error);
    }
  }

  const handleCloseSheet = () => {
    setSheetOpen(false);
  };


  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/codepen-home_logo.png" alt="CodePen logo" className="h-7" />
        <h2 className="font-bold select-none"></h2>
      </Link>
      {windowWidth > 640 ? (
        <ul className="flex gap-2">
          <li>
            <Link to="/compiler">
              <Button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">Start Coding</Button>
            </Link>
          </li>
          <li>
            <Link to="/all-codes">
              <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">All Codes</Button>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/my-codes">
                  <Button className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">My Codes</Button>
                </Link>
              </li>
              <li>
                <Button
                  loading={isLoading}
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition"
                >
                  Logout
                </Button>
              </li>
              <li>
                <Avatar>
                  <AvatarImage src={currentUser.picture} />
                  <AvatarFallback className="capitalize">
                    {currentUser.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">Signup</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <ul className="flex gap-2 flex-col py-5">
                <li>
                  <Link to="/compiler">
                    <Button
                      onClick={handleCloseSheet}
                      className="w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-md hover:opacity-90 transition"
                    >
                      Compiler
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/all-codes">
                    <Button
                      onClick={handleCloseSheet}
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:opacity-90 transition"
                    >
                      All Codes
                    </Button>
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/my-codes">
                        <Button
                          onClick={handleCloseSheet}
                          className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-md hover:opacity-90 transition"
                        >
                          My Codes
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        loading={isLoading}
                        onClick={async () => {
                          await handleLogout();
                          handleCloseSheet();
                        }}
                        className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-md hover:opacity-90 transition"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <Button
                          onClick={handleCloseSheet}
                          className="w-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-md hover:opacity-90 transition"
                        >
                          Login
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <Button
                          onClick={handleCloseSheet}
                          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-md hover:opacity-90 transition"
                        >
                          Signup
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </nav>
  );
}