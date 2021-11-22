class RandomDie{
    constructor(numSides){
        this.numSides = numSides;
    }

    rollOnce(){
        return 1 + Math.floor(Math.random()* this.numSides);
    }

    roll({numRolls}){
        var outputs = [];
        for(var i =0;i<numRolls;i++){
            outputs.push(this.rollOnce());
        }
        return outputs;
    }
}

exports.default = RandomDie;