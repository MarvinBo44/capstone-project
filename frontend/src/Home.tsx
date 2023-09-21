import {Box, Button, ThemeProvider, createTheme, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import logo from './assets/logo.png'

type Shelf = {
    _id: string;
    name: string;
    location: string;
    compartmentIds: string[];
};

type Compartment = {
    _id: string;
    name: string;
    items: [];
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#646E78',
        },
        secondary: {
            main: '#E0C2FF',
        },
    },
});


export default function Home() {
    const nav = useNavigate();
    const [apiResponseShelf, setApiResponseShelf] = useState<Shelf[]>([]);
    const [apiResponseCompartment, setApiResponseCompartment] = useState<Compartment[]>([]);

    useEffect(() => {
        axios
            .get<Compartment[]>("/api/compartment")
            .then((response) => {
                const sortedCompartments = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setApiResponseCompartment(sortedCompartments);
            })
            .then(() =>
                axios
                    .get<Shelf[]>("/api/shelf")
                    .then((response) => {
                        setApiResponseShelf(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            );
    }, []);

    const stringToColor = (str: string, saturation = 40, lightness = 85) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
    };

    return (
        <>
            <Box bgcolor={'#646E78'}>
                <Box bgcolor={'transparent'} display={'flex'} justifyContent={'center'} p={'20px'}>
                    <img src={logo} alt={'logo'} width={'80%'}/>
                </Box>
            </Box>

            <br/>
            <br/>

            <SearchBar></SearchBar>

            <br/>
            <br/>

            {apiResponseShelf.map((shelfItem: Shelf) => {
                let counterCompartmentStartsWithA: number = 0;

                { // counts how many Compartments starts with 'A'
                    apiResponseCompartment.map((compartmentItem: Compartment) => {
                        if (shelfItem.compartmentIds.includes(compartmentItem._id)) {
                            const compartmentName = compartmentItem.name;

                            if (compartmentName.startsWith("A")) {
                                counterCompartmentStartsWithA++;
                            }
                            return null;
                        }
                    })
                }

                return (
                    <Box key={shelfItem._id} // shelf name
                         margin={'10px'}>
                        <Box display={'flex'} justifyContent={"space-evenly"}>
                            <Typography bgcolor={"" + stringToColor(shelfItem.name)}
                                        width={"fit-content"}
                                        color={'#545454'}
                                        padding={"10px"}
                                        borderRadius={"10px"}>
                                {shelfItem.name}
                            </Typography>

                            <Typography // shelf location
                                bgcolor={"" + stringToColor(shelfItem.location)}
                                width={"fit-content"}
                                color={'#545454'}
                                padding={"10px"}
                                borderRadius={"10px"}>
                                {shelfItem.location}
                            </Typography>
                        </Box>

                        <br/>

                        <Box display={"flex"} flexWrap={"wrap"} border={'2px solid #545454'}>
                            {apiResponseCompartment.map((compartmentItem: Compartment) => {
                                if (shelfItem.compartmentIds.includes(compartmentItem._id)) {
                                    const compartmentName = compartmentItem.name;

                                    return <Box key={compartmentItem._id} // compartments
                                                flexBasis={(100 / counterCompartmentStartsWithA) + "%"}>
                                        <Button sx={{borderRadius: 0, borderColor: '#545454', color: '#545454'}}
                                                variant={"outlined"}
                                                fullWidth={true}
                                                onClick={() => nav('/id/' + compartmentItem._id + '/' + compartmentItem.name + '/' + shelfItem.name + '/' + shelfItem.location)}>
                                            {compartmentName}
                                        </Button>
                                    </Box>;
                                } else {
                                    return null;
                                }
                            })}
                        </Box>
                        <br/>
                        <br/>
                    </Box>
                );
            })}
            <br/>
            <Box display={"flex"}
                 justifyContent={"center"}>
                <ThemeProvider theme={theme}>
                    <Button onClick={() => nav("/addShelf")} // add shelf button
                            color={'primary'}
                            variant={"contained"}>
                        Regal hinzufügen
                    </Button>
                </ThemeProvider>
            </Box>
            <br/>
            <br/>
            <br/>
        </>
    );
}
