import React, {useEffect, useState} from 'react';
import {Rect, Line} from 'react-konva';
import {priceToCoords} from "../Utils/CoordConvertor.ts";
import {SimpleCandleManager} from "./SimpleCandleManager.tsx";
import {CandleComponent, CandleComponentProps} from "./CandleComponent.tsx";

export class Candle {
    constructor(public ticker: string, public period: string, public date: string, public time: string, public open: number, public close: number, public high: number, public low: number, public vol: number) {
    }
}

export class Point {
    constructor(public x: number, public y: number) {
    }
}

export class ChartRangeInfo {

    constructor(public startOffset: number, public startIndex: number, public endIndex: number) {
    }
}

interface CandlesComponentProps {
    candles: Candle[];
    priceStep: number;
    yOffset: number;
    position: { x: number; y: number };
}

export const CandlesComponent: React.FC<CandlesComponentProps> = ({
                                                                      candles,
                                                                      yOffset,
                                                                      priceStep,
                                                                      position
                                                                  }) => {

    const candleWidth = 5;
    const candleMargin = 2;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [chartRangeInfo, setChartRangeInfo] = useState<ChartRangeInfo>({startOffset: 0, startIndex: 0, endIndex: 0});


    //получение индекса свечи по позиции камеры
    useEffect(() => {
        if (candles.length == 0) return;
        let curI = -Math.floor(position.x / (candleWidth + candleMargin));

        let startIndex = Math.min(Math.max(currentIndex - 60, 0), candles.length - 1);
        let endIndex = Math.min(Math.max(currentIndex + 60, 0), candles.length - 1);
        setChartRangeInfo(new ChartRangeInfo(Math.max(120 - endIndex, 0), startIndex, endIndex));
        setCurrentIndex(curI);
    }, [position]);

    const calcCandleX = (i: number):number => {
        const index = (i + currentIndex + chartRangeInfo.startOffset);
        const step = (candleWidth + candleMargin);

        return index * step ;
    }

    return (
        <>
            {candles.slice(chartRangeInfo.startIndex, chartRangeInfo.endIndex).map((candle, index) => (
                <CandleComponent key={"_" + index} {...{
                    candle: candle,
                    index:  "_" + index,
                    startShadow: new Point(calcCandleX(index) + candleWidth / 2 , priceToCoords(candle.high, priceStep) + yOffset),
                    endShadow: new Point(calcCandleX(index) + candleWidth / 2, priceToCoords(candle.low, priceStep) + yOffset),
                    startBody: new Point(calcCandleX(index), priceToCoords(candle.open, priceStep) + yOffset),
                    height: priceToCoords(candle.close, priceStep) - priceToCoords(candle.open, priceStep),
                    width: candleWidth,
                }} />
            ))}
        </>
    );
};