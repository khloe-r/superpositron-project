import { useEffect, useState } from "react";
import React from "react";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext.js";
import "./award.css";
import StarIcon from "@material-ui/icons/Star";

const Awards = () => {
  const userRef = firebase.firestore().collection("users");
  const { currentUser } = useAuth();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const goalMilestones = [1, 5, 10, 15, 20, 25, 50, 100];
  const bubbleMilestones = [1, 3, 5, 10, 15, 20];

  function getAwards() {
    setLoading(true);
    console.log("getting");
    userRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setUser(doc.data());
        }
      })
      .then(() => {
        console.log("Done");
      });
    setLoading(false);
  }

  useEffect(() => {
    getAwards();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{currentUser.displayName}'s Awards</h1>
      <div className="row cols">
        <div>
          <p>Goals Completed: {user?.goalsComplete} </p>
          {goalMilestones.map((goal) => {
            if (goal <= user?.goalsComplete) {
              return (
                <div className="awardbox">
                  <StarIcon style={{ fontSize: 70 }} />
                  <p>Completed {goal} Goals</p>
                </div>
              );
            }
          })}
        </div>
        <div>
          <p>Bubbles Joined: {user?.bubbles.length}</p>
          {bubbleMilestones.map((bub) => {
            if (bub <= user?.bubbles.length) {
              return (
                <div className="goalbox">
                  <StarIcon style={{ fontSize: 70 }} />
                  <p>
                    Joined {bub} <br />
                    Bubbles
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Awards;
