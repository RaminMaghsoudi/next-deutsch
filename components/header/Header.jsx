import { Box, Tooltip } from "@mui/material";
import classess from "./Header.module.css";
import NavLink from "../menu/NavLink";
import { GoSun } from "react-icons/go";
import Setting from "./Setting";
import HeaderInput from "./HeaderInput";

export default function HeaderPage() {
  return (
    <Box className={classess.HeaderPage}>
      <Box>
        <NavLink href="/Satz-Regeln">Satz-Regeln</NavLink>
        <NavLink href="/Verb-Konjugation">Verb-Konjugation</NavLink>
      </Box>
      <Box className={classess.HeaderPageRight}>
        <HeaderInput />
        <Box className={classess.Chars}>
          <Tooltip arrow title="ALT+0233">
            <Box className={classess.Char}>é</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0223">
            <Box className={classess.Char}>ß</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0220">
            <Box className={classess.Char}>Ü</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0252">
            <Box className={classess.Char}>ü</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0214">
            <Box className={classess.Char}>Ö</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0246">
            <Box className={classess.Char}>ö</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0196">
            <Box className={classess.Char}>Ä</Box>
          </Tooltip>
          <Tooltip arrow title="ALT+0228">
            <Box className={classess.Char}>ä</Box>
          </Tooltip>
        </Box>
      </Box>
      <Setting />
      <GoSun size={18} style={{ color: "#646464", marginRight: "1rem" }} />
    </Box>
  );
}
