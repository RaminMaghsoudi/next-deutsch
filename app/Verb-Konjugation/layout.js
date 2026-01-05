import { Box } from "@mui/material";
import classess from "./page.module.css";
import { fetchAllDataVerbs } from "@/lib/Deutsch";
import ShowTitles from "@/components/showtitles/ShowTitles";

export default function Wrap({ children }) {
  const FetchAllDataVerbs = fetchAllDataVerbs();
  return (
    <Box className={classess.Wrapper}>
      <Box className={classess.WrapperBox}>
        {FetchAllDataVerbs.map((Title, index) => (
          <ShowTitles
            key={index}
            index={index}
            Title={Title}
            Type="Verb-Konjugation"
          />
        ))}
      </Box>
      {children}
    </Box>
  );
}
