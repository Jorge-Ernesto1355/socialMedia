import React from "react";
import Highlight from "../highlight/HighLight";
import rem from "../../../assets/rem.jpg";

function AccountItem({ hit }) {
  return (
    <div className="account-body">
      <div className="account-avatar">
        <img
          src={
            !hit.imageProfile || hit.imageProfile === ""
              ? rem
              : hit.imageProfile
          }
          alt={"profile image"}
        />
      </div>
      <div>
        <div className="account-name">
          <p>@{hit?.username ?? ""}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;
