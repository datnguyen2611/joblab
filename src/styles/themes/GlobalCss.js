import makeStyles from '@material-ui/core/styles/makeStyles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

let paddingClasses = {};
for (let count = 1; count <= 8; count++) {
  paddingClasses['.pt-' + count] = { paddingTop: count * 4 + 'px !important' };
  paddingClasses['.pb-' + count] = { paddingBottom: count * 4 + 'px !important' };
}

const globalStyles = makeStyles(theme => ({
  breakpoints,
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    '.Cmt-table-responsive': {
      minHeight: '.01%',
      overflowX: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: 15,
        overflowY: 'hidden',
        border: `1px solid ${theme.palette.borderColor.main}`,
        '& > table': {
          marginBottom: 0,
          '& > thead > tr > th': {
            paddingTop: 8,
          },
          '& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td': {
            whiteSpace: 'nowrap',
          },
        },
      },
    },
    '.swal2-shown .swal2-container': {
      zIndex: 1104,
    },
    '.swal2-container .swal2-popup, .swal2-container .swal2-popup.swal2-toast': {
      backgroundColor: theme.palette.popupColor.main,
      color: theme.palette.text.primary,
    },
    '.swal2-container .swal2-content, .swal2-container .swal2-title': {
      color: theme.palette.text.primary,
    },
    '.swal2-container .swal2-footer a': {
      color: theme.palette.primary.main,
    },
    '.swal2-container .swal2-close:focus': {
      outline: 'none',
    },
    ...paddingClasses,
  },
}));

export default globalStyles;
