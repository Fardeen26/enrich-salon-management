import React from 'react'
import MinimizeIcon from '@mui/icons-material/Minimize';

function Heading({title}) {
    return (
        <div className="heading px-44 text-center max-lg:px-28 max-md:px-20 text-3xl max-sm:px-4 max-sm:text-xl font-semibold">
            <h2>{title}</h2>
            <span><MinimizeIcon style={{marginTop: '-30px'}}/><MinimizeIcon style={{marginTop: '-30px'}}/></span>
        </div>
    )
}

export default Heading;