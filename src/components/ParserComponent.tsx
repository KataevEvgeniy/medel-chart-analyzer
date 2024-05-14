import React, { ChangeEvent, useState } from 'react';
import Papa from 'papaparse';
import {Candle} from "./KonvaChart/Candles/CandlesComponent.tsx";

interface ParserComponentProps{
    sendData : (data:Candle[]) => void
}

const ParserComponent: React.FC<ParserComponentProps> = ( {sendData} ) => {
    const [data, setData] = useState<Candle[]>([]);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            try {
                const parsedData = await new Promise<Candle[]>((resolve) => {
                    Papa.parse(file, {
                        header: true,
                        complete: (result) => resolve(result.data),
                        error: (error) => console.error('Error parsing CSV:', error),
                        transformHeader: (header) => {
                            // Преобразовать в нижний регистр и удалить скобки
                            return header.toLowerCase().replace(/[<>]/g, '');
                        },
                    });
                });

                sendData(parsedData)
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <h1>Your Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ParserComponent;