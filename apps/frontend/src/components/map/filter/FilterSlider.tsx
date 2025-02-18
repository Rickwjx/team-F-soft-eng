import {Box, Button, Stack, SxProps, Theme} from "@mui/material";
import Slide from "@mui/material/Slide";
import {useState} from "react";
import FilterList from "frontend/src/components/map/filter/FilterList.tsx";
import useWindowSize from "frontend/src/hooks/useWindowSize.tsx";
import {IFilterState} from "frontend/src/hooks/useFilters.tsx";
import {FilterType} from "frontend/src/common/types/FilterType.ts";

interface FilterSelectorProps {
  filterInfo: Map<FilterType, IFilterState>;
  handleIconStateChange: (filterType: FilterType, newState: boolean) => void;

  handleSelectAllFilters: () => void;
  handleSelectNofilters: () => void;

  sx?: SxProps<Theme>;
}

export default function FilterSlider(props: FilterSelectorProps) {
  const [filterMenuShown, setFilterMenuShown] = useState<boolean>(false);
  const [sendFilterMenuToBack, setSendFilterMenuToBack] = useState<boolean>(true);
  const [, windowHeight] = useWindowSize();

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={props.sx}
    >
      <Button
        variant={"contained"}
        sx={{
          width: "100%",
        }}
        onClick={() => {
          setSendFilterMenuToBack(false);
          setFilterMenuShown(true);
        }}
      >
        Edit Filters
      </Button>
      <Box
        position={"fixed"}
        width={"18%"}
        height={`${windowHeight - 120}px`}
        top={"120px"}
        left={0}
        overflow={"hidden"}
        sx={{
          marginTop: "0 !important",
          ...sendFilterMenuToBack ? { zIndex: -5} : {zIndex: 100},
        }}
      >
        <Slide
          in={filterMenuShown}
          direction="up"
          style={{
            zIndex: 100,
            backgroundColor: "#F5F7FA",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minWidth: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
          mountOnEnter
          addEndListener={() => {
            if(!filterMenuShown) setSendFilterMenuToBack(true);
          }}
        >
          <div>
            <FilterList
              hideFilterMenu={() => setFilterMenuShown(false)}
              filterInfo={props.filterInfo}
              handleIconStateChange={props.handleIconStateChange}
              handleSelectAllFilters={props.handleSelectAllFilters}
              handleSelectNoFilters={props.handleSelectNofilters}
            />
          </div>
        </Slide>
      </Box>
    </Stack>
  );
}
