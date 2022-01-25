const { GENESIS_DATA } = require('../config')

class Block{
    constructor( {blockHeaders} ){
        this.blockHeaders = blockHeaders;
    };

    static mineBlock({lastBlock}){
        
    } //Static methods are called directly on the class with having an instance

    static mineBlock({ lastBlock }){
        
    }

    static genesis(){
        return new this(GENESIS_DATA); // use this key work to avoid creating block itself
    }
}

module.exports = Block;