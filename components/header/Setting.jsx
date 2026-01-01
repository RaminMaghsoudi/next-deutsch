// Updated: components/hear/Setting.js (Replace the entire component with this)
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
import { Fragment, useState, useEffect } from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { BsTablet } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { SlDoc } from "react-icons/sl";
import { useParams, useRouter } from "next/navigation";

const Setting = () => {
  const params = useParams();
  const id = params.slug;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleEdit = async () => {
    if (params.slug === undefined) {
      setOpenModal("Kann nicht gelöscht werden");
      return;
    }
    try {
      const res = await fetch(`/api/satz/${Number(params.slug) + 1}`);
      if (res.ok) {
        const data = await res.json();
        setType(data.title || "");
      } else {
        console.error("Failed to fetch title");
      }
    } catch (error) {
      console.error("Error fetching title:", error);
    }
  };
  const handleDelete = async () => {
    if (params.slug === undefined) {
      setOpenModal("Kann nicht gelöscht werden");
      return;
    }
    if (!confirm("Sind Sie sicher, dass Sie löschen möchten?")) return;
    try {
      const res = await fetch(`/api/satz/${Number(params.slug) + 1}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/Satz-Regeln");
        router.refresh();
      } else {
        console.error("Failed to fetch title");
      }
    } catch (error) {
      console.error("Error fetching title:", error);
    }
  };
  const handleNew = async () => {
    if (params.slug === undefined) {
      setOpenModal("Kann nicht erstellt werden!");
      return;
    }
  };

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
          onClick={() => {
            handleClose();
            setOpenModal("Neues Dokument");
          }}
          sx={{ fontFamily: "CL" }}
        >
          <SlDoc style={{ marginRight: "5px" }} size={15} />
          Neues Dokument
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenModal("Dokument bearbeiten");
            handleEdit();
          }}
          sx={{ fontFamily: "CL" }}
        >
          <CiEdit style={{ marginRight: "5px" }} size={18} />
          Dokument bearbeiten
        </MenuItem>
        <MenuItem
          onClick={async () => {
            handleClose();
            handleDelete();
          }}
          sx={{ fontFamily: "CL" }}
        >
          <CiTrash style={{ marginRight: "5px" }} size={18} />
          Dokument löschen
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            handleClose();
            handleNew();
          }}
          sx={{ fontFamily: "CL" }}
        >
          <BsFileEarmarkText style={{ marginRight: "5px" }} size={15} />
          Neuer Text
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ fontFamily: "CL" }}>
          <BsTablet style={{ marginRight: "5px" }} size={15} />
          Tisch
        </MenuItem>
      </Menu>
      <Dialog
        open={!!openModal}
        onClose={() => setOpenModal("")}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: "CL" }}>{openModal}</DialogTitle>
        {openModal === "Kann nicht gelöscht werden" ||
        openModal === "Kann nicht erstellt werden!" ? (
          <Fragment>
            <Divider />
            <DialogTitle sx={{ fontFamily: "C" }}>
              Weil noch kein Artikel vorhanden ist oder er noch nicht ausgewählt
              wurde.
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff0000ff",
                  "&:hover": {
                    backgroundColor: "#ee0b0bff",
                  },
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={() => setOpenModal("")}
              >
                Schließen
              </Button>
            </DialogActions>
          </Fragment>
        ) : openModal === "Neues Dokument" ||
          openModal === "Dokument bearbeiten" ? (
          <Fragment>
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
                value={type || ""}
                onChange={(e) => setType(e.target.value)}
                placeholder="Typ ..."
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
                  backgroundColor:
                    openModal === "Neues Dokument" ? "#16a34a" : "#16a3a3ff",
                  "&:hover": {
                    backgroundColor:
                      openModal === "Neues Dokument" ? "#15803d" : "#138181ff",
                  },
                  marginRight: "1rem",
                  marginBottom: "1rem",
                }}
                onClick={async () => {
                  if (openModal === "Neues Dokument") {
                    await fetch("/api", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: type, text: "" }),
                    });
                  } else if (openModal === "Dokument bearbeiten") {
                    try {
                      const res = await fetch(`/api/satz/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: type }),
                      });
                      if (res.ok) {
                        console.log("OK OK");
                      } else {
                        const errorText = await res.text();
                        console.error("خطا در ویرایش:", res.status, errorText);
                      }
                    } catch (error) {
                      console.error("ERROR : ", error);
                    }
                  }
                  router.refresh();
                  setOpenModal("");
                  setType("");
                }}
              >
                {openModal === "Neues Dokument" ? "Erstellen" : "Bearbeiten"}
              </Button>
            </DialogActions>
          </Fragment>
        ) : null}
      </Dialog>
    </Fragment>
  );
};

export default Setting;
