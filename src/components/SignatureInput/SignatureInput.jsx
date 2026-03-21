import React, { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureInput({ onChange }) {
  const sigCanvas = useRef();

  const clear = () => {
    sigCanvas.current.clear();
    if (onChange) onChange(""); // clear value
  };

  const save = () => {
    const canvas = sigCanvas.current.getCanvas();
    const dataURL = canvas.toDataURL("image/png");
    if (onChange) onChange(dataURL); // send value to parent
  };

  // Resize canvas to parent width
  const resizeCanvas = () => {
    const canvas = sigCanvas.current.getCanvas();
    const parentWidth = canvas.parentElement.offsetWidth;
    const parentHeight = canvas.parentElement.offsetHeight || 200; // default height
    // Save current drawing
    const data = sigCanvas.current.toData();
    canvas.width = parentWidth;
    canvas.height = parentHeight;
    // Restore drawing
    sigCanvas.current.fromData(data);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      // className="form-input"
      style={{ border: "1px solid #ccc" }}
    >
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: "sigCanvas", width: 70, height: 90 }}
        onEnd={save}
      />
      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}
