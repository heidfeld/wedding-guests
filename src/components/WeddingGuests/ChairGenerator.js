import Chair from "../Chair/Chair";
import React from "react";

const renderChair = (properties) => {
    const {rotation, x, y, label} = properties;
    return (
        <Chair
            x={x}
            y={y}
            rotation={rotation}
            label={label}
        />
    )
};

const degToRad = (deg) => {
    return deg * (Math.PI / 180);
};

const prepareChair = (index, max, label, radius = 80) => {
    const angle = index * 360 / max;
    const radians = degToRad(angle - 90);

    const x = (radius) * Math.cos(radians);
    const y = (radius) * Math.sin(radians);

    const properties = {rotation: angle, x, y, label};
    return renderChair(properties);
};

const getRangeArray = (count = 0) => {
    return Array.from(Array(count).keys())
};

export const generateAllChairs = (count) => {
    return getRangeArray(count).map(index => prepareChair(index, count, `Gość ${index}`));
};