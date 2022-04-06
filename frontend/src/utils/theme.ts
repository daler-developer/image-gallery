import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      defaultProps: {
        disableShrink: true
      }
    }
  }
})

export default theme
