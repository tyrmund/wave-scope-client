import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";

import BeachesPage from "../pages/BeachesPage";
import BeachDetailsPage from "../pages/BeachDetailsPage";

import MarineLifePage from "../pages/MarineLifePage";
import MarineLifeDetailsPage from "../pages/MarineLifeDetailsPage";
import NewMarineLifePage from "../pages/NewMarineLifePage";
import EditMarineLifePage from "../pages/EditMarineLifePage";

import SightingsPage from "../pages/SightingsPage";
import SightingDetailsPage from "../pages/SightingDetailsPage";
import NewSightingPage from "../pages/NewSightingPage";
import EditSightingPage from "../pages/EditSightingPage";

import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import UserProfilePage from "../pages/UserProfilePage";
import EditUserProfilePage from "../pages/EditUserProfile";

import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path={"/"} element={<Homepage />} />

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

        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/profile"} element={<UserProfilePage />} />
        <Route path={"/profile/edit"} element={<EditUserProfilePage />} />

        <Route path={"/*"} element={<NotFoundPage />} />

      </Routes>
    </div>
  )
}

export default AppRoutes