import { createTheme } from "@mui/material";
import { purple, orange, red } from '@mui/material/colors';


const primaryColor = purple[600]
const secondaryColor = orange[500]
const dangerColor = red[900]


const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      error:{
          main:dangerColor,
      }
    },
    components:{
        MuiButton:{
            styleOverrides:{
                sizeSmall:{
                    padding:"6.5px",
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                margin:"0px 10px 0px 0px",
                fontSize:"0.7rem"
              }
            }
        }
    }
  });

  export default theme