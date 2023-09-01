import axios from "axios";
import {Box, Button, FormGroup, FormHelperText, TextField, Typography} from "@mui/material";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useState} from "react";
import uuid from 'react-uuid';

export default function AddShelf() {
    const [shelfName, setShelfName] = useState<string>("")
    const [shelfLocation, setShelfLocation] = useState<string>("")
    const [rowAmount, setRowAmount] = useState<number>(0)
    const [columnAmount, setColumnAmount] = useState<number>(0)


    async function postShelf() {
        try {
            const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            const reihen = rowAmount;
            const spalten = columnAmount;
            const actualCompartmentID: string[] = [];
            const shelfID = uuid();

            const compartmentPromises = [];

            for (let i = 0; i < reihen; i++) {
                const compartmentChar = alphabet[i];
                let compartmentNumber = 1;

                for (let j = 0; j < spalten; j++) {
                    const compartmentID = uuid();

                    const compartmentPromise = axios.post('/api/compartment', {
                        _id: compartmentID,
                        name: compartmentChar + compartmentNumber,
                        items: []
                    }).then(() => {
                        actualCompartmentID.push(compartmentID);
                    });
                    compartmentPromises.push(compartmentPromise);
                    compartmentNumber++;
                }
            }

            await Promise.all(compartmentPromises);

            await axios.post('/api/shelf', {
                _id: shelfID,
                name: shelfName,
                location: shelfLocation,
                compartmentIds: actualCompartmentID
            });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <FormGroup sx={{margin: '3vw'}}>
                <Box display={'flex'}
                     justifyContent={'center'}>
                    <Typography
                        fontSize={'xx-large'}>
                        Regal hinzufügen
                    </Typography>
                </Box>
                <br/>
                <TextField
                    type={'text'}
                    required={true}
                    placeholder={'Name des Regales'}
                    onChange={event => setShelfName(event.target.value)}
                />
                <FormHelperText>Vergebe deinem Regal einen individuellen Namen</FormHelperText>
                <br/>
                <TextField
                    type={'text'}
                    required={true}
                    placeholder={'Ort des Regales'}
                    onChange={event => setShelfLocation(event.target.value)}
                />
                <FormHelperText>In welchem Raum steht das Regal ?</FormHelperText>
                <br/>
                <Box
                    display={'flex'}
                    gap={'3vw'}
                    alignItems={'center'}>
                    <TextField
                        type={'number'}
                        required={true}
                        placeholder={'Reihen'}
                        sx={{width: '70vw'}}
                        onChange={event => setRowAmount(Number(event.target.value))}
                    />

                    <TableRowsIcon color={'primary'}></TableRowsIcon>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </Box>
                <FormHelperText>Wie viele Reihen hat das Regal ?</FormHelperText>
                <br/>
                <Box display={'flex'}
                     gap={'3vw'}
                     alignItems={'center'}>
                    <TextField
                        type={'number'}
                        required={true}
                        placeholder={'Spalten'}
                        sx={{width: '70vw'}}
                        onChange={event => setColumnAmount(Number(event.target.value))}
                    />
                    <ViewWeekIcon color={'primary'}></ViewWeekIcon>
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                </Box>
                <FormHelperText>Wie viele Spalten hat das Regal ?</FormHelperText>
                <br/>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}>
                    <Button variant={"contained"} color={'error'}
                            onClick={() => console.log(shelfName)}>Abbrechen</Button>
                    <Button variant={"contained"} onClick={postShelf}>Regal erstellen</Button>
                </Box>
            </FormGroup>
        </>
    )

}