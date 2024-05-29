import { Routes, Route } from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

import BeachesPage from "../pages/BeachesPage/BeachesPage";
import BeachDetailsPage from "../pages/BeachDetailsPage/BeachDetailsPage";

import MarineLifePage from "../pages/MarineLifePage/MarineLifePage";
import MarineLifeDetailsPage from "../pages/MarineLifeDetailsPage/MarineLifeDetailsPage";
import NewMarineLifePage from "../pages/NewMarineLifePage/NewMarineLifePage";
import EditMarineLifePage from "../pages/EditMarineLifePage/EditMarineLifePage";

import SightingsPage from "../pages/SightingsPage/SightingsPage";
import SightingDetailsPage from "../pages/SightingDetailsPage/SightingDetailsPage";
import NewSightingPage from "../pages/NewSightingPage/NewSightingPage";
import EditSightingPage from "../pages/EditSightingPage/EditSightingPage";

import SignupPage from "../pages/SignupPage/SignupPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import EditUserProfilePage from "../pages/EditUserProfile/EditUserProfile";

import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path={"/"} element={<StartPage />} />
        <Route path={"/signup"} element={<SignupPage />} />

        <Route element={<PrivateRoute />}>

          <Route path={"/welcome"} element={<WelcomePage />} />

          <Route path={"/beaches"} element={<BeachesPage />} />
          <Route path={"/beaches/:beachId"} element={<BeachDetailsPage />} />

          <Route path={"/marine-life"} element={<MarineLifePage />} />
          <Route path={"/marine-life/:specimenId"} element={<MarineLifeDetailsPage />} />
          <Route path={"/marine-life/new"} element={<NewMarineLifePage />} />
          <Route path={"/marine-life/edit"} element={<EditMarineLifePage />} />

          <Route path={"/sightings"} element={<SightingsPage />} />
          <Route path={"/sightings/:sightingId"} element={<SightingDetailsPage />} />
          <Route path={"/sightings/new"} element={<NewSightingPage />} />
          <Route path={"/sightings/edit"} element={<EditSightingPage />} />

          <Route path={"/profile"} element={<UserProfilePage />} />
          <Route path={"/profile/edit"} element={<EditUserProfilePage />} />

        </Route>

        <Route path={"/*"} element={<NotFoundPage />} />

      </Routes>
    </div>
  )
}

export default AppRoutes