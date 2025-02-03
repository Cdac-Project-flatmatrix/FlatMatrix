import React from "react";
import "../App.css";

const teamMembers = [
  {
    name: "Snehal Jagannath Patil",
  },
  {
    name: "Vaishnavi Dilip Ghaitidak",
  },
  {
    name: "Abhishek Vyankatesh Talkokul",
  },
  {
    name: "Manu Sharma",
  },
];

function OurTeam() {
  return (
    <div className="our-team-container wishlist-container-wrapper">
      <h1 className="text-center my-5">Meet Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <a href="https://www.linkedin.com/in/abhishek-talkokul-3043a9160/">
            <div key={index} className="team-member">
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;
