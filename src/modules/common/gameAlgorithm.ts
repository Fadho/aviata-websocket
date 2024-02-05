import { createHmac, randomInt } from 'crypto';
import { generate } from 'randomstring';

export const processAlgorithm = () => {
    function gameResultFromHash(hash:string) {
        const max_cashout = 4503599627370495; // 0xFFFFFFFFFFFFF
        const instant_crash = 20;
        const result = gameNumberFromHash(hash, 0, max_cashout);
    
        if (result % instant_crash === 0) {
            return 1.0;
        }
    
        return (
            Math.floor((100 * max_cashout - result) / (max_cashout - result)) / 100
        );
        }
    
        function gameNumberFromHash(hash:string, min:number, max:number) {
        const maxHashInt = 4503599627370495; // 0xFFFFFFFFFFFFF
        const hashInt = parseInt(hash.substr(0, 13), 16);
        const number =
            min + Math.floor((max - min + 1) * (hashInt / (maxHashInt + 1)));
    
        return number;
        }
    
        function saltHash(hash:string) {
            return createHmac("sha256", "CRASH:0").update(hash).digest("hex");
        }
    
        // - - - - -
    
        let result = 1.06;
        // let gameHash;
        const serverSeedInput = generate();
    
        const calculateResult= ()=> {
            const seed = serverSeedInput;
            if (seed.length === 0) {
                result = 1.06
                return result;
            }
    
            // gameHash = crypto.createHash("sha256").update(seed).digest("hex");
            result = gameResultFromHash(saltHash(seed));
            // console.log(gameResultFromHash(saltHash(seed)))
    
            return gameResultFromHash(saltHash(seed));
        }
    
        result = calculateResult();
    
        return result;
}

export const processRangeAlgo = () => {
    function bettingGame(options: { choice: number; causeOfStop: string; }[]) {
        // Find the multiplier for the player's chosen option
        let causeOfStop = '', choice=1;
        let i = randomInt(6)
        causeOfStop = options[i].causeOfStop;
        choice = options[i].choice;
 
    
        return { causeOfStop: causeOfStop, choice: choice };
    }
    
    const options = [
        { choice: 1, causeOfStop: 'Accident' }, 
        { choice: 2, causeOfStop: 'Traffic' }, 
        { choice: 3, causeOfStop: 'Overheating' }, 
        { choice: 4, causeOfStop: 'Bad Road' }, 
        { choice: 5, causeOfStop: 'Bus Stop' },
        { choice: 6, causeOfStop: 'Flat Tyre' }, 
    ];

    const result = bettingGame( options);
    return result
}