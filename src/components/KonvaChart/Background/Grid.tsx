import React, {useState, useEffect, useRef} from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import Konva from "konva";

interface GridProps {
    width: number;
    height: number;
    gridSize: number;
    position: { x: number; y: number };

}

export const Grid = ({ width, height, gridSize ,position, scale }) => {
    const [grid, setGrid] = useState([]);
    const layerRef = useRef<Konva.Layer>(null);


    useEffect(() => {

        let leftTopCornerPos = {x: -position.x, y: -position.y};

        const newGrid = [];
        for (let i = leftTopCornerPos.x - leftTopCornerPos.x%gridSize; i <= width + leftTopCornerPos.x; i += gridSize) {
            newGrid.push(
                <Line
                    key={`vertical_${i}`}
                    points={[i, leftTopCornerPos.y, i, height+ leftTopCornerPos.y]}
                    stroke="lightgray"
                    strokeWidth={1}
                />
            );
        }
        for (let j = leftTopCornerPos.y - leftTopCornerPos.y%gridSize; j <= height + leftTopCornerPos.y; j += gridSize) {
            newGrid.push(
                <Line
                    key={`horizontal_${j}`}
                    points={[leftTopCornerPos.x, j, width + leftTopCornerPos.x, j]}
                    stroke="lightgray"
                    strokeWidth={1}
                />
            );
        }
        setGrid(newGrid);
    }, [width, height, gridSize, position,scale]);

    return (
        <Layer ref={layerRef}>
            {grid}
        </Layer>
    );
};