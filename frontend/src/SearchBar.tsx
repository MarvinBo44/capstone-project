import React, {FormEvent, useState} from "react";
import axios from "axios";
import {Box, Button, createTheme, TextField, ThemeProvider,} from "@mui/material";

export default function SearchBar() {
    const [searchtext, setSearchtext] = useState<string>("");
    const [searchTextError, setSearchTextError] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

    type Item = {
        _id: string;
        name: string;
        amount: number;
    };

    type Compartment = {
        _id: string;
        name: string;
        items: Item[];
    };

    type SearchResult = {
        compartment: Compartment;
        matchingItems: Item[];
    };

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let hasError = false;

        if (searchtext === "") {
            setSearchTextError(true);
            hasError = true;
        } else {
            setSearchTextError(false);
        }

        if (!hasError) {
            axiosSearch();
        }
    }

    function axiosSearch() {
        axios.get("/api/findItemByKeyword/" + searchtext).then((response) => {
            console.log("Response data:", response.data);
            console.log(searchResults)
            const compartmentData = response.data.compartment;
            const matchingItemsData = response.data.matchingItems;

            setSearchResults({compartment: compartmentData, matchingItems: matchingItemsData});
            resetField();
        });
    }

    function resetField() {
        setSearchtext("");
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#CBE2D8",
            },
            secondary: {
                main: "#ffc2d1",
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box marginTop={"2vh"} marginBottom={"6vh"}>
                    <form onSubmit={submit}>
                        <Box display={"flex"} justifyContent={"space-evenly"}>
                            <TextField
                                autoComplete={"off"}
                                placeholder={"Suche"}
                                error={searchTextError}
                                sx={{width: "70vw"}}
                                type={"text"}
                                onChange={(event) => setSearchtext(event.target.value)}
                            />
                            <Button variant={"contained"} type={"submit"} sx={{width: "20vw"}}>
                                Suchen
                            </Button>
                        </Box>
                    </form>

                    {/*<Box display={"flex"} flexWrap={"wrap"} border={'2px solid #545454'}>*/}
                    {/*    {searchResults?.matchingItems.map((item: Item) => {*/}


                    {/*        return <Box key={item._id}>*/}
                    {/*            <div>*/}
                    {/*                {searchResults === null ? <p>null</p> : item.name}*/}
                    {/*            </div>*/}
                    {/*        </Box>;*/}
                    {/*    })}*/}
                    {/*</Box>*/}

                </Box>
            </ThemeProvider>
        </>
    );
}
