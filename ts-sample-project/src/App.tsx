import React, { ReactElement, useState, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ResultCard from './ResultCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 24
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const SwitchWrapper = styled.span`
  margin-left: 30px;
`;

const App = (props): ReactElement => {
  const { Fib } = props;
  const [isSurpriseRevealed, enableSurprise] = useState(false);
  const [index, setIndex] = useState('');
  const [jsResult, setJSResult] = useState();
  const [jsNativeResult, setJSNativeResult] = useState();
  const [rustResult, setRustResult] = useState();

  const setSurpriseState = useCallback(
    event => {
      enableSurprise(event.target.checked);
    },
    [enableSurprise]
  );

  const refreshJSResult = useCallback(async () => {
    const indexAsNumber = Number.parseInt(index);
    if (Number.isInteger(indexAsNumber) && indexAsNumber >= 0) {
      setJSResult({ loading: true });
      setJSResult(await Fib.js(indexAsNumber));
    } else {
      setJSResult({ loading: false });
    }
  }, [setJSResult, index]);

  const refreshJSNativeResult = useCallback(async () => {
    const indexAsNumber = Number.parseInt(index);
    if (Number.isInteger(indexAsNumber) && indexAsNumber >= 0) {
      setJSNativeResult({ loading: true });
      setJSNativeResult(await Fib.jsNative(indexAsNumber));
    } else {
      setJSNativeResult({ loading: false });
    }
  }, [setJSNativeResult, index]);

  const refreshRustResult = useCallback(async () => {
    const indexAsNumber = Number.parseInt(index);
    if (Number.isInteger(indexAsNumber) && indexAsNumber >= 0) {
      setRustResult({ loading: true });
      setRustResult(await Fib.rust(indexAsNumber));
    } else {
      setRustResult({ loading: false });
    }
  }, [setRustResult, index]);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      refreshJSResult();
      refreshJSNativeResult();
      refreshRustResult();
    },
    [refreshJSResult, refreshJSNativeResult, refreshRustResult]
  );
  const classes = useStyles(props);

  return (
    <main>
      <form onSubmit={onSubmit}>
        <TextField
          label="Index"
          type="number"
          min="0"
          value={index}
          onChange={event => setIndex(event.target.value)}
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Generate
        </Button>
        <SwitchWrapper>
          <FormControlLabel
            control={
              <Switch
                checked={isSurpriseRevealed}
                onChange={setSurpriseState}
                value="surprise"
              />
            }
            label="A little surprise"
          />
        </SwitchWrapper>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <ResultCard
                avatar="JS"
                header="JS Result"
                onRefresh={refreshJSResult}
                {...jsResult}
              />
            </Grid>
            {isSurpriseRevealed && (
              <Grid item xs={4}>
                <ResultCard
                  avatar="NJS"
                  header="Native JS Result"
                  onRefresh={refreshJSNativeResult}
                  {...jsNativeResult}
                />
              </Grid>
            )}
            <Grid item xs={4}>
              <ResultCard
                avatar="R"
                header="Rust Result"
                onRefresh={refreshRustResult}
                {...rustResult}
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </main>
  );
};

export default App;
