import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
    const [visibility, toggleVisibility] = useState(true);
    return (
        <Fragment>
            <div className="sectionHeading" onClick={() => toggleVisibility(!visibility)}>{title}</div>
            { visibility && <div className="sectionContent">{children}</div> }
        </Fragment>
    )
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export { 
    Section
};
