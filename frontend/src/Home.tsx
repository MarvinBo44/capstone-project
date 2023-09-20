import {Box, Button, ThemeProvider, createTheme, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";

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

    return (
        <>
            <Box bgcolor={'#646E78'} padding={'20px'}>
                <Typography textAlign={"center"} variant={"h3"} color={"white"} paddingTop={'10px'}>find my
                    stuff</Typography>
                <Typography textAlign={"center"} variant={"h6"} color={"white"}>made for IKEA Kallax</Typography>
            </Box>

            <br/>
            <br/>

            <SearchBar></SearchBar>

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
                    <Box key={shelfItem._id}
                         margin={'10px'}>
                        <Box display={'flex'} justifyContent={"space-evenly"}>
                            <Typography bgcolor={"#CBE2D8"}
                                        width={"fit-content"}
                                        color={'#545454'}
                                        padding={"10px"}
                                        borderRadius={"10px"}>
                                {shelfItem.name}
                            </Typography>
                            <Typography
                                bgcolor={"#E4DCB4"}
                                width={"fit-content"}
                                color={'#545454'}
                                padding={"10px"}
                                borderRadius={"10px"}
                            >
                                {shelfItem.location}
                            </Typography>
                        </Box>

                        <br/>

                        <Box display={"flex"} flexWrap={"wrap"} border={'2px solid #545454'}>
                            {apiResponseCompartment.map((compartmentItem: Compartment) => {
                                if (shelfItem.compartmentIds.includes(compartmentItem._id)) {
                                    const compartmentName = compartmentItem.name;

                                    return <Box key={compartmentItem._id}
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
                    <Button onClick={() => nav("/addShelf")}
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
