import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function CompartmentList() {
    type Item = {
        _id: string,
        name: string,
        amount: string
    };

    const [itemList, setItemList] = useState<Item[]>([]);
    const [counter, setCounter] = useState<number>(0)
    const router = useParams<string>();
    const routerId = router.id;
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get("/api/OneCompartment/" + routerId)
            .then((response) => {
                setItemList(response.data);
            })
    }, [routerId, counter]);

    function getRandomPastelColor() {
        return "hsl(" + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)'
    }

    return (
        <>
            <Box display={'flex'} justifyContent={"center"}>
                <Button
                    variant={"contained"}
                    size={'large'}
                    onClick={() => nav('/')}>
                    <ArrowLeftIcon/>Home
                </Button>
            </Box>

            <br/>
            <br/>
            {itemList.map((item: Item) => {
                return (

                    <Box key={item._id}
                         display={'flex'}
                         margin={'5vw'}
                         gap={'2%'}>

                        <Box width={'60%'}
                             display={'flex'}
                             alignItems={"center"}
                             padding={'5px'}
                             bgcolor={'' + getRandomPastelColor()}
                             borderRadius={'15px'}
                             justifyContent={'center'}>
                            <Typography variant={"body1"}>{item.name}</Typography>
                        </Box>

                        <Box width={'30%'}
                             textAlign={'center'}
                             padding={'5px'}
                             bgcolor={'' + getRandomPastelColor()}
                             borderRadius={'15px'}>
                            <Typography>{item.amount}</Typography>
                        </Box>

                        <Box>
                            <Button variant={'outlined'}
                                    sx={{borderRadius: '15px'}}
                                    onClick={() => {
                                        axios.put(("/api/plus/"+ routerId +"/" + item._id)).then(() => setCounter(counter + 1))}}>
                                +
                            </Button>
                        </Box>
                        <Box>
                            <Button variant={'outlined'}
                                    sx={{borderRadius: '15px'}}
                                    onClick={() => {
                                        axios.put(("/api/minus/"+ routerId +"/" + item._id)).then(() => setCounter(counter - 1))}}>
                                -
                            </Button>
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}