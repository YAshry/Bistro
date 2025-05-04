// React
import React, {Fragment} from "react";
import { Link } from "react-router-dom";

const MailTo = ({ mailto, icon, label, className }) => {
    return (
        <Fragment>
            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = mailto;
                    e.preventDefault();
                }}
                className={className}
            >
                {icon}
                {label}
            </Link>
        </Fragment>
    );
};

export default MailTo;