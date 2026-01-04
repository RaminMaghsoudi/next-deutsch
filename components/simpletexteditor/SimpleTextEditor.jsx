"use client";

import { useRef, useState } from "react";
import { FormatColorText, FormatColorFill } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import classess from "./SimpleTextEditor.module.css";
import { BsFilterLeft } from "react-icons/bs";
import { IoColorFillOutline } from "react-icons/io5";
import { TbBackground } from "react-icons/tb";

export default function SimpleTextEditor({ setTextEditor }) {
  const editorRef = useRef(null);
  const [savedRange, setSavedRange] = useState(null);
  const [fontSizeAnchor, setFontSizeAnchor] = useState(null);
  const [textColorAnchor, setTextColorAnchor] = useState(null);
  const [highlightAnchor, setHighlightAnchor] = useState(null);
  const [germanAnchor, setGermanAnchor] = useState(null);
  const highlightOpen = Boolean(highlightAnchor);
  const textColorOpen = Boolean(textColorAnchor);
  const fontSizeOpen = Boolean(fontSizeAnchor);
  const germanOpen = Boolean(germanAnchor);

  const textColors = [
    { name: "Rot", value: "#d32f2f" },
    { name: "Blau", value: "#1976d2" },
    { name: "Grün", value: "#388e3c" },
    { name: "Gelb", value: "#fbc02d" },
    { name: "Orange", value: "#f57c00" },
    { name: "Lila", value: "#7b1fa2" },
    { name: "Schwarz", value: "#000000" },
  ];
  const highlightColors = [
    { name: "Gelb", value: "#ffff99" },
    { name: "Grün", value: "#c8e6c9" },
    { name: "Blau", value: "#bbdefb" },
    { name: "Orange", value: "#ffcc80" },
    { name: "Lila", value: "#e1bee7" },
    { name: "Rot", value: "#ffcdd2" },
    { name: "Schwarz", value: "#f5f5f5" },
    { name: "Entfernen", value: "#ffffff" },
  ];
  const fontSizes = [
    { name: "rem", value: 1 },
    { name: "rem", value: 2 },
    { name: "rem", value: 3 },
    { name: "rem", value: 4 },
    { name: "rem", value: 5 },
    { name: "rem", value: 6 },
    { name: "rem", value: 7 },
  ];
  const germanChars = [
    { label: "ä", value: "ä" },
    { label: "Ä", value: "Ä" },
    { label: "ö", value: "ö" },
    { label: "Ö", value: "Ö" },
    { label: "ü", value: "ü" },
    { label: "Ü", value: "Ü" },
    { label: "ß", value: "ß" },
    { label: "€", value: "€" },
    { label: "„", value: "„" },
    { label: "“", value: "“" },
    { label: "–", value: "–" },
    { label: "—", value: "—" },
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
  const handleFontSizeClick = (event) => {
    setFontSizeAnchor(fontSizeAnchor ? null : event.currentTarget);
  };
  const handleTextColorClick = (event) => {
    setTextColorAnchor(textColorAnchor ? null : event.currentTarget);
  };
  const handleHighlightClick = (event) => {
    setHighlightAnchor(highlightAnchor ? null : event.currentTarget);
  };
  const handleGermanClick = (event) => {
    setGermanAnchor(germanAnchor ? null : event.currentTarget);
  };
  const insertGermanChar = (char) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const selection = window.getSelection();
    let range;
    if (
      savedRange &&
      savedRange.startContainer.parentElement.closest("[contenteditable]") ===
        editor
    ) {
      range = savedRange;
    } else if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
    } else {
      range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
    }
    range.deleteContents();
    const textNode = document.createTextNode(char);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    handleInput({ currentTarget: editor });
    setSavedRange(null);
    setGermanAnchor(null);
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
        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleFontSizeClick}
          className={`${classess.Char} ${classess.CharBorder}`}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
            minWidth: "25px",
          }}
          title="Schriftgröße"
        >
          F
          {/* <Box component="span" sx={{ fontSize: "0.7rem", ml: 0.5 }}>
            ▼
          </Box> */}
        </Box>
        <Popper
          open={fontSizeOpen}
          anchorEl={fontSizeAnchor}
          placement="bottom-start"
          modifiers={[
            {
              name: "offset",
              options: { offset: [0, 8] },
            },
          ]}
          sx={{ zIndex: 1300 }}
        >
          <ClickAwayListener onClickAway={() => setFontSizeAnchor(null)}>
            <Paper
              elevation={5}
              sx={{
                width: 60,
                maxHeight: 300,
                overflowY: "auto",
                overflowX: "hidden",
                bgcolor: "background.paper",
                borderRadius: "5px",
              }}
            >
              <List disablePadding>
                {fontSizes.map((size) => (
                  <ListItem key={size.value} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        execCommand("fontSize", size.value);
                        setFontSizeAnchor(null);
                        editorRef.current?.focus();
                      }}
                      sx={{
                        py: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: size.value >= 5 ? "bold" : "normal",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {size.value}
                        {size.name}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleTextColorClick}
          className={`${classess.Char} ${classess.CharBorder}`}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "25px",
          }}
          title="Textfarbe"
        >
          <IoColorFillOutline sx={{ fontSize: "22px" }} />
        </Box>
        <Popper
          open={textColorOpen}
          anchorEl={textColorAnchor}
          placement="bottom-start"
          modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
          sx={{ zIndex: 1300 }}
        >
          <ClickAwayListener onClickAway={() => setTextColorAnchor(null)}>
            <Paper
              elevation={5}
              sx={{
                width: 100,
                maxHeight: 300,
                overflowY: "auto",
                overflowX: "hidden",
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <List disablePadding>
                {textColors.map((color) => (
                  <ListItem key={color.value} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        execCommand("foreColor", color.value);
                        setTextColorAnchor(null);
                        editorRef.current?.focus();
                      }}
                      sx={{
                        py: 1,
                        borderRadius: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography
                        sx={{
                          color: color.value,
                          fontSize: "0.8rem",
                        }}
                        variant="body2"
                      >
                        {color.name}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleHighlightClick}
          className={`${classess.Char} ${classess.CharBorder}`}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "25px",
            position: "relative",
          }}
          title="Hintergrundfarbe"
        >
          <TbBackground sx={{ fontSize: "22px", color: "#ffeb3b" }} />
        </Box>
        <Popper
          open={highlightOpen}
          anchorEl={highlightAnchor}
          placement="bottom-start"
          modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
          sx={{ zIndex: 1300 }}
        >
          <ClickAwayListener onClickAway={() => setHighlightAnchor(null)}>
            <Paper
              elevation={5}
              sx={{
                width: 70,
                maxHeight: 330,
                overflowY: "auto",
                overflowX: "hidden",
                bgcolor: "background.paper",
                borderRadius: 2,
              }}
            >
              <List disablePadding>
                {highlightColors.map((color) => (
                  <ListItem key={color.value} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        execCommand("backColor", color.value);
                        setHighlightAnchor(null);
                        editorRef.current?.focus();
                      }}
                      sx={{
                        borderRadius: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          bgcolor: color.value,
                          borderRadius: 1,
                          mr: 2,
                          border:
                            color.value === "#ffffff" ||
                            color.value === "#f5f5f5"
                              ? "1px solid #ccc"
                              : "none",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
        <Box
          onMouseDown={(e) => e.preventDefault()}
          onClick={(event) => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              setSavedRange(selection.getRangeAt(0).cloneRange());
            } else {
              setSavedRange(null);
            }
            handleGermanClick(event);
          }}
          className={`${classess.Char} ${classess.CharBorder3}`}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
            minWidth: "35px",
          }}
          title="Deutsche Sonderzeichen"
        >
          uni
        </Box>
        <Popper
          open={germanOpen}
          anchorEl={germanAnchor}
          placement="bottom-start"
          modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
          sx={{ zIndex: 1300 }}
        >
          <ClickAwayListener onClickAway={() => setGermanAnchor(null)}>
            <Paper
              elevation={8}
              sx={{
                p: 1.5,
                bgcolor: "background.paper",
                borderRadius: 2,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                minWidth: 200,
              }}
            >
              {germanChars.map((item) => (
                <Box
                  key={item.value}
                  onClick={() => insertGermanChar(item.value)}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.selected",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Paper>
          </ClickAwayListener>
        </Popper>
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
          p: 0,
          borderTop: "none",
          outline: "none",
          bgcolor: "white",
          fontSize: "1rem",
          lineHeight: 1,
          fontFamily: "CL",
          unicodeBidi: "plaintext",
          textRendering: "optimizeLegibility",
          resize: "none",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
            background: "transparent",
          },
          userSelect: "text",
          WebkitUserSelect: "text",
          MozUserSelect: "text",
        }}
      />
    </Box>
  );
}
