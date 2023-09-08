import {Button} from "@mui/material";
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
            <div>
                <h1>Daten aus MongoDB</h1>
                <ul>
                    {apiResponseShelf.map((shelfItem) => (
                        <p key={shelfItem._id}>
                            Name: {shelfItem.name}
                            <br/>
                            Location: {shelfItem.location}
                            <br/>
                            {apiResponseCompartment.map((compartmentItem) => (
                                <Button key={compartmentItem._id}>{shelfItem.compartmentIds.includes(compartmentItem._id) ? compartmentItem.name : undefined}</Button>
                            ))}
                        </p>
                    ))}
                </ul>
            </div>
            <Button
                onClick={() => nav('/addShelf')}
                variant={'outlined'}>
                Regal hinzufügen
            </Button>
        </>
    )
}