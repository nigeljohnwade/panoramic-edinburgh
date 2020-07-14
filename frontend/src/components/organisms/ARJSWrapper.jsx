import React from 'react';

const ARJSWrapper = ({
    url,
}) => {
    return (
        <iframe
            className="flex-filler"
            title="AR Viewer"
            src="/ar-viewer.html"
        />
    );
};

export default ARJSWrapper;