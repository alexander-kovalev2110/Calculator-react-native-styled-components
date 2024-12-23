import React, { useState } from 'react';
import styled from 'styled-components/native';

// Types for states
type Operator = "+" | "-" | "*" | "/" | "";
type NumberString = string;

// Calculator component
const Calculator: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState<NumberString>("");
  const [secondNumber, setSecondNumber] = useState<NumberString>("");
  const [operator, setOperator] = useState<Operator>("");
  const [result, setResult] = useState<NumberString>("");

   // Handler for numbers
  const handleNumber = (num: string): void => {
    if (operator === "") {
      setFirstNumber((prev) => prev + num);
    } else {
      setSecondNumber((prev) => prev + num);
    }
  };

  // Handler for CLEAR button
  const handleClear = (): void => {
    setFirstNumber("");
    setSecondNumber("");
    setOperator("");
    setResult("");
  };

  // Last character removal handler
  const handleDelete = (): void => {
    if (operator === "") {
      setFirstNumber((prev) => prev.slice(0, -1));
    } else {
      setSecondNumber((prev) => prev.slice(0, -1));
    }
  };

  // Handler for operators
  const handleOperator = (op: Operator): void => {
    if (firstNumber && secondNumber) {
      calculateResult();
    }
    setOperator(op);
  };

  // Function to calculate the result
  const calculateResult = (): void => {
    if (firstNumber && secondNumber) {
      const firstNum = parseFloat(firstNumber);
      const secondNum = parseFloat(secondNumber);
      let calcResult: number | undefined;

      switch (operator) {
        case "+":
          calcResult = firstNum + secondNum;
          break;
        case "-":
          calcResult = firstNum - secondNum;
          break;
        case "*":
          calcResult = firstNum * secondNum;
          break;
        case "/":
          calcResult = firstNum / secondNum;
          break;
        default:
          return;
      }

      if (calcResult !== undefined) {
        const resultStr = calcResult.toString();
        setResult(resultStr);
        setFirstNumber(resultStr);
        setSecondNumber("");
        setOperator("");
      }
    }
  };

  return (
    <Container>
      <CalculatorWrapper>

        <Display>
          <DisplayText numberOfLines={1} ellipsizeMode="clip">
            {secondNumber || firstNumber || result || "0"}
          </DisplayText>
        </Display>

        <Row>
          <Button onPress={handleClear}>
            <ButtonText>CLEAR</ButtonText>
          </Button>
          <Button onPress={handleDelete}>
            <ButtonText>DEL</ButtonText>
          </Button>
        </Row>

        {[
          ["7", "8", "9", "/"],
          ["4", "5", "6", "*"],
          ["1", "2", "3", "-"],
        ].map((row, rowIndex) => (
          <Row key={`row-${rowIndex}`}>
            {row.map((item) => (
              <Button
                key={item}
                style={{
                  backgroundColor: item === "5" ? "#ce9f48" : item.match(/[0-9]/) ? "#ccc" : "#968c8c",
                }}
                onPress={() =>
                  item.match(/[0-9]/)
                    ? handleNumber(item)
                    : handleOperator(item as Operator)
                }
              >
                <ButtonText
                  style={{
                    color: item === "5" ? "#fff" : item.match(/[0-9]/) ? "#000" : "#fff",
                  }}
                >
                  {item}
                </ButtonText>
              </Button>
            ))}
          </Row>
        ))}

        <Row>
          <ZeroButton onPress={() => handleNumber("0")}>
            <ButtonText style={{ color: "#000" }}>0</ButtonText>
          </ZeroButton>
          <Button onPress={calculateResult}>
            <ButtonText>=</ButtonText>
          </Button>
          <Button onPress={() => handleOperator("+")}>
            <ButtonText>+</ButtonText>
          </Button>
        </Row>

      </CalculatorWrapper>
    </Container>
  );
};

// Styled-components
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #334e58;
`;

const CalculatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Display = styled.View`
  width: 100%;
  height: 80px;
  background-color: #fce8d6;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const DisplayText = styled.Text`
  font-size: 40px;
  color: #000;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-vertical: 5px;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  background-color: #968c8c;
  justify-content: center;
  align-items: center;
  margin-horizontal: 5px;
  padding-vertical: 20px;
  border-radius: 8px;
`;

const ZeroButton = styled(Button)`
  flex: 2.1;
  background-color: #ccc;
`;

const ButtonText = styled.Text`
  font-size: 28px;
  color: #fff;
`;

export default Calculator;
