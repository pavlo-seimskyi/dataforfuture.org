import React from "react";
import { PulseLoader } from "react-spinners";

function StatusLoading({ color }) {
    return (
        <div className="status-loading">
            <PulseLoader color={color} aria-label="Loading status icon" />
        </div>
    );
};

export default StatusLoading;
