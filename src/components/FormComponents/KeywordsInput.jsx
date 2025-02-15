import React, { useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  TextField,
  Button,
  Grid,
  Chip,
  InputAdornment,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { ArrowDownward } from "@material-ui/icons";
import keywordList from "../../keywordList";
import { En, Fr } from "../I18n";
import translate from "../../utils/i18n";

const KeywordsInput = ({
  onChange,
  value = { en: [], fr: [] },
  name,
  disabled,
}) => {
  const { language } = useParams();
  const [selectedKeyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedKeywordAltLang, setSelectedKeywordAltLang] = useState("");

  const languages = ["en", "fr"];

  if (language === "fr") languages.reverse();
  const altLanguage = languages[1];

  function cleanList(list) {
    return list
      .map((item) => (item || "").trim())
      .filter((item, i, arr) => item && arr.indexOf(item) === i);
  }

  function handleDelete(chipText, deletedChipLang) {
    return () => {
      const newValue = {
        en: value.en,
        fr: value.fr,
        [deletedChipLang]: value[deletedChipLang].filter(
          (keyword) => keyword !== chipText
        ),
      };

      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    };
  }
  function handleHelperChange() {
    const keyword = selectedKeyword || inputValue;
    if (keyword || selectedKeywordAltLang) {
      const newValue = { en: value.en, fr: value.fr };

      const userKeywordList = [...value[language], keyword];
      const userKeywordListAlt = [
        ...value[altLanguage],
        selectedKeywordAltLang,
      ];

      if (keyword) newValue[language] = cleanList(userKeywordList);
      if (selectedKeywordAltLang)
        newValue[altLanguage] = cleanList(userKeywordListAlt);

      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    }
    setKeyword("");
    setSelectedKeywordAltLang("");
    setInputValue("");
  }

  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          disabled={disabled}
          onChange={(e, keyword) =>
            setSelectedKeywordAltLang(translate(keyword, altLanguage))
          }
          value={selectedKeyword || ""}
          freeSolo
          renderOption={(option) => translate(option, language) || option}
          options={keywordList}
          getOptionLabel={(option) => translate(option, language) || option}
          fullWidth
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label={language.toUpperCase()}
            />
          )}
        />
      </Grid>
      <Grid item xs>
        <TextField
          value={selectedKeywordAltLang || ""}
          onChange={(e) => setSelectedKeywordAltLang(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {altLanguage.toUpperCase()}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={3}>
        <Button
          disabled={
            disabled ||
            (!selectedKeyword && !selectedKeywordAltLang && !inputValue)
          }
          startIcon={<ArrowDownward />}
          onClick={handleHelperChange}
        >
          <En>Add</En>
          <Fr>Ajouter</Fr>
        </Button>
      </Grid>

      <Grid item xs>
        {languages
          .filter((lang) => value[lang] && value[lang].length)
          .map((lang) => (
            <div style={{ margin: "15px" }} key={lang}>
              {true && (
                <InputAdornment style={{ margin: "10px" }}>
                  {lang.toUpperCase()}
                </InputAdornment>
              )}
              <Grid container direction="row">
                <Grid item xs>
                  {(value[lang] || []).map((keyword) => (
                    <Chip
                      key={keyword}
                      disabled={disabled}
                      label={keyword}
                      onDelete={handleDelete(keyword, lang)}
                      color="primary"
                      style={{ margin: "5px" }}
                    />
                  ))}
                </Grid>
              </Grid>
            </div>
          ))}
      </Grid>
    </Grid>
  );
};

export default KeywordsInput;
