import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

export default () => {
  let [displayValue, setDisplayValue] = useState('0');
  let [clearDisplay, setClearDisplay] = useState(false);
  let [operation, setOperationV] = useState(null);
  let [values, setValues] = useState([0, 0]);
  let [current, setCurrent] = useState(0);

  const addDigit = (value) => {
    const clearDisplayOp = displayValue === '0' || clearDisplay;

    if (value === '.' && !clearDisplay && displayValue.includes('.')) {
      return;
    }

    const currentValueOp = clearDisplayOp ? '' : displayValue;
    const displayValueOp = currentValueOp + value;
    setDisplayValue(displayValueOp);
    setClearDisplay(false);

    if (value !== '.') {
      const newValue = parseFloat(displayValueOp);
      const valuesOp = [...values];
      valuesOp[current] = newValue;
      setValues(valuesOp);
    }
  };

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperationV(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const setOperation = (value) => {
    if (current === 0) {
      setOperationV(value);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operation === '=';
      const valuesOp = [...values];
      try {
        valuesOp[0] = eval(`${valuesOp[0]} ${operation} ${valuesOp[1]}`);
      } catch (err) {
        valuesOp[0] = values[0];
      }
      valuesOp[1] = 0;

      setDisplayValue(`${valuesOp[0]}`);
      setOperationV(equals ? null : value);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(valuesOp);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={setOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={setOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={setOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={setOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={setOperation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
