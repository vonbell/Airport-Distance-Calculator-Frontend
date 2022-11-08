import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        width: "50%",
        // overflowX: "auto"
    },
    table: {
        // minWidth: 650
    }
});

const SearchTable = props => {
    const { data, meta } = props.dataSource;
    const classes = useStyles();
   

    return (

        <Paper className={classes.root} style={{ position: "relative" }}>

            {/* Loader for improving UX */}
            {props.loading && <LinearProgress variant="indeterminate" className="linear-progress" />}

            <Table className={classes.table} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell align="left">Departure</TableCell>
                        {/* <TableCell align="left">Type</TableCell> */}
                        {/* <TableCell align="left">City</TableCell> */}
                        {/* <TableCell align="left">Geo Code</TableCell> */}
                        {/* <TableCell align="left">Country</TableCell>
                        <TableCell align="left">Country code</TableCell> */}
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {!!data.length && data.map((row, idx) => (
                        <TableRow key={row.name + idx}>
                            <TableCell component="th" scope="row">{row.name} - ({row.iataCode})</TableCell>
                            {/* <TableCell align="left">{row.subType}</TableCell> */}
                            {/* <TableCell align="left">{row.address.cityName}</TableCell> */}
                            {/* <TableCell align="left">{row.geoCode.latitude}, {row.geoCode.longitude}</TableCell> */}
                            {/* <TableCell align="left">{row.address.countryName}</TableCell>
                            <TableCell align="left">{row.address.countryCode}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            {/* Will display this if no data in rtesponse from server */}
            {!data.length && <div className="center">No data</div>}

            {/* Pagination Component */}
            {/* <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={meta.count ? meta.count : 0}
                rowsPerPage={10}
                page={props.search.page}
                onPageChange={(e, page) => {
                    props.setSearch(p => ({ ...p, page }));
                }}
            /> */}
        </Paper>
    );
};

export default SearchTable;