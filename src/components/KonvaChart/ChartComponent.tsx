import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Layer, Rect, Stage, Line} from "react-konva";
import Konva from "konva";
import {PriceSidebarComponent} from "./Sidebar/PriceSidebarComponent.tsx";
import {Candle} from "./Candles/CandlesComponent.tsx";
import {Grid} from "./Background/Grid.tsx";
import KonvaEventObject = Konva.KonvaEventObject;
import MouseTracker from "./Mouse/MouseTracker.tsx";
import {CandlesComponent} from "./Candles/CandlesComponent.tsx";
import {priceToCoords} from "./Utils/CoordConvertor.ts";
import {MultiCandlesComponent} from "./Candles/MultiCandlesComponent.tsx";


interface ChartComponentProps {
    candles: Candle[];
    candlesSecond: Candle[][];
    secondCandlesYOffset:number;
    width:number;
    height:number;
}



export const ChartComponent : React.FC<ChartComponentProps> = ({candles,candlesSecond,secondCandlesYOffset,width,height}) => {

    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>(null);

    const [position, setPosition] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [scale, setScale] = useState<{scaleX:number,scaleY:number}>({scaleX:1,scaleY:1});
    const [priceStep,setPriceStep] = useState<number>(10000);// 100 coordinate = 1 price


    // const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    //         e.evt.preventDefault();
    //
    //     const scaleBy = 1.1;
    //
    //     const stage = stageRef.current;
    //     const layer = layerRef.current;
    //     if (stage == null || layer == null) return;
    //
    //     const oldScale = layer.scaleX();
    //     const pointer = stage.getPointerPosition();
    //
    //     if (!pointer) return;
    //
    //     const mousePointTo = {
    //         x: (pointer.x - layer.x()) / oldScale,
    //         y: (pointer.y - layer.y()) / oldScale,
    //     };
    //
    //     const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    //
    //     layer.scale({ x: newScale, y: newScale });
    //
    //     const newPos = {
    //         x: pointer.x - mousePointTo.x * newScale,
    //         y: pointer.y - mousePointTo.y * newScale,
    //     };
    //
    //     layer.position(newPos);
    //     layer.batchDraw();
    //
    //     setScale({ scaleX: newScale, scaleY: newScale });
    //
    //
    //     }, [stageRef]);
    //

    // useEffect(() => {
    //     const stage = stageRef.current;
    //     if (stage) {
    //         stage.on('wheel', handleWheel);
    //     }
    //
    //     return () => {
    //         if (stage) {
    //             stage.off('wheel', handleWheel);
    //         }
    //     };
    // }, [handleWheel, stageRef]);

    //Перемещение к началу графика при получении новых данных
    useEffect(() => {
        if(candles.length == 0) return;
        console.log({x:0, y: -priceToCoords(candles[0].open,priceStep)})
        setPosition({x:0, y: -priceToCoords(candles[0].open,priceStep)})
    }, [candles,candlesSecond]);

    useEffect(() => {
        let stage = stageRef.current;
        stage.x(position.x);
        stage.y(position.y);
    }, [position]);

     const handleDrag = (e : KonvaEventObject<DragEvent>) => {
        setPosition({x: e.target.x(), y: e.target.y()})
     }

    const handleMouseMove = (e:Konva.KonvaEventObject<MouseEvent>) => {
        setMousePos({ x: e.evt.x - position.x , y:  e.evt.y -position.y  });
    };

     const [mousePos, setMousePos] = useState<{ x: number; y: number }>({x: 0, y: 0});


    return (
            <div style={{display: "flex"}}>
            <Stage
                ref={stageRef}
                width={width}
                height={height}
                className={"outline"}
                draggable
                onDragMove={handleDrag}
                onMouseMove={handleMouseMove}
            >
                <MouseTracker position={mousePos} priceStep={priceStep}></MouseTracker>
                <Grid width={width} height={height} gridSize={30} position={position} scale={scale} ></Grid>
                <Layer ref={layerRef} >
                    <Rect x={0} y={0} width={100} height={100} fill={'red'}  onClick={()=>{
                    }}/>
                    <CandlesComponent yOffset={0} priceStep={priceStep} candles={candles} position={position}></CandlesComponent>
                    <MultiCandlesComponent yOffset={secondCandlesYOffset} priceStep={priceStep} candlesArrayOfArrays={candlesSecond} position={position}></MultiCandlesComponent>
                </Layer>

            </Stage>

            {/*<PriceSidebarComponent height={height} width={50} ySpacing={30} position={position}></PriceSidebarComponent>*/}
            </div>
    );
};