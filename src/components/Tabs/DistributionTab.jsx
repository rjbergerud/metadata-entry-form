import React from "react";

import { Paper } from "@material-ui/core";

import Distribution from "../FormComponents/Distribution";
import { En, Fr } from "../I18n";

import RequiredMark from "../FormComponents/RequiredMark";
import {
  paperClass,
  QuestionText,
  SupplementalText,
} from "../FormComponents/QuestionStyles";
import { validateField } from "../../utils/validate";

const DistributionTab = ({ disabled, record, handleInputChange }) => {
  return (
    <div>
      <Paper style={paperClass}>
        <QuestionText>
          <En>Enter any links to information associated with this dataset.</En>
          <Fr>
            Entrez les liens vers les informations associées à ce jeu de
            données.
          </Fr>
          <RequiredMark passes={validateField(record, "distribution")} />
          <SupplementalText>
            <En>
              Some examples of resources are:
              <ul>
                <li>supporting documentation (eg text or pdf files)</li>
                <li>CSV files</li>
                <li>ERDDAP datasets</li>
                <li>images</li>
              </ul>
              At least one item is required.
            </En>
            <Fr>
              Voici quelques exemples de ressources :
              <ul>
                <li>
                  Documentation à l'appui (par exemple, fichiers texte ou pdf)
                </li>
                <li>Fichiers CSV</li>
                <li>Jeux de données ERDDAP</li>
                <li>Images</li>
              </ul>
              Au moins une ressource est requise.
            </Fr>
          </SupplementalText>
        </QuestionText>
      </Paper>
      <Distribution
        name="distribution"
        paperClass={paperClass}
        value={record.distribution || []}
        onChange={handleInputChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DistributionTab;
