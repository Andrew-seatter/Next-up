//  https://mui.com/material-ui/all-components/
import "./Header.css"

import { 
    AppBar, 
    Toolbar,
    IconButton, 
    Button 
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu'

import  { Link } from 'react-router-dom';
/*
    sx prop = custom style
    use valid CSS properties or mui-unique properties

    sx={{
        mr: 10,
        pt: 5
    }}

    sx={{
        marginRight: "100px",
        paddingTop: "50px"
    }}
*/
export const Header = () => {
    return (
        <AppBar color="secondary">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ 
                        mr: 2
                    }}
                >
                    <MenuIcon />
                </IconButton>
                    <h1>Welcome</h1>
                    
                {/* Link back to Dashboard */}
                <Button color="inherit" component={Link} to="/">
                    Dashboard
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;