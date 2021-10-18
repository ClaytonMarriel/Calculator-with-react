import React, { Component } from "react";
import "./Calculator.css";

import Button from "../Button/Button";
import Display from "../Display/Display";

//Estado inicial
const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  //Startando o estado/ criando o clone do objeto e atribuiu ao state
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    //Verifica se é a primeira posição do array
    //Se for true, quando for clicado na operação
    //A posição do array irá mudar e o display será limpo
    //Para adicionar um novo valor
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      //Calculo do valor em cima da função eval(Refatorar)
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    //Limpa o display e adiciona um novo digito /
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    //Verificando se o display será limpo e se precisa limpar
    const currentValue = clearDisplay ? "" : this.state.displayValue;

    //Valores que serão adicionados no display e mudará o estado da aplicação
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    //Armazenando/Atualizando os valores no array VALUES
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      console.log(values);
    }
  }

  render() {
    const addDigit = (n) => this.addDigit(n);
    const setOperation = (op) => this.setOperation;

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />

        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
