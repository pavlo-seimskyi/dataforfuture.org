import React from "react";
import { IconContext } from "react-icons";

function Icon({ icon }) {
    return (
        <IconContext.Provider value={{ className: "icon" }}>
          {icon}
        </IconContext.Provider>   
    )
}

export default Icon;