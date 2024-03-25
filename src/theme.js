// theme.js
// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global:(props) => ({
   body:{
     bg:mode("gray.400","#0E1514")(props),
     color:mode("gray.900", "whiteAlpha.800")(props)
   }
  })
}

// 3. extend the theme
const theme = extendTheme({ config, styles })

export default theme