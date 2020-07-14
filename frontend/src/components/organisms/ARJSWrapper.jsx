import React from 'react';

const ARJSWrapper = ({
    url,
}) => {
    return (
        <div className="vignette flex-filler flex-root">
            <iframe
                className="flex-filler"
                title="AR Viewer"
                src="/ar-viewer.html"
            />
        </div>
    );
};

export default ARJSWrapper;