import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Select,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { DeviceDeliveryFormSubmission } from "../common/DeviceDeliveryFormSubmission.ts";
import TopBanner from "../components/TopBanner.tsx";
import medDeviceBackground from "../images/medDeviceBackground.jpg";
import { DeviceSubmitButton } from "../components/DeviceSubmitButton.tsx";
import axios from "axios";
// import MoreMenuItem from "../components/MoreMenuItem.tsx";

function DeviceDeliveryService() {
  const [form, setFormResponses] = useState<DeviceDeliveryFormSubmission>({
    name: "",
    roomNum: "",
    device: "",
    amount: "",
    priority: "",
    status: "",
  });

  // Arrays for Medical Devices Categories and Devices
  // const medDevices: string[] = [
  //   "Analytical Instruments",
  //   "Cardiology",
  //   "Dental",
  //   "Genetics",
  //   "Imaging",
  //   "Lab Equipment",
  //   "Microscopy",
  //   "Neurology",
  //   "Physiotherapy",
  //   "Refrigeration",
  //   "Spectroscopy",
  //   "Ultrasound",
  // ];

  // const analyticalInstruments: string[] = ["Blood Gas Analysis", "Electrolyte Analysis", "Flowmeter"];
  // const cardiology: string[] = ["Automatic External Defibrillator", "Electrocardiograph", "Pacing System"];
  // const dental: string[] = ["Dental Compressor System", "Elements Obturation Unit", "Intraoral Camera"];
  // const genetics: string[] = ["DNA Sequencing System", "Flow Cytometer", "SPS Sample Preparation System"];
  // const imaging: string[] = ["CT Scanner", "Fluoroscopy System", "MRI Scanner"];
  // const labEquipment: string[] = ["Flame Sterilizer", "Medical Autoclave", "Optical Imaging System"];
  // const microscopy: string[] = ["Atomic Force Microscopy", "Cell Analysis System", "Microbial Detector"];
  // const neurology: string[] = ["Checkpoint Stimulator", "Nerve Monitoring System", "NIBP Simulator"];
  // const physiotherapy: string[] = ["Power Shockwave Therapy", "Pressotherapy Device", "Pump Vacuum Therapy Unit"];
  // const refrigeration: string[] = ["Plasma Refrigerator", "Vaccine Refigerator"];
  // const spectroscopy: string[] = ["CD Spectropolarimeter", "NMR Spectrometer", "Rapid Kinetics Spectrometer"];
  // const ultrasound: string[] = ["Display Doppler", "Ultrasonic Doppler", "Ultrasound Machine"];

  // Nested Menu Functions
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // // const open = Boolean(anchorEl);
  // // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // //   setAnchorEl(event.currentTarget);
  // // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // Form Functions
  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }

  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, roomNum: e.target.value });
    return e.target.value;
  }

  function handleDeviceInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, device: e.target.value });
    // return e.target.value;
  }

  function handleAmountInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, amount: e.target.value });
    return e.target.value;
  }

  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }

  function clear() {
    setFormResponses({
      name: "",
      roomNum: "",
      priority: "",
      device: "",
      amount: "",
      status: "",
    });
  }

  // Define an interface for the node data
  interface NodeData {
    longName: string;
  }

  // Storing the node numbers in a use state so that we only make a get request once
  const [nodeNumbers, setNodeNumbers] = useState<string[]>([]);

  // GET request to retrieve node numbers wrapped in a useEffect function
  useEffect(() => {
    axios
      .get<NodeData[]>("/api/database/nodes")
      .then((response) =>
        setNodeNumbers(response.data.map((node) => node.longName)),
      )
      .catch((error) => console.error(error));
  }, []);

  const [submittedData, setSubmittedData] = useState<
    DeviceDeliveryFormSubmission[]
  >([]);

  function updateList() {
    setSubmittedData([...submittedData, form]);
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100vw",
        height: "auto",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        backgroundImage: `url(${medDeviceBackground})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <TopBanner />
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        boxShadow={4}
        sx={{
          backgroundColor: "white",
          width: "40vw", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Grid
          item
          sx={{
            backgroundColor: "#186BD9",
          }}
        >
          <Typography
            color={"white"}
            align={"center"}
            fontSize={40}
            padding={1}
          >
            Medical Device Request Form
          </Typography>
        </Grid>
        <Grid container padding={2} direction={"row"}>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"}>Name:</Typography>
            <LeftAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"}>Location:</Typography>
            <DropDown
              label={"Location"}
              returnData={form.roomNum}
              handleChange={handleLocationInput}
              items={nodeNumbers}
            />
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"}>Medical Device Needed:</Typography>
            <LeftAlignedTextbox
              label={"Medical Device"}
              value={form.device}
              onChange={handleDeviceInput}
            />
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"}>Amount Needed:</Typography>
            <LeftAlignedTextbox
              onChange={handleAmountInput}
              label={"Amount"}
              value={form.amount}
            />
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"} textAlign={"center"} paddingTop={3}>
              Priority of Medical Device Delivery:
            </Typography>
            <RadioButtonsGroup
              label={"Priority"}
              options={["Low", "Medium", "High", "Emergency"]}
              returnData={form.priority}
              handleChange={handlePriorityInput}
            />
          </Grid>
          <Grid item sx={{ m: "auto" }}>
            <Typography color={"black"} textAlign={"center"} paddingTop={3}>
              Status of the Request:
            </Typography>
            <RadioButtonsGroup
              label={"Status"}
              options={["Unassigned", "Assigned", "InProgress", "Closed"]}
              returnData={form.status}
              handleChange={handleStatusInput}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              my: 2,
              justifyContent: "center",
            }}
          >
            <DeviceSubmitButton
              input={form}
              text={"SUBMIT"}
              clear={clear}
              updateList={updateList}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: "40vw",
          backgroundColor: "white",
          width: "60vw", //Adjust this to change the width of the table
          height: "auto",
          mb: "5vh",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Device</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((item: DeviceDeliveryFormSubmission) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align={"right"}>
                  {item.name}
                </TableCell>
                <TableCell align={"right"}>{item.name}</TableCell>
                <TableCell align={"right"}>{item.status}</TableCell>
                <TableCell align={"right"}>{item.roomNum}</TableCell>
                <TableCell align={"right"}>{item.priority}</TableCell>
                <TableCell align={"right"}>{item.device}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Sebastian Gurgol, Jingxu (Rick) Wang</Typography>
    </Stack>
  );
}

export default DeviceDeliveryService;
