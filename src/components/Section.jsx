import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
    <Fragment>
        <div className="sectionHeading">{title}</div>
        <div className="sectionContent">{children}</div>
    </Fragment>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
}

export { 
    Section
};
