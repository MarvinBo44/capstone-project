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
    let [counter, setCounter] = useState<number>(0)
    const router = useParams<string>();
    const routerId = router.id;
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get("/api/OneCompartment/" + routerId)
            .then((response) => {
                setItemList(response.data);
            })
    }, [counter, routerId]);

    function getColor() {
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
                         gap={'10%'}>

                        <Box width={'60%'}
                             display={'flex'}
                             alignItems={"center"}
                             padding={'5px'}
                             bgcolor={'' + getColor()}
                             borderRadius={'15px'}
                             justifyContent={'center'}>
                            <Typography variant={"body1"}>{item.name}</Typography>
                        </Box>

                        <Box width={'30%'}
                             textAlign={'center'}
                             padding={'5px'}
                             bgcolor={'' + getColor()}
                             borderRadius={'15px'}>
                            <Typography>{item.amount}</Typography>
                        </Box>

                        <Box><Button onClick={() => {
                            axios.put(("/api/test/46853107-e934-f106-1cb0-76060ae3e075/1")).then(() => setCounter(counter++))
                        }}>+</Button></Box>
                    </Box>
                )
            })}
        </>
    )
}