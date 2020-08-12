import React, { Fragment } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";

const DropzoneInput = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const onDrop = ([acceptedFile]) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const str = reader.result;
      try {
        const base64string = str.replace(/\\n/g, "");

        let pdfWindow = window.open("");
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(base64string) +
            "'></iframe>"
        );
      } catch (e) {
        console.log("Error:", e.stack);
      }
    };
    reader.readAsText(acceptedFile);
  };

  return (
    <Fragment>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <DropzoneInput {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </DropzoneInput>
          </section>
        )}
      </Dropzone>
    </Fragment>
  );
}

export default App;

// var fs = require("fs");
// const base64 = require('base64topdf');

// try {
//   var data = fs.readFileSync("base64.txt", "utf8");
//   const base64string = data.toString().replace(/\\n/g, "");
//   base64.base64Decode(base64string, 'base64.pdf');
// } catch (e) {
//   console.log("Error:", e.stack);
// }
