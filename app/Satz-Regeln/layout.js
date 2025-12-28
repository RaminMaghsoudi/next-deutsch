import Satzen from "@/components/satzen/Satzen";
import { Box } from "@mui/material";
import classess from "./page.module.css";

export default function SaztLayout({ children }) {
  return (
    <Box className={classess.SaztLayout}>
      <Box className={classess.SatzRegeln}>
        {/* {Texts.map((Satz, index) => (
          <Satzen key={index} index={index} Satz={Satz} />
        ))} */}
      </Box>
      {children}
    </Box>
  );
}
