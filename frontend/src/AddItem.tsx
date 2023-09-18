import axios from "axios";
import {Box, Button, TextField, Typography} from "@mui/material";
import {FormEvent, useState} from "react";
import uuid from "react-uuid";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './AddItem.css'
import {useNavigate, useParams} from "react-router-dom";

export default function AddItem() {
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const nav = useNavigate()
    const router = useParams<string>();
    const compartmentId = router.compartmentId;
    const compartmentName = router.compartmentName;
    const shelfName = router.shelfName;
    const shelfLocation = router.shelfLocation;

    const [nameError, setNameError] = useState<boolean>(false)
    const [amountError, setAmountError] = useState<boolean>(false)

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let hasError = false;

        if (name === "") {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

        if (amount <= 0) {
            setAmountError(true);
            hasError = true;
        } else {
            setAmountError(false);
        }

        if (!hasError) {
            axiosPost();
        }
    }

    function axiosPost() {
        axios.post(("/api/add/" + compartmentId), {
            _id: uuid(),
            name: name,
            amount: amount
        }).then(r => {
            console.log(r);
            resetAllFields();
            nav("/id/" + compartmentId + "/" + compartmentName + "/" + shelfName + "/" + shelfLocation);
        })
    }

    function resetAllFields() {
        setName("");
        setAmount(0);
    }

    return (
        <>
            <form onSubmit={submit}>
                <Box height={'100vh'}
                     display={'flex'}
                     flexDirection={'column'}
                     justifyContent={"center"}
                     alignItems={'center'}
                     gap={'5vh'}>

                    <Box>
                        <Typography
                            textAlign={'center'}
                            variant={'h5'}>
                            Gegendstand hinzufügen
                        </Typography>
                    </Box>

                    <Box display={"flex"} justifyContent={'center'} maxWidth={'800px'}>
                        <TextField
                            placeholder={'Name'}
                            error={nameError}
                            fullWidth={true}
                            sx={{width: '80vw'}}
                            type={'text'}
                            onChange={event => setName(event.target.value)}>
                        </TextField>
                    </Box>

                    <Box display={"flex"} justifyContent={'center'} maxWidth={'800px'}>
                        <TextField
                            placeholder={'Anzahl'}
                            error={amountError}
                            fullWidth={true}
                            sx={{width: '80vw'}}
                            type={"number"}
                            onChange={event => setAmount(parseInt(event.target.value))}>
                        </TextField>
                    </Box>

                    <Box display={"flex"} justifyContent={'space-evenly'} gap={'20vw'} maxWidth={'800px'}>
                        <Button variant={'contained'}
                                color={'error'}
                                sx={{borderRadius: '15px'}}
                                onClick={() => nav('/')}>
                            Abbruch
                        </Button>
                        <Button variant={'contained'}
                                sx={{borderRadius: '15px'}}
                                type={"submit"}>
                            Hinzufügeen
                        </Button>
                    </Box>
                    {name === "" ? "LEER" : name}<br/>{nameError ? "error" : "NOerror"}<br/><br/>{amount}<br/>{amountError ? "error" : "NOerror"}
                    <br/><br/>
                </Box>
            </form>
        </>
    )
}