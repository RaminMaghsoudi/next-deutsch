"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { BsTablet } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { SlDoc } from "react-icons/sl";
import { BiMessageSquareEdit } from "react-icons/bi";

const Setting = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    if (e === "Neues Dokument") setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const [Type, setType] = useState("");
  return (
    <Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <IoSettingsOutline size={18} style={{ color: "#646464" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <CiSaveUp2 style={{ marginRight: "5px" }} size={18} />
          Speichern
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <CiEdit style={{ marginRight: "5px" }} size={18} />
          Bearbeiten
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <CiTrash style={{ marginRight: "5px" }} size={18} />
          Löschen
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(e) => handleClose("Neues Dokument")}
          sx={{ fontFamily: "CL" }}
        >
          <SlDoc style={{ marginRight: "5px" }} size={15} />
          Neues Dokument
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <BiMessageSquareEdit style={{ marginRight: "5px" }} size={15} />
          Dokument bearbeiten
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <BsFileEarmarkText style={{ marginRight: "5px" }} size={15} />
          Neuer Text
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <BsTablet style={{ marginRight: "5px" }} size={15} />
          Tisch
        </MenuItem>
      </Menu>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: "CL" }}>Neues Dokument</DialogTitle>
        <DialogContent
          sx={{
            fontFamily: "CL",
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <input
            type="text"
            value={Type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Suche ..."
            style={{
              marginRight: "1rem",
              width: "500px",
              height: "40px",
              border: "1px solid rgba(129, 129, 129, 0.3)",
              outline: "none",
              borderRadius: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              backgroundColor: "rgba(202, 198, 198, 0.1)",
              fontFamily: "CL",
              fontSize: "1rem",
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#16a34a", // green-600
              "&:hover": {
                backgroundColor: "#15803d", // green-700
              },
              marginRight: "1rem",
              marginBottom: "1rem",
            }}
          >
            Erstellen
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Setting;
