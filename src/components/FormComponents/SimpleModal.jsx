import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { En, Fr } from "../I18n";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ open, onClose, onAccept }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            <En>Are you sure?</En>
            <Fr>Vous êtes sûr ?</Fr>
          </h2>
          <button
            type="button"
            onClick={() => {
              onClose();
              onAccept();
            }}
          >
            <En>Yes</En>
            <Fr>Oui</Fr>
          </button>
          <button type="button" onClick={onClose}>
            <En>No</En>
            <Fr>Non</Fr>
          </button>
        </div>
      </Modal>
    </div>
  );
}
