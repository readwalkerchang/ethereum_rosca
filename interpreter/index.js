const STOP = 'STOP';
const ADD = 'ADD';
const PUSH = 'PUSH';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const LT = 'LT'; //less than
const GT = 'GT'; //greater than
const EQ = 'EQ'; //Euqality
const AND = 'AND';
const OR = 'OR';
const JUMP = 'JUMP'; //moves the counter to another location
const JUMPI = 'JUMPI'; //JUMP IF(Conditional Jumps Instructions)
const EXECUTION_COMPLETE = 'Execution complete';
const EXECUTION_LIMIT = 999;



class Interpreter{
    constructor(){
        this.state = {
            counter: 0,
            stack: [],
            code: [],
            executionCount:0
        };
    }

    jump(){
        const destination = this.state.stack.pop();
        if(destination < 0 || destination > this.state.code.length){
            throw new Error(`Invalid destination: ${destination}` );
        }
        this.state.counter = destination;
        this.state.counter--;
    }
    runCode (code){
        this.state.code = code;
        while(this.state.counter < this.state.code.length){
            this.state.executionCount++;

            if (this.state.executionCount > EXECUTION_LIMIT) {
              throw new Error(
                `Check for an infinite loop. Execution limit of ${EXECUTION_LIMIT} exceeded`
              );
            }            const opCode = this.state.code[this.state.counter];
            
            try{
                switch(opCode){
                    case STOP:
                        throw new Error(EXECUTION_COMPLETE)
                    case PUSH:
                        this.state.counter++;
                        if (this.state.counter === this.state.code.length){
                            throw new Error(`The PUSH instruction cannot be last`)
                        }
                        const value = this.state.code[this.state.counter]
                        this.state.stack.push(value);
                        break; //make sure the following lines wont execute
                    case ADD:
                    case SUB:
                    case MUL:
                    case DIV:
                    case LT:
                    case GT:
                    case EQ:
                    case AND:
                    case OR:
                        const a = this.state.stack.pop(); //will be the last number in code
                        const b = this.state.stack.pop();
                        let result;
                        if(opCode == ADD) result = a + b;
                        if(opCode == SUB) result = a - b;
                        if(opCode == MUL) result = a * b;
                        if(opCode == DIV) result = a / b;
                        if(opCode == LT) result = a < b ? 1:0;
                        if(opCode == GT) result = a > b ? 1:0;
                        if(opCode == EQ) result = a === b ? 1:0;
                        if(opCode == AND) result = a && b ? 1:0;
                        if(opCode == OR) result = a || b ? 1:0;

                        this.state.stack.push(result);
                        break;

                    case JUMP:
                        this.jump();
                        break;
                    
                    case JUMPI:
                        const condition = this.state.stack.pop();
                        if(condition === 1){
                            this.jump();
                        }
                        break;

                    default:
                        break;
                }
            }catch(error){
                if (error.message === EXECUTION_COMPLETE){
                    return this.state.stack[this.state.stack.length-1];
                }
                throw error
            }

            this.state.counter++;
        }
    }
}


// code = [PUSH, 2, PUSH, 3, LT, STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of 3 LT 2:', result);

// code = [PUSH, 2, PUSH, 3, GT, STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of 3 GT 2:', result);

// code = [PUSH, 2, PUSH, 3, EQ, STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of 2 EQ 2:', result);

// code = [PUSH, 1, PUSH, 1, AND, STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of 0 AND 1:', result);

// code = [PUSH, 1, PUSH, 1, OR, STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of 0 OR 1:', result);

// code = [PUSH, 6, JUMP, PUSH, 0, JUMP, PUSH, 'jump successful', STOP];
// interpreterObj = new Interpreter();
// result = interpreterObj.runCode(code);
// console.log('Result of JUMP:', result);

// code = [PUSH, 8, PUSH, 1, JUMPI, PUSH, 0, JUMP, PUSH, 'jump successful', STOP];
// result = new Interpreter().runCode(code);
// console.log('Result of JUMPI:', result);

// code = [PUSH, 99, JUMP, PUSH, 0, JUMP, PUSH, 'jump successful', STOP];
// try {
//   new Interpreter().runCode(code);
// } catch (error) {
//   console.log('Invalid destination error:', error.message);
// }

// code = [PUSH, 0, PUSH];
// try {
//   new Interpreter().runCode(code);
// } catch (error) {
//   console.log('Invalid PUSH error:', error.message);
// }

code = [PUSH, 0, JUMP, STOP];
try {
  new Interpreter().runCode(code);
} catch (error) {
  console.log('Expected invalid execution error:', error.message);
}