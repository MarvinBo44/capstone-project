import {Box, Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

type shelf = {
    _id: string,
    name: string,
    location: string,
    compartmentIds: string[];
}

type compartment = {
    _id: string,
    name: string,
    items: [];
}

export default function Home() {
    const nav = useNavigate()
    const [apiResponseShelf, setApiResponseShelf] = useState<shelf[]>([]);
    const [apiResponseCompartment, setApiResponseCompartment] = useState<compartment[]>([]);

    useEffect(() => {
        // Axios-Anfrage, um Daten von der API abzurufen
        axios.get<shelf[]>('/api/shelf')
            .then((response) => {
                setApiResponseShelf(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [apiResponseShelf]);

    useEffect(() => {
        // Axios-Anfrage, um Daten von der API abzurufen
        axios
            .get<compartment[]>("/api/compartment")
            .then((response) => {
                const sortedCompartments = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setApiResponseCompartment(sortedCompartments);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [apiResponseCompartment]);


    return (
        <>
            <h1>blablablub</h1>

            <Grid container={true}>

                {apiResponseShelf.map((shelfItem: shelf) => (<div key={shelfItem._id}>
                        <Box bgcolor={'#74b9ff'} width={'fit-content'} padding={'5px'} borderRadius={'10px'}>
                            {shelfItem.name}df
                        </Box>
                        <Box bgcolor={'#81ecec'} width={'fit-content'} padding={'5px'} borderRadius={'10px'}>
                            {shelfItem.location}
                        </Box>
                        <br/>
                        <Grid container={true}>
                            {apiResponseCompartment.map((compartmentItem: compartment) => (
                                <div key={compartmentItem._id}>
                                    {shelfItem.compartmentIds.includes(compartmentItem._id) ?
                                        <Button>{compartmentItem.name}</Button> : null}
                                </div>
                            ))}
                        </Grid>
                    </div>
                ))}
            </Grid>

            <Button
                onClick={() => nav('/addShelf')}
                variant={'outlined'}>
                Regal hinzufügen
            </Button>
        </>
    )
}