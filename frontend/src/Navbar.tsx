import {Box} from "@mui/material";
import logo from "./assets/logo.png";

export default function Navbar(){
    return (
        <>
            <Box bgcolor={'#646E78'}>
                <Box  display={'flex'} justifyContent={'center'} p={'1rem'}>
                    <img src={logo} alt={'logo'} width={'400rem'}/>
                </Box>
            </Box>
        </>
    )
}