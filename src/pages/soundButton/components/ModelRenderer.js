import React from 'react';

import OBJRenderer from './OBJRenderer';
import GLBRenderer from './GLBRenderer';

export default function ModelRenderer(props) {
    const { buttonDetails } = props;
    const hasButtonDetails = Object.keys(buttonDetails).length !== 0;

    return (
        <div>
            {hasButtonDetails ? (
                buttonDetails.modelFormat === 'glb' ? (
                    <GLBRenderer buttonInfo={buttonDetails} />
                ) : (
                    <OBJRenderer buttonInfo={buttonDetails} />
                )
            ) : null}
        </div>
    );
}
