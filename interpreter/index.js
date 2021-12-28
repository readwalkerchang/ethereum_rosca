const STOP = 'STOP';
const ADD = 'ADD';
const PUSH = 'PUSH';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV'




class Interpreter{
    constructor(){
        this.state = {
            counter: 0,
            stack: [],
            code: []
        };
    }
    runCode (code){
        this.state.code = code;
        while(this.state.counter < this.state.code.length){
            const opCode = this.state.code[this.state.counter];
            
            try{
                switch(opCode){
                    case STOP:
                        throw new Error('Execution complete')
                    case PUSH:
                        this.state.counter++;
                        const value = this.state.code[this.state.counter]
                        this.state.stack.push(value);
                        break; //make sure the following lines wont execute
                    case ADD:
                    case SUB:
                    case MUL:
                    case DIV:
                        const a = this.state.stack.pop();
                        const b = this.state.stack.pop();
                        let result;
                        if(opCode == ADD) result = a + b;
                        if(opCode == SUB) result = a - b;
                        if(opCode == MUL) result = a * b;
                        if(opCode == DIV) result = a / b;


                        this.state.stack.push(result);
                        break;

                    default:
                        break;
                }
            }catch(error){
                console.log(this.state.stack)
            }

            this.state.counter++;
        }
    }
}


const code = [PUSH, 2, PUSH, 3, ADD, STOP]
const interpreter = new Interpreter();
const result = interpreter.runCode(code);
console.log(result);

