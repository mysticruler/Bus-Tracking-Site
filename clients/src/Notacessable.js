import React, { useEffect } from "react";
import img from './notfound.webp'

function NotAccessible() {
    const imgStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    };

    const imgTagStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover", // Ensure the image covers the entire container
    };

    return (
        <div style={imgStyle}>
            {/* You can provide an empty alt tag if the image is decorative */}
            <img src={img} alt="" style={imgTagStyle} />
        </div>
    );
}

export default NotAccessible;
