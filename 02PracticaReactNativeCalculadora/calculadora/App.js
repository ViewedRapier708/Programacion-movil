import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);

  const num = (n) => {
    setDisplay(display === '0' ? n : display + n);
  };

  const oper = (o) => {
    setPrev(parseFloat(display));
    setOp(o);
    setDisplay('0');
  };

  const equals = () => {
    const a = prev;
    const b = parseFloat(display);
    let result = 0;

    if (op === '+') result = a + b;
    else if (op === '-') result = a - b;
    else if (op === '×') result = a * b;
    else if (op === '÷') result = a / b;

    setDisplay(result.toString());
    setPrev(null);
    setOp(null);
  };

  const clear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <Text style={styles.title}>Calculadora</Text>

        <View style={styles.display}>
          <Text style={styles.displayText}>{display}</Text>
        </View>

        <View style={styles.grid}>
          {['7','8','9','÷','4','5','6','×','1','2','3','-','0','C','=','+'].map((val, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => {
                if (val === 'C') clear();
                else if (val === '=') equals();
                else if (['+','-','×','÷'].includes(val)) oper(val);
                else num(val);
              }}
            >
              <Text style={styles.buttonText}>{val}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculator: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#154193',
    padding: 20,
    borderRadius: 0, // sin esquinas redondeadas
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  display: {
    backgroundColor: '#b0bbc398',
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 20,
    alignItems: 'flex-end',
    borderRadius: 10,
    minHeight: 80,
    justifyContent: 'center',
  },
  displayText: {
    fontSize: 36,
    color: 'black',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2f5dab',
    width: '22%',
    marginBottom: 15,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
