import Satzen from "@/components/satzen/Satzen";
import { Box } from "@mui/material";
import classess from "./page.module.css";
import { fetchAllDataSatz } from "@/lib/Deutsch";

export default function SaztLayout({ children }) {
  const FetchAllDataSatz = fetchAllDataSatz();
  return (
    <Box className={classess.SaztLayout}>
      <Box className={classess.SatzRegeln}>
        {FetchAllDataSatz.map((Satz, index) => (
          <Satzen key={index} index={index} Satz={Satz} />
        ))}
      </Box>
      {children}
    </Box>
  );
}
