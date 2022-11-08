import React from "react";
import { useState, useCallback, useEffect, Fragment } from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { getAmadeusData } from "../api/amadeus.api";
import { debounce } from "lodash";

const SearchAutocomplete = (props) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    // Configure options format for proper displaying on the UI
    // const names = options.map((i) => ({ type: i.subType, name: i.name }));
    const names = options.map((i) => ({ type: i.subType, name: i.name, iataCode: i.iataCode }));

    // Debounce func prevents extra unwanted keystrokes, when user triggers input events
    const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);

    useEffect(() => {
        debounceLoadData(search);
    }, [search]);

    // Same example as in *SearchRoot* component
    useEffect(() => {
        setLoading(true);
        const { out, source } = getAmadeusData({
            ...props.search,
            page: 0,
            keyword,
        });

        out.then((res) => {
            if (!res.data.code) {
                setOptions(res.data.data);
            }
            setLoading(false);
        }).catch((err) => {
            axios.isCancel(err);
            setOptions([]);
            setLoading(false);
        });

        return () => {
            source.cancel();
        };
    }, [keyword]);

    // Desctructuring our props
    const { city, airport } = props.search;

    const label = city && airport ? "Search City or Airport" : city ? "Search City" : airport ? "Search Airport" : "";

    return (
        // This is Material-UI component that also has it's own props
        <>
            <Autocomplete
                id="asynchronous-demo"
                style={{ width: 300, marginBottom: "1rem" }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) =>
                    option.name === value.name && option.type === value.type
                }
                onChange={(e, value) => {
                    if (value && value.name) {
                        props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }));
                        setSearch(value.name);
                        return;
                    }
                    setSearch("");
                    props.setSearch((p) => ({ ...p, keyword: "", page: 0 }));
                }}
                // getOptionLabel={(option) => {
                //     return option.name;
                // }}
                getOptionLabel={(option) => {
                    if (option.type == 'CITY') {
                        return `See all ${option.name} airports`;
                    } else if (option.type == 'AIRPORT') {
                        return `${option.name} - (${option.iataCode})`;
                    }
                }}
                options={names}
                loading={loading}
                renderInput={(params) => {
                    return (
                        <TextField
                            label={label}
                            fullWidth
                            onChange={(e) => {
                                e.preventDefault();
                                setSearch(e.target.value);
                            }}
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                value: search,
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {loading ? (<CircularProgress color="inherit" size={20} />) : null}
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                ),
                            }}
                        />
                    );
                }}
            />
        </>
    );
};

export default SearchAutocomplete;
