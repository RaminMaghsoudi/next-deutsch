"use client";

import { useState } from "react";
import Editor from "./Editor";

export default function UseEditor() {
  const [content, setContent] = useState("");

  return (
    <div style={{ marginTop: "5px" }}>
      <Editor content={content} onChange={setContent} />
    </div>
  );
}
