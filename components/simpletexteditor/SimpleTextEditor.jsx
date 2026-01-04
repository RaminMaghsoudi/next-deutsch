"use client";

import { useRef, useState } from "react";
import { FormatColorText, FormatColorFill } from "@mui/icons-material";
import { Box } from "@mui/material";
import classess from "./SimpleTextEditor.module.css";
import { BsFilterLeft } from "react-icons/bs";

export default function SimpleTextEditor({ setTextEditor }) {
  const editorRef = useRef(null);

  const textColors = [
    { name: "قرمز", value: "#d32f2f" },
    { name: "آبی", value: "#1976d2" },
    { name: "سبز", value: "#388e3c" },
    { name: "زرد", value: "#fbc02d" },
    { name: "نارنجی", value: "#f57c00" },
    { name: "بنفش", value: "#7b1fa2" },
    { name: "سیاه", value: "#000000" },
  ];
  const highlightColors = [
    { name: "زرد", value: "#ffff99" },
    { name: "سبز", value: "#c8e6c9" },
    { name: "آبی", value: "#bbdefb" },
    { name: "نارنجی", value: "#ffcc80" },
    { name: "بنفش", value: "#e1bee7" },
    { name: "قرمز", value: "#ffcdd2" },
    { name: "سیاه", value: "#f5f5f5" },
    { name: "حذف", value: "#ffffff" },
  ];
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };
  const handleAlign = (direction) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.commonAncestorContainer;
      if (container.nodeType !== 1) container = container.parentNode;

      let block = container;
      while (
        block &&
        !["P", "DIV", "H1", "H2", "H3", "LI", "BLOCKQUOTE"].includes(
          block.tagName
        )
      ) {
        block = block.parentElement;
      }

      if (!block) {
        document.execCommand("formatBlock", false, "p");
        block = container.closest("p");
      }

      if (block) {
        block.style.textAlign = direction;
        block.dir = direction === "right" ? "rtl" : "ltr";
      }
    }
    editorRef.current?.focus();
  };
  const handleInput = (e) => {
    setTextEditor(e.currentTarget.innerHTML);
  };

  return (
    <Box className={classess.SimpleTextEditor}>
      <Box className={classess.Taskbar}>
        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("bold")}
          sx={{ fontWeight: "bold" }}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          B
        </Box>

        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("italic")}
          sx={{ fontStyle: "italic" }}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          I
        </Box>

        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("underline")}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          U
        </Box>

        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleAlign("right")}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          <BsFilterLeft size={25} style={{ transform: "scaleX(-1)" }} />
        </Box>

        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleAlign("left")}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          <BsFilterLeft size={25} />
        </Box>

        {/* رنگ متن */}
        {textColors.map((color) => (
          <Box
            key={color.value}
            onClick={() => execCommand("foreColor", color.value)}
            className={`${classess.Char} ${classess.CharBorder}`}
            title={color.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormatColorText sx={{ color: color.value, fontSize: "18px" }} />
          </Box>
        ))}

        {/* رنگ پس‌زمینه (هایلایت) */}
        {highlightColors.map((color) => (
          <Box
            key={color.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCommand("backColor", color.value)}
            className={`${classess.Char} ${
              color.value === "#ffffff"
                ? classess.CharBorder3
                : classess.CharBorder
            }`}
            title={color.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <FormatColorFill
              sx={{
                color: color.value,
                fontSize: "18px",
                position: "absolute",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: color.value,
                borderRadius: 2,
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        dir="auto"
        spellCheck={false}
        onInput={handleInput}
        sx={{
          height: "350px",
          maxHeight: "350px",
          overflowY: "auto",
          overflowX: "hidden",
          p: 2,
          borderTop: "none",
          outline: "none",
          bgcolor: "white",
          fontSize: "1rem",
          lineHeight: 1.4,
          fontFamily: "CL",
          unicodeBidi: "plaintext",
          textRendering: "optimizeLegibility",
          resize: "none",
        }}
      />
    </Box>
  );
}
