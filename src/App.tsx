import React, {useEffect, useState} from 'react'
import ChartComponent from "./components/ChartComponent.tsx";
import {ChartComponent as KonvaChartComponent} from "./components/KonvaChart/ChartComponent.tsx";
import ParserComponent from "./components/ParserComponent.tsx";
import {Candle, CandlesComponent} from "./components/KonvaChart/Candles/CandlesComponent.tsx";
import {Button, Container, Slider} from "@mui/material";
import {TrainerComponent} from "./components/TrainerComponent.tsx";
import {MultiCandlesComponent} from "./components/KonvaChart/Candles/MultiCandlesComponent.tsx";


function App() {
    const [predictedCandles, setPredictedCandles] = useState<Candle[][]>([])
    const [realCandles, setRealCandles] = useState<Candle[]>([])

    const handleSetPredictedCandles = (rawCandlesArrayArray: number[][][]) => {
        const predictedCandles: Candle[][] = [];
        rawCandlesArrayArray.forEach((rawCandleArray: number[][]) => {
            if (rawCandleArray.length < 5) return;
            let candles: Candle[] = [];
            rawCandleArray.forEach((rawCandle: number[]) => {
                if (rawCandleArray.length < 5) return;
                candles.push(new Candle(null, null, null, null, rawCandle[0], rawCandle[3], rawCandle[1], rawCandle[2], rawCandle[4]))
            });
            predictedCandles.push(candles);
        });

        setPredictedCandles(predictedCandles);
    }
    const handleSetRealCandles = (rawCandles: number[][]) => {
        if (rawCandles.length < 5) return;
        let realCandles: Candle[] = [];
        rawCandles.forEach((rawCandle: number[]) => {
            realCandles.push(new Candle(null, null, null, null, rawCandle[0], rawCandle[3], rawCandle[1], rawCandle[2], rawCandle[4]))
        });
        setRealCandles(realCandles);
    }


    const postAnalytics = async () => {
        try {
            const response = await fetch('http://localhost:5000/train_and_analyze', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const predictedCandles: Candle[] = [];
            const realCandles: Candle[] = [];

            responseData.prediction.forEach((rawCandle: number[]) => {
                if (rawCandle.length < 5) return;

                predictedCandles.push(new Candle(null, null, null, null, rawCandle[0], rawCandle[3], rawCandle[1], rawCandle[2], rawCandle[4]))
            });

            responseData.y_test.forEach((rawCandle: number[]) => {
                if (rawCandle.length < 5) return;

                realCandles.push(new Candle(null, null, null, null, rawCandle[0], rawCandle[3], rawCandle[1], rawCandle[2], rawCandle[4]))
            });

            // setPredictedCandles(predictedCandles);
            setRealCandles(realCandles);

            console.log('Success:', responseData);
        } catch (error) {
            // Обработка ошибки
            console.error('Error:', error);
        }
    };

    const [predictedCandlesYOffset, setPredictedCandlesYOffset] = useState(50);

    const handleChangePredictedCandlesYOffsetSlider = (event, newValue) => {
        setPredictedCandlesYOffset(newValue);
    };


    return (
        <>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Container sx={{display: "flex", flexDirection: "column"}}>
                    <KonvaChartComponent candles={realCandles} candlesSecond={predictedCandles}
                                         secondCandlesYOffset={predictedCandlesYOffset} width={800}
                                         height={600}></KonvaChartComponent>
                </Container>
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <Slider
                        value={predictedCandlesYOffset}
                        onChange={handleChangePredictedCandlesYOffsetSlider}
                        aria-labelledby="continuous-slider"
                    />

                    <TrainerComponent handleSetRealCandles={handleSetRealCandles}
                                      handleSetPredictedCandles={handleSetPredictedCandles}
                                      predictedCandles={predictedCandles}
                                      realCandles={realCandles}/>
                </Container>


            </div>
        </>
    )
}

export default App
