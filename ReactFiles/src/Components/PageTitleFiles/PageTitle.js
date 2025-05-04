// React
import React, {Fragment} from 'react'

// Style Sheets
import pageStyles from './pagetitle.module.css'

const PageTitle = (props) => {
    return(
        <Fragment>
            {/* Title */}
            <div className={`${pageStyles.sectionContainer} ${props.className}`}>
                {props.title}
            </div>
        </Fragment>
    )
}

export default PageTitle