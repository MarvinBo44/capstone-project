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
    const [counter, setCounter] = useState<number>(0);
    const router = useParams();
    const compartmentId = router.compartmentId;
    const compartmentName = router.compartmentName;
    const shelfName = router.shelfName;
    const shelfLocation = router.shelfLocation;
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get("/api/OneCompartment/" + compartmentId)
            .then((response) => {
                setItemList(response.data);
            })
    }, [compartmentId, counter]);

    const stringToColor = (str: string, saturation = 65, lightness = 85) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
    };

    return (
        <>
            <Box display={'flex'}
                 justifyContent={"space-around"}>
                <Button
                    variant={"contained"}
                    sx={{borderRadius: '15px'}}
                    onClick={() => nav('/')}>
                    <ArrowLeftIcon/>Home
                </Button>
                <Button variant={'contained'}
                        sx={{borderRadius: '15px'}}
                        onClick={() => nav("/addItem/" + compartmentId + "/" + compartmentName + "/" + shelfName + "/" + shelfLocation)}>
                    Gegenstand hinzufügen
                </Button>
            </Box>

            <br/>
            <br/>

            <Box>
                <Typography>{compartmentName}</Typography>
                <Typography>{shelfName}</Typography>
                <Typography>{shelfLocation}</Typography>
            </Box>
            {itemList.map((item: Item) => {
                return (
                    <Box key={item._id}>
                        <Box
                            display={'flex'}
                            margin={'5vw'}
                            gap={'2%'}>

                            <Box width={'60%'} // name of item
                                 display={'flex'}
                                 alignItems={"center"}
                                 padding={'5px'}
                                 bgcolor={'' + stringToColor(item.name)}
                                 borderRadius={'15px'}
                                 justifyContent={'center'}>
                                <Typography variant={"body1"}>{item.name}</Typography>
                            </Box>

                            <Box width={'30%'} // amount of items
                                 textAlign={'center'}
                                 padding={'5px'}
                                 bgcolor={'' + stringToColor(item._id)}
                                 borderRadius={'15px'}>
                                <Typography>{item.amount}</Typography>
                            </Box>

                            <Button variant={'outlined'} // plus button
                                    size={'small'}
                                    sx={{borderRadius: '15px'}}
                                    onClick={() => {
                                        axios.put(("/api/plus/" + compartmentId + "/" + item._id))
                                            .then(() => setCounter(counter + 1))
                                    }}>
                                +
                            </Button>

                            <Button variant={'outlined'} // minus button
                                    size={'small'}
                                    sx={{borderRadius: '15px'}}
                                    onClick={() => {
                                        axios.put(("/api/minus/" + compartmentId + "/" + item._id))
                                            .then(r => console.log(r))
                                            .then(() => setCounter(counter - 1))

                                    }}>
                                -
                            </Button>

                            <Button variant={'outlined'} // delete
                                    sx={{borderRadius: '15px'}}
                                    onClick={() => {
                                        axios.delete("/api/delete/" + compartmentId + "/" + item._id)
                                            .then(r => {
                                                console.log(r);
                                            setCounter(counter + 1)})
                                    }}>
                                delete
                            </Button>
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}