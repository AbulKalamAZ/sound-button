import React from "react";

import OBJRenderer from "./OBJRenderer";
import GLBRenderer from "./GLBRenderer";
import FBXRenderer from "./FBXRenderer";

export default function ModelRenderer(props) {
  const { buttonDetails } = props;
  const hasButtonDetails = Object.keys(buttonDetails).length !== 0;

  return (
    <div>
      {hasButtonDetails ? (
        buttonDetails.modelFormat === "obj" ? (
          <OBJRenderer buttonInfo={buttonDetails} />
        ) : buttonDetails.modelFormat === "fbx" ? (
          <FBXRenderer buttonInfo={buttonDetails} />
        ) : (
          <GLBRenderer buttonInfo={buttonDetails} />
        )
      ) : null}
    </div>
  );
}
