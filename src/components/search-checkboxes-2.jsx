import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'

const SearchCheckboxes2 = (props) => {
    const { city, airport } = props.search2

    // Handle change event on clicking checkboxes
    const onCheckboxChange2 = (e) => {
        e.persist();
        if (e.target.checked && (city || airport)) {
            props.setSearch2(p => ({ ...p, [e.target.value]: e.target.checked }));
            return;
        }
        if (!e.target.checked && !(!city || !airport)) {
            props.setSearch2(p => ({ ...p, [e.target.value]: e.target.checked }));
            return;
        }
    };


    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={city}
                        onChange={onCheckboxChange2}
                        value={"city"}
                    />
                }
                label="City"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={airport}
                        onChange={onCheckboxChange2}
                        value={"airport"}
                    />
                }
                label="Airport"
            />
        </div>
    );
};

export default SearchCheckboxes2;