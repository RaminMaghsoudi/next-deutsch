"use client";

import { useState, useRef, useEffect } from "react";
import { FormatColorText, FormatColorFill } from "@mui/icons-material";
import { Box } from "@mui/material";
import classess from "./SimpleTextEditor.module.css";
import { BsFilterLeft } from "react-icons/bs";

export default function SimpleTextEditor() {
  const [content, setContent] = useState("");
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

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [content]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    // بعد از هر دستور، فوکوس رو حفظ کن
    editorRef.current?.focus();
  };

  const applyColor = (type) => {
    const color = prompt(
      type === "foreColor"
        ? "رنگ متن (مثل #ff0000 یا red)"
        : "رنگ پس‌زمینه (مثل #ffff00)"
    );
    if (color) {
      execCommand(type, color);
    }
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
        // اگر بلوک پیدا نشد، یک <p> جدید بساز
        document.execCommand("formatBlock", false, "p");
        block = container.closest("p");
      }

      if (block) {
        block.style.textAlign = direction;
        block.dir = direction === "right" ? "rtl" : "ltr";
      }
    }
  };

  return (
    <Box className={classess.SimpleTextEditor}>
      <Box className={classess.Taskbar}>
        <Box
          value="bold"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("bold")}
          sx={{ fontWeight: "bold", marginLeft: "30px" }}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          B
        </Box>
        <Box
          value="italic"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => execCommand("italic")}
          sx={{ fontStyle: "italic", fontFamily: "C" }}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          I
        </Box>
        <Box
          value="underline"
          onMouseDown={(e) => e.preventDefault()}
          sx={{ fontStyle: "italic", underline: "underline" }}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          U
        </Box>
        <Box
          value="right"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleAlign("right")}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          <BsFilterLeft size={25} style={{ transform: "scaleX(-1)" }} />
        </Box>
        <Box
          value="left"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleAlign("left")}
          className={`${classess.Char} ${classess.CharBorder}`}
        >
          <BsFilterLeft size={25} />
        </Box>
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
            <FormatColorText
              sx={{
                color: color.value,
                fontSize: "18px",
              }}
            />
          </Box>
        ))}
        {highlightColors.map((color) => (
          <Box
            key={color.value}
            onMouseDown={(e) => e.preventDefault()} // جلوگیری از از دست رفتن فوکوس
            onClick={() => execCommand("backColor", color.value)}
            className={`${classess.Char}  ${
              color.value === "#ffffff"
                ? classess.CharBorder3
                : classess.CharBorder
            }`}
            title={color.name} // وقتی موس روش می‌ره اسم رنگ رو نشون بده
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
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        dir="auto"
        spellCheck={false}
        sx={{
          minHeight: "400px",
          p: 3,
          border: "1px solid #ccc",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          outline: "none",
          bgcolor: "white",
          fontSize: "18px",
          lineHeight: 1.8,
          fontFamily: "CL, Tahoma, Arial, sans-serif",
          unicodeBidi: "plaintext",
          textRendering: "optimizeLegibility",
        }}
      ></Box>
    </Box>
  );
}
