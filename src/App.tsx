import React from "react";
import { Button } from "@mui/material";
import zip from "jszip";
import { saveAs } from "file-saver";

const parser = new DOMParser();
const serializer = new XMLSerializer();

const fixes: [string, string][] = [
  ["“", '"'],
  ["”", '"'],
  ["—", "-"],
  ["’", "'"],
  ["‘", "'"],
  [String.fromCharCode(173), " "], // non-breaking space
  [String.fromCharCode(160), " "], // another non-breaking space
];

const fixNode = (n: Node): void => {
  if (n.textContent && !n.hasChildNodes()) {
    for (const fix of fixes) {
      n.textContent = n.textContent.replaceAll(fix[0], fix[1]);
    }
  }

  n.childNodes.forEach((c) => fixNode(c));
};

const processZip = async (fileName: string, z: zip): Promise<void> => {
  for (const file of Object.values(z.files)) {
    if (!file.name.endsWith(".xhtml")) continue;
    const content = await file.async("string");
    const doc = parser.parseFromString(content, "application/xhtml+xml");
    fixNode(doc.getRootNode());
    const newContent = serializer.serializeToString(doc);
    z.file(file.name, newContent);
  }
  const blob = await z.generateAsync({ type: "blob" });
  saveAs(blob, fileName);
};

export function App(): React.ReactElement {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files || files.length !== 1) return;
    const inputFile = files[0];
    const z = await zip.loadAsync(inputFile);
    processZip("FIX-" + inputFile.name, z);
  };
  return (
    <Button variant="contained" component="label" sx={{ padding: "150px" }}>
      Fix File
      <input type="file" onChange={onChange} hidden />
    </Button>
  );
}
