import React, {useEffect, useRef, useState} from 'react';
import {Stage, Layer, Text, Rect} from 'react-konva';
import Konva from "konva";
import {coordsToPrice} from "../Utils/CoordConvertor.ts";

interface MouseTrackerProps {
    position: { x: number; y: number };
    priceStep:number;
}

const MouseTracker : React.FC<MouseTrackerProps> = ({position,priceStep})  => {

    useEffect(() => {


    }, []);





    return (
        <>
            <Layer>
                {/* Выводим текст с текущими координатами мыши */}
                <Text text={`X: ${position.x}, Y: ${-position.y}`} x={position.x - 40} y={position.y +15} />
                <Text text={`Price: ${coordsToPrice(-position.y,priceStep)}`} x={position.x - 40} y={position.y +30} />

            </Layer>
        </>
    );
};

export default MouseTracker;