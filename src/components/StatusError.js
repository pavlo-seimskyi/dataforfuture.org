import React from "react";
import { TbFaceIdError } from "react-icons/tb";
import Icon from "./Icon";


function StatusError() {
    return (
        <div className="status-error">
            <Icon icon={<TbFaceIdError/>} />
            <p>Oops! Something went wrong...</p>
        </div>
    );
};

export default StatusError;
