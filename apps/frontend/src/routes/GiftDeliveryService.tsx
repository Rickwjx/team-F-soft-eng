import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { GiftDeliveryFormSubmission } from "../common/GiftDeliveryFormSubmission.ts";
import TopBanner from "../components/TopBanner.tsx";
import sanitationBackground from "../images/sanitationBackground.webp";
//import { SanitationSubmitButton } from "../components/SanitationSubmitButton.tsx";
import axios from "axios";

function GiftDeliveryService() {
  const [form, setFormResponses] = useState<GiftDeliveryFormSubmission>({
    name: "",
    recipientName: "",
    status: "",
    location: "",
    message: "",
    priority: "",
    giftAddOn: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }
  function handlerecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, recipientName: e.target.value });
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }
  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, location: e.target.value });
    return e.target.value;
  }
  function handleMessageInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, message: e.target.value });
  }
  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }

  function handleGiftAddOnInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, giftAddOn: e.target.value });
    return e.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      recipientName: "",
      status: "",
      location: "",
      message: "",
      priority: "",
      giftAddOn: "",
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
        backgroundImage: `url(${sanitationBackground})`,
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
        direction={"row"}
        rowSpacing={1}
        columnSpacing={5}
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
          xs={12}
          sx={{
            backgroundColor: "#186BD9",
          }}
        >
          <Typography color={"white"} align={"center"} fontSize={40}>
            Gift Delivery Service
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Name:</Typography>
          <LeftAlignedTextbox
            label={"Name"}
            value={form.name}
            onChange={handleNameInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Location:</Typography>
          <DropDown
            label={"Location"}
            returnData={form.location}
            handleChange={handleLocationInput}
            items={nodeNumbers}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Recipient Name:</Typography>
          <LeftAlignedTextbox
            label={"Recipient Name"}
            value={form.recipientName}
            onChange={handlerecipientNameInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Optional Message:</Typography>
          <LeftAlignedTextbox
            label={"Optional Message"}
            value={form.message}
            onChange={handleMessageInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Priority :</Typography>
          <RadioButtonsGroup
            label={"Priority"}
            options={["Standard Delivery", "Express Delivery", "Same Day Delivery", "Emergency Delivery"]}
            returnData={form.priority}
            handleChange={handlePriorityInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Optional Gift Add-on :</Typography>
          <RadioButtonsGroup
            label={"Gift Add-on"}
            options={["1", "2", "3", "4"]}
            returnData={form.giftAddOn}
            handleChange={handleGiftAddOnInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Priority :</Typography>
          <RadioButtonsGroup
            label={"Priority"}
            options={["Unassigned", "assigned", "In Progress", "Emergency"]}
            returnData={form.status}
            handleChange={handleStatusInput}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color={"black"}>Status of the request:</Typography>
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
          <SanitationSubmitButton input={form} text={"SUBMIT"} clear={clear} />
        </Grid>
      </Grid>
      <Typography>Yitao Hong, Araya Remillard</Typography>
    </Stack>
  );
}

export default GiftDeliveryService;
