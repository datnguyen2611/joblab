import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';

export default {
  palette: {
    common: {
/*      black: '#000',
      white: '#fff',
      dark: '#020202',*/
      black: '#000',
      white: '#fff',
      dark: cyan[700],
    },
    primary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700],
      contrastText: '#fff'
    },
    secondary: {
      light: green[300],
      main: green['A200'],
      dark: green[700],
      contrastText: '#fff'
    },
    borderColor: {
      main: 'rgba(0, 0, 0, 0.06)',
      dark: 'rgba(0, 0, 0, 0.12)',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    button: {
      fontWeight: 400,
      textAlign: 'capitalize'
    },
  },
};
