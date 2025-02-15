import React, { useState } from "react";

import {
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { Add, Delete } from "@material-ui/icons";
import Contact from "../FormComponents/Contact";

import SelectInput from "../FormComponents/SelectInput";
import {
  QuestionText,
  SupplementalText,
  paperClass,
} from "../FormComponents/QuestionStyles";

import { En, Fr, I18n } from "../I18n";
import RequiredMark from "../FormComponents/RequiredMark";
import { validateField } from "../../utils/validate";
import { deepCopy } from "../../utils/misc";
import ContactTitle from "../FormComponents/ContactTitle";

const ContactTab = ({ disabled, record, handleInputChange, userContacts }) => {
  const name = "contacts";

  const value = record.contacts || [];

  const initial = {
    role: [],
    orgName: "",
    orgEmail: "",
    orgURL: "",
    orgAdress: "",
    orgCity: "",
    orgCountry: "",
    indName: "",
    indPosition: "",
    indEmail: "",
  };
  const [activeContact, setActiveContact] = useState(0);

  const contactList = Object.values(userContacts || {});

  function handleAddContact(index) {
    handleInputChange({
      target: {
        name: "contacts",
        value: value.concat(contactList[index]),
      },
    });
    setActiveContact(value.length);
  }

  function addItem() {
    const changes = {
      target: {
        name,
        value: value.concat(deepCopy(initial)),
      },
    };

    handleInputChange(changes);
    setActiveContact(value.length);
  }
  function handleChange(e) {
    const newValue = [...value];
    const propName = e.target.name;
    newValue[activeContact][propName] = e.target.value;
    const parentEvent = { target: { name, value: newValue } };
    handleInputChange(parentEvent);
  }
  function removeItem() {
    handleInputChange({
      target: {
        name,
        value: value.filter((e, index) => index !== activeContact),
      },
    });
    if (value.length) setActiveContact(value.length - 2);
  }
  const contact = value[activeContact];
  return (
    <Grid container spacing={3}>
      <Paper style={paperClass}>
        <Grid item xs>
          <QuestionText>
            <En>
              Please enter at least one Metadata Contact AND one Data Contact
              for this dataset that can work with CIOOS Staff to finalize this
              Metadata Record. It is important to include all individuals from
              the chain of attribution to ensure all involved parties are
              credited appropriately for their role in creating this dataset
              Saved contacts can be selected from the list below
            </En>
            <Fr>
              Veuillez saisir au moins un contact pour les métadonnées ET un
              contact de données pour ce jeu de données. Ces personnes
              pourraient être appelées à collaborer avec le personnel de la DSIO
              pour finaliser cet enregistrement. Il est important d'inclure
              toutes les personnes ayant travaillé sur le jeu de données afin de
              s'assurer que toutes les parties concernées soient créditées de
              façon appropriée pour leur rôle dans la création de ce jeu de
              données. Les contacts sauvegardés peuvent être sélectionnés dans
              la liste ci-dessous.
            </Fr>
            <RequiredMark passes={validateField(record, "contacts")} />
            <SupplementalText>
              <En>
                If you have any saved contacts you can select them from the
                list.
              </En>
              <Fr>
                Si vous avez des contacts enregistrés, vous pouvez les
                sélectionner dans la liste.
              </Fr>
            </SupplementalText>
          </QuestionText>
        </Grid>
      </Paper>
      <Grid container direction="row" style={{ marginLeft: "5px" }}>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              Contact(s):
              <List>
                {value.map((contactItem, i) => {
                  return (
                    <ListItem
                      key={i}
                      button
                      onClick={() => setActiveContact(i)}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontWeight: activeContact === i ? "bold" : "",
                            }}
                          >
                            {i + 1}. <ContactTitle contact={contactItem} />
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>

            <Grid item xs>
              <Button
                disabled={disabled}
                startIcon={<Add />}
                onClick={addItem}
                style={{ height: "56px", marginLeft: "10px" }}
              >
                <En>Add new contact</En>
                <Fr>Ajouter un contact</Fr>
              </Button>
            </Grid>
            <Grid item xs>
              <SelectInput
                style={{}}
                value=""
                labelId="add-existing"
                onChange={(e) => handleAddContact(e.target.value)}
                optionLabels={contactList.map((contactItem) => (
                  <ContactTitle contact={contactItem} />
                ))}
                options={contactList.map((v, i) => i)}
                disabled={!contactList.length || disabled}
                label={<I18n en="Add saved contact" fr="Ajouter un contact" />}
              />
            </Grid>
          </Grid>
        </Grid>

        {contact && (
          <Grid item xs>
            <Grid container direction="column">
              <Paper style={paperClass}>
                <Grid container direction="column" spacing={3}>
                  <Grid item xs>
                    <Contact
                      showRolePicker
                      value={contact}
                      onChange={handleChange}
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="row" spacing={3}>
                      <Grid item xs>
                        <Button
                          startIcon={<Delete />}
                          disabled={disabled}
                          onClick={removeItem}
                        >
                          <En>Remove contact</En>
                          <Fr>Supprimer le contact</Fr>
                        </Button>
                      </Grid>
                      {/* <Grid item xs>
                      <Button
                        startIcon={
                          isSavingContact ? <CircularProgress /> : <Save />
                        }
                        disabled={
                          disabled || (!contact.orgName && !contact.indName)
                        }
                        onClick={() => saveContact(i)}
                      >
                        <En>Save to stored contacts</En>
                        <Fr>Supprimer contact</Fr>
                      </Button>
                    </Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ContactTab;
