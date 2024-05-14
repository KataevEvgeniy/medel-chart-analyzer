import {Candle, Point} from "./CandlesComponent.tsx";
import React from "react";
import {Line, Rect} from "react-konva";


export interface CandleComponentProps {
    candle: Candle;
    index: string;
    startShadow: Point;
    endShadow: Point;
    startBody: Point;
    height: number;
    width: number;
}

export const CandleComponent: React.FC<CandleComponentProps> = ({
                                                                    candle,
                                                                    index,
                                                                    startShadow,
                                                                    endShadow,
                                                                    startBody,
                                                                    height,
                                                                    width
                                                                }) => {


    return (
        <React.Fragment key={index}>
            <Line
                points={[startShadow.x, startShadow.y, endShadow.x, endShadow.y]}
                stroke="black"
                strokeWidth={1}
            />
            <Rect
                x={startBody.x}
                y={startBody.y}
                width={width}
                height={height}
                fill={candle.open > candle.close ? 'green' : 'red'}
            />
        </React.Fragment>
    );
};

