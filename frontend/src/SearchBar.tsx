import React, {useState} from 'react';
import {Box, Button, TextField} from "@mui/material";

interface SearchResult {
    compartment: {
        _id: string;
        name: string;
    };
    matchingItems: {
        _id: string;
        name: string;
        amount: number;
    }[];
}

const ItemSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/findItemByKeyword/${searchTerm}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Fehler beim Suchen:', error);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <>
            <Box display={'flex'}
                 justifyContent={'space-evenly'}
                 marginBottom={'4vh'}>
                <TextField
                    type="text"
                    size={'small'}
                    autoComplete={'off'}
                    placeholder="Suchen"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}
                        variant={'contained'}
                        size={'small'}>
                    Suchen
                </Button>
                <Button onClick={handleClear}
                        size={'small'}
                        variant={'contained'}>
                    Clear
                </Button>
            </Box>
            <Box>
                {searchResults.map((result) => (
                    <div key={result.compartment._id}>
                        <h2>Abteilung: {result.compartment.name}</h2>
                        <ul>
                            {result.matchingItems.map((item) => (
                                <li key={item._id}>
                                    {item.name} - Menge: {item.amount} - Fach: {result.compartment.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Box>
        </>
    );
};

export default ItemSearch;
