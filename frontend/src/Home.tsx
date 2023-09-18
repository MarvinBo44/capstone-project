import {Box, Button, Divider, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

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
            <Typography textAlign={"center"} variant={"h4"}>FindMyStuff</Typography>
            <Typography textAlign={"center"} variant={"h5"}>made for IKEA Kallax</Typography>

            <br/>
            <Divider></Divider>
            <br/>

            {apiResponseShelf.map((shelfItem: Shelf) => {
                let counterCompartmentStartsWithA: number = 0;

                {
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
                    <div key={shelfItem._id}>
                        <Grid container={true} justifyContent={"space-evenly"}>
                            <Typography bgcolor={"#74b9ff"}
                                        width={"fit-content"}
                                        padding={"10px"}
                                        borderRadius={"10px"}>
                                {shelfItem.name}
                            </Typography>
                            <Typography
                                bgcolor={"#81ecec"}
                                width={"fit-content"}
                                padding={"10px"}
                                borderRadius={"10px"}
                            >
                                {shelfItem.location}
                            </Typography>
                        </Grid>

                        <br/>

                        <Box display={"flex"} flexWrap={"wrap"} border={'2px solid #1A72C9FF'}>
                            {apiResponseCompartment.map((compartmentItem: Compartment) => {
                                if (shelfItem.compartmentIds.includes(compartmentItem._id)) {
                                    const compartmentName = compartmentItem.name;

                                    return <Box key={compartmentItem._id} flexBasis={100 / counterCompartmentStartsWithA + "%"}>
                                        <Button sx={{borderRadius: 0, borderColor: '#1A72C9FF'}}
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
                    </div>
                );
            })}

            <br/>
            <Box display={"flex"} justifyContent={"center"}>
                <Button onClick={() => nav("/addShelf")} variant={"contained"}>
                    Regal hinzufügen
                </Button>
            </Box>
        </>
    );
}
