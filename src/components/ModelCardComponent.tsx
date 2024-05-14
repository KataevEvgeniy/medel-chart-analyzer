import {Button, Container, TextField, Typography} from "@mui/material";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import React, {useState} from "react";
import {Analyzer} from "./Analyzer.ts";

interface ModelCardComponentProps {
    model: string;
    handleAnalyze: () => void;
}


export const ModelCardComponent: React.FC<ModelCardComponentProps> = ({model, handleAnalyze}) => {

    const [lookback, setLookback] = useState(5);
    const [epochs, setEpochs] = useState(50);
    const [batchSize, setBatchSize] = useState(32);


    const analyze = () => {
        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: JSON.stringify({model_name: model}),
            headers: {'Content-Type': 'application/json',},
        }).then(response => {
            response.json().then(data => {
                return data;
            })

        })
    }

    const train = () => {
        fetch('http://localhost:5000/train', {
            method: 'POST',
            body: JSON.stringify({model_name: model, lookback: lookback, epochs: epochs, batch_size: batchSize}),
            headers: {'Content-Type': 'application/json',},
        }).then(response => {
            response.json().then(data => {
                return data;
            })

        })
    }


    return (
        <>
            <div>
                <Container sx={{
                    borderRadius: '10px',
                    backgroundColor: 'lightgrey.200',
                    p: 2,
                    m: 1,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 2,
                    justifyContent: 'space-between'
                }}>
                    <Container sx={{

                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'space-between'
                    }}>
                        <Typography sx={{
                            border: 1,
                            borderRadius: '50px',
                            borderColor: 'orange',
                            mr: 1,
                            px: 2,
                            py: 1
                        }}>{model}</Typography>
                        <Button variant="contained" startIcon={<BatchPredictionIcon/>}>Predict</Button>
                        <Button variant="contained" startIcon={<AnalyticsIcon/>} onClick={analyze}>Analytics</Button>
                    </Container>
                </Container>
                <Container sx={{
                    borderRadius: '10px',
                    backgroundColor: 'lightgrey.200',
                    p: 2,
                    m: 1,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 2,
                    justifyContent: 'space-between'
                }}>
                    <Button variant="contained" startIcon={<ModelTrainingIcon/>} onClick={train} >Тренировать</Button>
                    <TextField
                        label="Lookback"
                        value={lookback}
                        sx={{mt: 1}}
                        onChange={(e) => setLookback(parseInt(e.target.value))}
                        type="number"
                    />
                    <TextField
                        label="Epochs"
                        value={epochs}
                        sx={{mt: 1}}
                        onChange={(e) => setEpochs(parseInt(e.target.value))}
                        type="number"
                    />
                    <TextField
                        label="Batch Size"
                        value={batchSize}
                        sx={{mt: 1}}
                        onChange={(e) => setBatchSize(parseInt(e.target.value))}
                        type="number"
                    />
                </Container>
            </div>
        </>
    );
};