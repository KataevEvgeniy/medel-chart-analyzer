import {useEffect, useState} from "react";
import {
    Button, Container,
    Typography
} from "@mui/material";

import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import {toast} from "react-toastify";
import {Candle} from "./KonvaChart/Candles/CandlesComponent.tsx";
import {ModelCardComponent} from "./ModelCardComponent.tsx";
import {Analyzer} from "./Analyzer.ts";

interface TrainerComponentProps{
    handleSetPredictedCandles: (predictedRawCandles: number[][][])=>void;
    handleSetRealCandles: (realRawCandles: number[][])=>void;
    predictedCandles:Candle[][];
    realCandles:Candle[];
}
export const TrainerComponent: React.FC<TrainerComponentProps> = ({handleSetPredictedCandles,handleSetRealCandles,predictedCandles,realCandles}) => {

    const [modelList, setModelList] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');

    const handleLoadModelList = () => {
        fetch('http://localhost:5000/list_models', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',},
        }).then(response => {
            response.json().then(data => {
                data.models.sort((a,b)=>parseInt(a) < parseInt(b) ? 1 : -1)
                setModelList(data.models)
            })

        })

    }


    useEffect(() => {
        handleLoadModelList();
    }, []);


    const handleAnalyze = () => {
        const analyzer = new Analyzer(predictedCandles, realCandles);
        console.log(analyzer.getAnalytic())
    }

    const predictModel = (model: string) => {
        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({model_name: model})
        }).then(response => {
            response.json().then(data => {
                console.log(data)
                handleSetPredictedCandles(data.prediction);
                handleSetRealCandles(data.y_test);
            })
        })
    }

    const runModelSearch = () =>{
        fetch('http://localhost:5000/search_model', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
        }).then(response => {
            console.log(response)
        })
    }

    const runAnalyzeSerchedModels = () =>{
        fetch('http://localhost:5000/analyze_searched_models', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
        }).then(response => {
            console.log(response)
        })
    }



    return (
        <>
            <Container sx={{display:"flex",flexDirection:"column"}} >
                <Button variant={"contained"} onClick={runModelSearch}>Run Model Search</Button>
                <Button variant={"contained"} onClick={runAnalyzeSerchedModels}>Анализировать модели</Button>
                <ModelCardComponent model={selectedModel} handleAnalyze={handleAnalyze}/>
                <Typography variant="h3" >Модели</Typography>
                {modelList.map((model: string, index: number) => (
                    <Container key={index} onClick={() => setSelectedModel(model)} sx={{borderRadius: '10px', backgroundColor: 'lightgrey.200', p: 2, m: 1, display: "flex", flexDirection: "row",boxShadow: 2,justifyContent: 'space-between'}}  >
                        <Typography sx={{border:1, borderRadius:'50px',borderColor:'orange',mr:1,px:2,py:1}} >{model}</Typography>
                        <div>
                            <Button variant="outlined" endIcon={<BatchPredictionIcon/>}  onClick={() => predictModel(model)}>Предсказать</Button>
                        </div>
                    </Container>
                ))}
            </Container>
        </>
    );
};