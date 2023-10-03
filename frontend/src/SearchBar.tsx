import {FormEvent, useEffect, useState} from 'react';
import {Box, Button, createTheme, Divider, TextField, ThemeProvider, Typography} from "@mui/material";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function SearchBar() {

    type SearchResult = {
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

    type Shelf = {
        _id: string;
        name: string;
        location: string;
        compartmentIds: string[];
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

    const stringToColor = (str: string, saturation = 40, lightness = 85) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
    };

    const [searchBarInput, setSearchBarInput] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [apiResponseShelf, setApiResponseShelf] = useState<Shelf[]>([]);

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.get('/api/findItemByKeyword/' + searchBarInput)
            .then(response => {
                setSearchResults(response.data);
            }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios
            .get<Shelf[]>("/api/shelf")
            .then((response) => {
                setApiResponseShelf(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    const handleClear = () => {
        setSearchBarInput('');
        setSearchResults([]);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSearch}>
                    <Box display={'flex'}
                         justifyContent={'space-evenly'}>
                        <TextField // Searchbar
                            type="text"
                            size={'small'}
                            autoComplete={'off'}
                            sx={{width: '50%'}}
                            placeholder="Suchen"
                            value={searchBarInput}
                            onChange={(e) => setSearchBarInput(e.target.value)}
                        />
                        <Button type={'submit'} // search bar
                                variant={'contained'}
                                sx={{width: '10%'}}
                                size={'small'}>
                            Suchen
                        </Button>
                        <Button onClick={handleClear} // clear button
                                size={'small'}
                                sx={{width: '10%'}}
                                variant={'contained'}>
                            <DeleteForeverIcon/>
                        </Button>
                    </Box>
                </form>
                {searchResults.map((result) => (
                    <Box key={result.compartment._id}>

                        <Box display={'flex'} justifyContent={"space-evenly"} // search results
                             marginTop={'5vh'}
                             marginLeft={'5vw'}
                             marginRight={'5vw'}
                             marginBottom={'2vh'}
                             gap={'2%'}
                             textAlign={'center'}>
                            <Typography bgcolor={"#CBE2D8"} // name of shelf
                                        width={"55%"}
                                        color={'#545454'}
                                        padding={"10px"}
                                        borderRadius={"10px"}>
                                {apiResponseShelf.map((shelf) =>
                                    (shelf.compartmentIds.includes(result.compartment._id) ? shelf.name : null))}
                            </Typography>

                            <Typography
                                bgcolor={stringToColor(result.compartment.name)} // compartment name
                                width={"10%"}
                                color={'#545454'}
                                padding={"10px"}
                                borderRadius={"10px"}>
                                {result.compartment.name}
                            </Typography>

                            <Typography
                                bgcolor={"#E4DCB4"} // shelf location
                                width={"30%"}
                                color={'#545454'}
                                padding={"10px"}
                                borderRadius={"10px"}>
                                {apiResponseShelf.map((shelf) => (shelf.compartmentIds.includes(result.compartment._id) ? shelf.location : null))}
                            </Typography>
                        </Box>

                        {result.matchingItems.map((item) => (
                            <Box key={item._id}
                                 display={'flex'}
                                 alignItems={'center'}
                                 marginTop={'2vh'}
                                 marginLeft={'5vw'}
                                 marginRight={'5vw'}
                                 marginBottom={'2vh'}
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
                        ))}
                        <br/>
                        <Divider></Divider>
                        <br/>
                    </Box>
                ))}
            </ThemeProvider>
        </>
    );
}