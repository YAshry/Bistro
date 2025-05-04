// React
import React, {Fragment} from 'react'

// Style Sheets
import pageStyles from './pagedescription.module.css'

const PageDescription = (props) => {
    return(
        <Fragment>
            {/* Title */}
            <div 
                className={`${pageStyles.sectionContainer}`}
                style={props.styles}
            >
                {props.description}
            </div>
        </Fragment>
    )
}

export default PageDescription