import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Button, createTheme, Typography, ThemeProvider, Grow} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import SettingsIcon from '@mui/icons-material/Settings';

export default function CompartmentList() {
    type Item = {
        _id: string,
        name: string,
        amount: string
    };

    const [itemList, setItemList] = useState<Item[]>([]);
    const [counter, setCounter] = useState<number>(0);
    const [showSettings, setShowSettings] = useState(false);

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

    const stringToColor = (str: string, saturation = 40, lightness = 85) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#646E78',
            },
            secondary: {
                main: '#f7f7f7',
            },
        },
    });

    return (
        <>
            <Box marginTop={'15vh'}
                 marginBottom={'12vh'}>
                <ThemeProvider theme={theme}>
                    {itemList.map((item: Item) => {
                        return (
                            <Box key={item._id}>
                                <Box
                                    display={'flex'}
                                    maxWidth={'800px'}
                                    marginTop={'5vw'}
                                    marginLeft={'5vw'}
                                    marginRight={'5vw'}
                                    marginBottom={'2vw'}
                                    gap={'2%'}>

                                    <Box width={'80%'} // name of item
                                         display={'flex'}
                                         alignItems={"center"}
                                         padding={'5px'}
                                         bgcolor={'' + stringToColor(item.name)}
                                         borderRadius={'15px'}
                                         justifyContent={'center'}>
                                        <Typography variant={"body1"}>{item.name}</Typography>
                                    </Box>

                                    <Box width={'20%'} // amount of items
                                         textAlign={'center'}
                                         padding={'5px'}
                                         bgcolor={'' + stringToColor(item._id)}
                                         borderRadius={'15px'}>
                                        <Typography>{item.amount}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{display: 'flex'}}>
                                    <Grow // Settings
                                        in={showSettings}
                                        appear={false} //disable entering with 'enter' button
                                        style={{transformOrigin: '100 100 100'}}
                                        {...(showSettings ? {timeout: 1000} : {})}
                                    >
                                        <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'}>
                                            <Button variant={'outlined'} // plus button
                                                    style={{maxHeight: '30px', minHeight: '30px'}}
                                                    sx={{borderRadius: '15px'}}
                                                    onClick={() => {
                                                        axios.put(("/api/plus/" + compartmentId + "/" + item._id))
                                                            .then(() => setCounter(counter + 1))
                                                    }}>
                                                +
                                            </Button>

                                            <Button variant={'outlined'} // minus button
                                                    style={{maxHeight: '30px', minHeight: '30px'}}
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
                                                    size={'small'}
                                                    onClick={() => {
                                                        axios.delete("/api/delete/" + compartmentId + "/" + item._id)
                                                            .then(r => {
                                                                console.log(r);
                                                                setCounter(counter + 1)
                                                            })
                                                    }}>
                                                delete
                                            </Button>
                                        </Box>
                                    </Grow>
                                </Box>
                                <br/>
                            </Box>
                        )
                    })}

                    <Box display={'flex'} // menubar bottom
                         width={"100%"}
                         boxSizing={"border-box"}
                         position={"fixed"}
                         top={0}
                         bgcolor={'#646E78'}
                         padding={'20px'}
                         justifyContent={"space-around"}
                         alignItems={"center"}>

                        <Typography // shelf name
                            width={"fit-content"}
                            color={'secondary'}
                            padding={"10px"}
                            fontWeight={'bold'}
                            borderRadius={"10px"}>
                            {shelfName}
                        </Typography>

                        <Typography // compartment name
                            fontWeight={'bold'}
                            width={"fit-content"}
                            color={'secondary'}
                            padding={"10px"}
                            borderRadius={"10px"}>
                            {compartmentName}
                        </Typography>

                        <Typography // shelf location
                            fontWeight={'bold'}
                            width={"fit-content"}
                            color={'secondary'}
                            padding={"10px"}
                            borderRadius={"10px"}>
                            {shelfLocation}
                        </Typography>

                        <Button variant={"outlined"} // show settings button
                                sx={{borderRadius: '15px', padding: '0', height: '0', width: '0'}}
                                color={'secondary'}
                                size={"small"}
                                onClick={() => setShowSettings(!showSettings)}>
                            <SettingsIcon/>
                        </Button>
                    </Box>

                    <Box display={'flex'} // menubar bottom
                         width={"100%"}
                         boxSizing={"border-box"}
                         position={"fixed"}
                         bottom={0}
                         bgcolor={'#646E78'}
                         padding={'20px'}
                         justifyContent={"space-around"}>
                        <Button
                            variant={"outlined"} // home button
                            sx={{borderRadius: '15px'}}
                            onClick={() => nav('/')}
                            color={'secondary'}>
                            <ArrowLeftIcon/>Home
                        </Button>
                        <Button variant={'outlined'} // add Item button
                                color={'secondary'}
                                sx={{borderRadius: '15px'}}
                                onClick={() => nav("/addItem/" + compartmentId + "/" + compartmentName +
                                    "/" + shelfName + "/" + shelfLocation)}>
                            Gegenstand hinzufügen
                        </Button>
                    </Box>
                </ThemeProvider>
            </Box>
        </>
    )
}