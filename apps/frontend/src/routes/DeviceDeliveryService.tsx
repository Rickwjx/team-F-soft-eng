import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DeviceDeliveryFormSubmission } from "../common/formSubmission/DeviceDeliveryFormSubmission.ts";
import medDeviceBackground from "../images/medDeviceBackground.jpg";
import { DeviceSubmitButton } from "../components/buttons/DeviceSubmitButton.tsx";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import DocsTools from "../images/servicePageImages/FormIcons/DocsTools.jpg";
import IV from "../images/servicePageImages/FormIcons/IV.jpg";
import SurgicalInstruments from "../images/servicePageImages/FormIcons/SurgicalInstruments.jpg";
import HospBed from "../images/servicePageImages/FormIcons/HospBed.png";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import NodeDropDown from "../components/dropdown/NodeDropDown.tsx";
import {CenterAlignedNumTextbox} from "../components/textbox/CenterAlignedNumTextbox.tsx";

function DeviceDeliveryService() {
  const [form, setFormResponses] = useState<DeviceDeliveryFormSubmission>({
    name: "",
    employeeID: -1,
    roomNum: "",
    beds: "",
    docTools: "",
    IV: "",
    surgery: "",
    priority: "",
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

  function handleEmployeeIDInput(event: SelectChangeEvent) {
    setFormResponses({ ...form, employeeID: event.target.value as unknown as number});
    return event.target.value;
  }

  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, roomNum: e.target.value });
    return e.target.value;
  }

  function handleBedsInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, beds: e.target.value });
    // return e.target.value;
  }

  function handleToolsInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, docTools: e.target.value });
    return e.target.value;
  }

  function handleIVInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, IV: e.target.value });
    return e.target.value;
  }

  function handleSurgeryInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, surgery: e.target.value });
    return e.target.value;
  }

  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }


  function clear() {
    setFormResponses({
      name: "",
      employeeID: -1,
      roomNum: "",
      priority: "",
      beds: "",
      docTools: "",
      IV: "",
      surgery: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "transparent",
          width: "75%", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Typography
          align={"center"}
          fontStyle={"Open Sans"}
          color={'white'}
        >
          Sebastian Gurgol, Jingxu (Rick) Wang
        </Typography>
        <Grid
          item
          xs={12}
          paddingBottom={2}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <ServiceNavTabs />
        </Grid>
        <Grid container sx={{ background: "white", opacity: 0.95}} boxShadow={5} borderRadius={5}>
        <Grid
          item
          xs={12}
          sx={{
          }}
        >
          <Typography color={"black"} align={"center"} fontSize={40}>
            Medical Device Request Form
          </Typography>
        </Grid>
          <Grid
            item
            xs={12}
            mt={3}
          >
            <Typography
              align={"center"}
              fontStyle={"Open Sans"}
              fontSize={24}
            >
              Enter Amount of Each Type:
            </Typography>
          </Grid>

          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={HospBed} title={"Hospital Bed"} description={""} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={DocsTools} title={"Doctor Tool Set"} description={""} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={IV} title={"IV Apparatus"} description={""} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={SurgicalInstruments} title={"Surigcal Tool Set"} description={""} />
          </Grid>

          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Bed Amount"}
              value={form.beds}
              onChange={handleBedsInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Doctor Tool Set Amount"}
              value={form.docTools}
              onChange={handleToolsInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"IV Apparatus Amount"}
              value={form.IV}
              onChange={handleIVInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Surgical Tool Amount"}
              value={form.surgery}
              onChange={handleSurgeryInput}
              type={"number"} />
          </Grid>

          <Grid item xs={3} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={3} mt={5} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={3} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <NodeDropDown handleChange={handleLocationInput} label={"Location"} returnedNodeID={form.roomNum} filterRoomsOnly={true}/>
          </Grid>
          <Grid item xs={3} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Priority of Medical Device Delivery:
            </Typography>
            <RadioButtonsGroup
              label={"Priority"}
              options={["Low", "Medium", "High", "Emergency"]}
              returnData={form.priority}
              handleChange={handlePriorityInput}
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
            <DeviceSubmitButton input={form} text={"SUBMIT"} clear={clear} />
          </Grid>
        </Grid>
      </Grid>

    </Stack>
  );
}

export default DeviceDeliveryService;
