import React, { useEffect, useState } from 'react';

function Khsdetaillist(props) {
    const { data } = props;
    console.log('khsdetaillist', props);
    const [projectkhsvariable, Setprojectkhsvariable] = useState(props);
    return (
        <>
            <h6>{data?.designator_code}</h6>
            <div>{data?.designator_desc}</div>
        </>
    );
}
export default Khsdetaillist;
