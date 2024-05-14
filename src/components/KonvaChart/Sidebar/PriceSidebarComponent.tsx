import {Layer, Line, Stage,Text} from "react-konva";
import React, {useEffect, useState} from "react";

interface PriceSidebarComponentProps {
    width : number,
    height : number
    ySpacing:number;
    position: { x: number; y: number };
}

export const PriceSidebarComponent : React.FC<PriceSidebarComponentProps> = ({width,height,ySpacing,position}) => {
    const [priceBar, setPriceBar] = useState([]);

    useEffect(() => {



        const newPriceBar = [];
        for (let i = 0 ; i <= height; i += ySpacing) {
            newPriceBar.push(
                <Text
                    key={`price_${i}`}
                    text={ -(i - position.y  +position.y%ySpacing)}
                    x={10}
                    y={i+position.y%ySpacing}
                    stroke="black"
                    strokeWidth={1}
                />
            );
        }
        setPriceBar(newPriceBar);
    }, [width, height, ySpacing, position]);

    return (
        <Stage width={width} height={height}>
        <Layer >
            {priceBar}
        </Layer>
        </Stage>
    );
};