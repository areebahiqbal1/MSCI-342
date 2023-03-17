import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const path = require("path");

function DocView(document) {
    const docs = [
      { uri: require(document) }, // Local File
    ];
  
    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
  }