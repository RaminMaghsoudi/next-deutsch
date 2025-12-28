"use client";
import { Box } from "@mui/material";
import { BiChevronRight } from "react-icons/bi";
import classess from "./Satzen.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Satzen({ index, Satz }) {
  const path = usePathname();
  const href = `/Satz-Regeln/${index}`;
  const isActive = path === href;

  return (
    <Box
      className={classess.SatzBox}
      sx={{ marginTop: index === 0 ? "15px" : "0px" }}
    >
      <Box className={classess.IconBox}>
        <BiChevronRight size={15} />
      </Box>
      <Link
        href={href}
        className={
          isActive
            ? `${classess.SatzText} ${classess.active}`
            : classess.SatzText
        }
      >
        {Satz}
      </Link>
    </Box>
  );
}
