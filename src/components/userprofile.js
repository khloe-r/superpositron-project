import React from "react";
import CreateBubble from "./createbubble";

import { useAuth } from "../contexts/AuthContext.js";

const UserProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h4>{currentUser.displayName}</h4>
      <h4>{currentUser.email}</h4>
      {/* bubbles and goals will need to pull from the database */}
      <h4>{currentUser.bubbles}</h4>
      <h4>{currentUser.goals}</h4>
      <CreateBubble />
    </div>
  );
};

export default UserProfile;
