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
        // width: 50
    }
});

const SearchTable2 = props => {
    const { data, meta } = props.dataSource2;
    const classes = useStyles();
   

    return (

        <Paper className={classes.root} style={{ position: "relative" }}>

            {/* Loader for improving UX */}
            {props.loading && <LinearProgress variant="indeterminate" className="linear-progress" />}

            <Table className={classes.table} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell align="right">Arrival</TableCell>
                        {/* <TableCell align="right">Type</TableCell> */}
                        {/* <TableCell align="right">City</TableCell> */}
                        {/* <TableCell align="right">Geo Code</TableCell> */}
                        {/* <TableCell align="right">Country</TableCell>
                        <TableCell align="right">Country code</TableCell> */}
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {!!data.length && data.map((row, idx) => (
                        <TableRow key={row.name + idx}>
                            <TableCell align="right" component="th" scope="row">{row.name} - ({row.iataCode})</TableCell>
                            {/* <TableCell align="right">{row.subType}</TableCell> */}
                            {/* <TableCell align="right">{row.address.cityName}</TableCell> */}
                            {/* <TableCell align="right">{row.geoCode.latitude}, {row.geoCode.longitude}</TableCell> */}
                            {/* <TableCell align="right">{row.address.countryName}</TableCell>
                            <TableCell align="right">{row.address.countryCode}</TableCell> */}
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
                page={props.search2.page}
                onPageChange={(e, page) => {
                    props.setSearch2(p => ({ ...p, page }));
                }}
            /> */}
        </Paper>
    );
};

export default SearchTable2;