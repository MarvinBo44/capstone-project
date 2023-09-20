import axios from "axios";
import {Box, Button, createTheme, FormGroup, TextField, ThemeProvider, Typography} from "@mui/material";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import TableRowsIcon from '@mui/icons-material/TableRows';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {FormEvent, useState} from "react";
import uuid from 'react-uuid';
import {useNavigate} from "react-router-dom";

export default function AddShelf() {
    const [shelfName, setShelfName] = useState<string>("")
    const [shelfLocation, setShelfLocation] = useState<string>("")
    const [rowAmount, setRowAmount] = useState<number>(0)
    const [columnAmount, setColumnAmount] = useState<number>(0)

    const [shelfNameError, setShelfNameError] = useState<boolean>(false)
    const [shelfLocationError, setShelfLocationError] = useState<boolean>(false)
    const [rowAmountError, setRowAmountError] = useState<boolean>(false)
    const [columnAmountError, setColumnAmountError] = useState<boolean>(false)

    const nav = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#CBE2D8',
            },
            secondary: {
                main: '#ffc2d1',
            },
            info:{
                main: '#646E78'
            }
        },
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let hasError = false;

        if (shelfName === "") {
            setShelfNameError(true);
            hasError = true;
        } else {
            setShelfNameError(false);
        }

        if (shelfLocation === "") {
            setShelfLocationError(true);
            hasError = true;
        } else {
            setShelfLocationError(false);
        }

        if (rowAmount === 0 || rowAmount > 5) {
            setRowAmountError(true);
            hasError = true;
        } else {
            setRowAmountError(false);
        }

        if (columnAmount === 0 || columnAmount > 5) {
            setColumnAmountError(true);
            hasError = true;
        } else {
            setColumnAmountError(false);
        }

        if (!hasError) {
            postShelf().then(r => console.log(r));
            resetAllInputFields();
        }
    }

    async function postShelf() {
        try {
            const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            const reihen = rowAmount;
            const spalten = columnAmount;
            const actualCompartmentID: string[] = [];
            const shelfID = uuid();

            const actualCompartment = [];

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
                    actualCompartment.push(compartmentPromise);
                    compartmentNumber++;
                }
            }

            await Promise.all(actualCompartment);

            await axios.post('/api/shelf', {
                _id: shelfID,
                name: shelfName,
                location: shelfLocation,
                compartmentIds: actualCompartmentID
            }).then(resetAllInputFields).then(() => nav('/'))
        } catch (error) {
            console.error(error);
        }
    }

    function resetAllInputFields() {
        setShelfName("");
        setShelfLocation("");
        setRowAmount(0);
        setColumnAmount(0);
    }

    function cancel() {
        resetAllInputFields();
        nav('/');
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box height={'100vh'}
                     display={'flex'}
                     flexDirection={'column'}
                     justifyContent={"center"}
                     alignItems={'center'}
                     gap={'5vh'}>
                    <form onSubmit={submit}  autoComplete={'off'}>
                        <FormGroup sx={{margin: '5vw'}}>
                            <Box display={'flex'}
                                 maxWidth={'800px'}
                                 justifyContent={'center'}>
                                <Typography
                                    fontSize={'xx-large'}>
                                    Regal hinzufügen
                                </Typography>
                            </Box>
                            <br/>
                            <TextField
                                type={'text'}
                                error={shelfNameError}
                                placeholder={'Name des Regales'}
                                onChange={event => setShelfName(event.target.value)}
                            />
                            <br/>
                            <TextField
                                type={'text'}
                                error={shelfLocationError}
                                placeholder={'Ort des Regales'}
                                onChange={event => setShelfLocation(event.target.value)}
                            />
                            <br/>
                            <Box
                                display={'flex'}
                                maxWidth={'800px'}
                                gap={'3vw'}
                                alignItems={'center'}
                                justifyContent={"space-between"}>
                                <TextField
                                    type={'number'}
                                    error={rowAmountError}
                                    placeholder={'Anzahl an Reihen (max. 5)'}
                                    sx={{width: '75vw'}}
                                    onChange={event => setRowAmount(Number(event.target.value))}
                                />

                                <TableRowsIcon color={'info'}></TableRowsIcon>
                            </Box>
                            <br/>
                            <Box display={'flex'}
                                 maxWidth={'800px'}
                                 gap={'3vw'}
                                 alignItems={'center'}
                                 justifyContent={"space-between"}>
                                <TextField
                                    type={'number'}
                                    error={columnAmountError}
                                    placeholder={'Anzahl an Spalten (max. 5)'}
                                    sx={{width: '75vw'}}
                                    onChange={event => setColumnAmount(Number(event.target.value))}
                                />
                                <ViewWeekIcon color={'info'}></ViewWeekIcon>
                            </Box>
                            <br/>
                            <Box
                                display={'flex'}
                                maxWidth={'800px'}
                                justifyContent={'space-between'}>
                                <Button variant={"contained"}
                                        color={'secondary'}
                                        onClick={cancel}>Abbrechen</Button>

                                <Button variant={"contained"} type={"submit"}>Regal erstellen</Button>
                            </Box>
                        </FormGroup>
                    </form>
                </Box>
            </ThemeProvider>
        </>
    )
}