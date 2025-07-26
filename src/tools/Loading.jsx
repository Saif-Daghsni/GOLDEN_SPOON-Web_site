import React from "react";
import "./Loading.css";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <MutatingDots
        height={80}
        width={80}
        color="#e74504"
        secondaryColor="#e1a087ff"
        radius={12.5}
        ariaLabel="mutating-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
