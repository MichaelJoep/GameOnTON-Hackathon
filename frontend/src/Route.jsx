import {createBrowserRouter, Outlet} from "react-router-dom";
import LoaderPage from "./pages/loaderpage/LoaderPage";
import LandingPage from "./pages/landingPage/LandingPage";
import Battle from "./pages/battle/Battle";
import Earn from "./pages/earn/Earn";
import Store from "./pages/store/Store";
import Multiplayer from "./pages/multiplayer/Multiplayer";
import LeaderBoard from "./pages/leaderboard/LeaderBoard";
import Marketplace from "./pages/marketplace/Marketplace";
import Event from "./pages/event/Event";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";

// Preload the 3D model once when the router is created
//useGLTF.preload();





const router = createBrowserRouter([
    {
        path: "/",
        element:<LoaderPage />,
    },
    {
        path: "/landing-page",
        element:<LandingPage />,
    },
    {
        path: "/battle-ground-page",
        element:<Battle />,
    },
    {
        path: "/earn-page",
        element:<Earn />,
    },
    {
        path: "/store-page",
        element:<Store />,
    },
    {
        path: "/profile-page",
        element:<Profile />,
    },
    {
        path: "/profile-page/edit-profile",
        element:<EditProfile />,
    },
    {
        path: "/multiplayer-page",
        element:<Multiplayer />,
    },
    {
        path: "/leaderboard-page",
        element:<LeaderBoard />,
    },
    {
        path: "/marketplace-page",
        element:<Marketplace />,
    },
    {
        path: "/event-page",
        element:<Event />,
    },
]);
export default router;
