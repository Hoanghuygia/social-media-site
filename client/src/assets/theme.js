import { extendTheme } from "@chakra-ui/react";

const colors = {
  'bg-color': {
    100: '#fef9f8',
    200: '#efd1d8',
    300: '#f5eaea',
    400: '#FCF9FF'
  },
  'text-color': {
    100: '#cac3e4',
    200: '#d6cae3',
  },
};

const theme = extendTheme({ colors });

export default theme;


