import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import JsonData from '../react-test-data';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#666565",
        color: "#ffffff"
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    search: {
        height: 39,
        width: 250,
        padding: 5,
        margin: 20,
        textAlign: "center",
        alignItems: "center",
    },
    dropdown: {
        height: 39,
        width: 98,
        padding: 5,
        margin: 20,
        textAlign: "center",
        alignItems: "center",
    },
    formControl: {
        minWidth: 57,
    },
    selectEmpty: {
        marginTop: 20,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
});

const Listing = () => {

    const classes = useStyles();
    const [Loading, setLoading] = useState(false);
    const [search, setSearch] = useState();
    const [rating, setRating] = useState();
    const [filterOption, setfilterOption] = useState({});


    const [listdata, setListdata] = useState([]);



    useEffect(
        () => {
            fetchRecords();
        },
        []
    );

    const fetchRecords = (filterOption) => {

        var filterdata = [];

        if (typeof (filterOption) !== 'undefined') {

            if (typeof (filterOption.search) !== 'undefined' && filterOption.search != "") {

                filterdata = listdata.filter(item => {
                    const query = filterOption.search.toLowerCase();

                    return (
                        item.Name.toLowerCase().indexOf(query) >= 0 ||
                        item.City.toLowerCase().indexOf(query) >= 0 ||
                        item['Cuisine Style'].toLowerCase().indexOf(query) >= 0
                    )
                });

                setListdata(filterdata);
            } else {
                setListdata(JsonData);
            }

        } else {
            setListdata(JsonData);
        }

    };

    const fetchRatingsRecords = (filterOption) => {

        var filterdata = [];

        if (typeof (filterOption) !== 'undefined') {

            if (typeof (filterOption.rating) !== 'undefined' && filterOption.rating != "") {

                filterdata = JsonData.filter(item => {
                    const query = filterOption.rating;

                    console.log(query)
                    return (
                        item.Rating == query
                    )
                });

                setListdata(filterdata);

            } else {
                setListdata(JsonData);
            }
        } else {
            setListdata(JsonData);
        }

    };

    const handleFilter = (fiterValue) => {
        filterOption['search'] = fiterValue.target.value;
        setfilterOption(filterOption);
        fetchRecords(filterOption);
    };

    const handleRatingFilter = (event) => {
        filterOption['rating'] = event.target.value;
        setfilterOption(filterOption);
        fetchRatingsRecords(filterOption);
    };

    return (
        <>
            {Loading ? (<CircularProgress
                style={{
                    width: '20px',
                    height: "20px",
                    textAlign: "center",
                    margin: '0 auto',
                    display: 'block',
                    marginTop: '100px',
                    marginBottom: '100px'
                }}
            />) :
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={10}>
                            <Card className={(classes.search)}>
                                <TextField label="Search" name="serch" value={search} type="search" onChange={handleFilter} />
                                <IconButton><SearchIcon /></IconButton>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Card className={(classes.dropdown)}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                                    <Select native value={rating} onChange={handleRatingFilter} name="rating">
                                        <option aria-label="None" value="" />
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Select>
                                </FormControl>
                            </Card>
                        </Grid>
                    </Grid>
                    <Container maxWidth="fixed">
                        <TableContainer>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">Name</StyledTableCell>
                                        <StyledTableCell align="left">City</StyledTableCell>
                                        <StyledTableCell align="left">Cuisine Style</StyledTableCell>
                                        <StyledTableCell align="left">Ranking</StyledTableCell>
                                        <StyledTableCell align="left">Rating</StyledTableCell>
                                        <StyledTableCell align="left">Number of Reviews</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {listdata.map(data => {
                                        const cuisine_style = eval(data['Cuisine Style']);
                                        return <StyledTableRow>
                                            <StyledTableCell align="left">{data.Name}</StyledTableCell>
                                            <StyledTableCell align="left">{data.City}</StyledTableCell>
                                            <StyledTableCell align="left">{cuisine_style.join(',')}</StyledTableCell>
                                            <StyledTableCell align="left">{data.Ranking}</StyledTableCell>
                                            <StyledTableCell align="left">{data.Rating}</StyledTableCell>
                                            <StyledTableCell align="left">{data['Number of Reviews']}</StyledTableCell>
                                        </StyledTableRow>;
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </div>
            }
        </>
    );
}
export default Listing;