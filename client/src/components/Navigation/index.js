import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </li>
    <li>
      <Link to={ROUTES.UPLOAD}>Upload</Link>
    </li>
    <li>
      <Link to={ROUTES.REVIEW}>Review</Link>
    </li>
    <li>
      <Link to={ROUTES.VIEW}>View</Link>
    </li>
    <li>
      <Link to={ROUTES.MYFILES}>MyFiles</Link>
    </li>
    <li>
      <Link to={ROUTES.REVIEWERAPP}>ReviewerApp</Link>
    </li>
    <li>
      <Link to={ROUTES.ABOUT}>About</Link>
    </li>
    <li>
      <Link to={ROUTES.FAQ}>FAQ</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

export default Navigation;
