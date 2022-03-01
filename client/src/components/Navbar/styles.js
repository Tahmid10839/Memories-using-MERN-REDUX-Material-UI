import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: ['row', '!important'],
        justifyContent: ['space-between', '!important'],
        alignItems: 'center',
        padding: '10px 50px',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
        marginTop: "5px",
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'flex-end',
        // width: '300px',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    profile: {
        display: 'flex',
        // justifyContent: 'space-between',
        // width: '500px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    user: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            margin: '10px 0px'
        }
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        margin: ['0px 20px 0px 5px', '!important'],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    [theme.breakpoints.down('sm')]: {
        appBar: {
            flexDirection: ['column', '!important']
        }
    }
}));