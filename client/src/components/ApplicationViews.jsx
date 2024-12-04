/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { UserProfileList } from "./Users/UserProfileList";
import { UserProfileDetails } from "./Users/UserProfileDetails";
import { ChoreList } from "./Chores/ChoreList";
import { ChoreDetails } from "./Chores/ChoreDetails";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home/>
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
      <Route path="/userprofiles">
          <Route index element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileList/>
            </AuthorizedRoute>
          }/>
           <Route path=":userId" element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileDetails/>
            </AuthorizedRoute>
          }/>

      </Route>
      <Route path="/Chores">
          <Route index element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoreList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }/>
           <Route path=":choreId" element={
            <AuthorizedRoute  loggedInUser={loggedInUser}>
              <ChoreDetails loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
          }/>

      </Route>

    </Routes>
  );
}
