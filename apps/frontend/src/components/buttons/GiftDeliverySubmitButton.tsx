import {Alert, AlertProps, Button, Snackbar, Stack} from "@mui/material";
import { forwardRef, useState } from "react";
import { GiftDeliveryFormSubmission } from "../../common/formSubmission/GiftDeliveryFormSubmission.ts";
import { HTTPResponseType } from "common/src/HTTPResponseType.ts";
import axios, { isAxiosError } from "axios";
import InitCart from "../../common/InitCart.ts";
import {Link} from "react-router-dom";

interface ButtonProps {
  text: string;
  input: GiftDeliveryFormSubmission;
  clear: () => void;
  displayConfetti: () => void;
  hideConfetti: () => void;
  //updateList: () => void;
}

export function GiftDeliverySubmitButton(props: ButtonProps) {
  // Logic for snackbar alert
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
    function SnackbarAlert(props, ref) {
      return <Alert elevation={6} ref={ref} {...props} />;
    },
  );

  function handleShowConfetti() {
    props.displayConfetti();

    const duration = 7000; // 7 seconds

    setTimeout(() => {
      props.hideConfetti();
    }, duration);
  }

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function openWithSuccess() {
    setType("success");
    setMessage("Form submitted successfully!");
    setOpen(true);
  }

  function openWithError(message: string) {
    setType("error");
    setMessage(message);
    setOpen(true);
  }

  // Handles the onClick for the submit button and will continue only if all required fields are filled out
  async function handleSubmit() {
    if (props.input.location === "") {
      openWithError("Please select a room");
    } else if (props.input.employeeID === -1){
      openWithError("Please enter your employee ID");
    } else if (props.input.name === "") {
      openWithError("Please enter your name");
    } else if (props.input.delivery === "") {
      openWithError("Please select a priority");
    } else if (props.input.balloons == "" && props.input.cards == "" && props.input.bears == ""){
      openWithError("Please select a gift");
    }
      else if (props.input.recipientName === "") {
      openWithError("Please enter a Recipient Name");
    } else {
      console.log(props.input);
      const submission = props.input;
      console.log(props.input);

      const result: { success: boolean; data: HTTPResponseType } =
        await pushToDB(submission);

      if (!result.success) {
        openWithError(
          `Failed to post form data to database: ${result.data.message}`,
        );
      } else {
        handleClear();
        openWithSuccess();
        handleShowConfetti();
        InitCart.setGifts(props.input);
        InitCart.loadGifts();
        InitCart.loadGiftAmounts();
      }
    }
  }

  function handleClear() {
    props.clear();
  }

  // Commenting this out for iteration 2
  // Function for posting the form submission to the database
  async function pushToDB(form: GiftDeliveryFormSubmission) {
    const returnData = {
      employeeID: form.employeeID,
      nodeID: form.location,
      serviceType: "gift-delivery",
      services: form,
    };

    let statusCode = undefined;
    let data: HTTPResponseType;

    try {
      const res = await axios.post("/api/database/servicerequest", returnData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      statusCode = res.status;
      data = JSON.parse(JSON.stringify(res.data));
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response != null) {
          data = JSON.parse(JSON.stringify(e.response!.data));
          console.log(`Failed to send form data to database: ${data.message}`);
        } else {
          data = {
            message: "Unknown error",
          };
          console.log(`Failed to send form data to database: ${data.message}`);
        }
      } else {
        data = {
          message: "Unknown error",
        };
        console.log(`Failed to send form data to database: ${data.message}`);
      }
    }

    if (statusCode != undefined) {
      console.log(`Success: response code - ${statusCode}`);
      return {
        success: true,
        data: data!,
      };
    }

    return {
      success: false,
      data: data!,
    };
  }

  return (
    <Stack
      direction={"row"}
      spacing={3}>
    <Button
      variant="contained"
      id={"submitButton"}
      onClick={() => handleSubmit()}
    >
      {props.text}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {/*@ts-expect-error Severity will only be of type "success" or "error"*/}
        <SnackbarAlert severity={type}>{message}</SnackbarAlert>
      </Snackbar>
    </Button>
      <Link to={"/Cart"}>
      <Button
        variant={"outlined"}
        id={"toCart"}
      >
        To Cart
      </Button>
      </ Link>
    </Stack>
  );
}
