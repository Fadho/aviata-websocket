import { processAlgorithm } from "../common/gameAlgorithm";
import { createReference } from "../common/utils";

class RealTime {
    private reference = '';
    private countdown = '0.0';
    private countdownEndAt = 10
    private canPlaceBet = true;
    private readingOdds = '0.00'
    private roundWaitTime = '5.0'
    private generatedOdds = '0.00';
    private date: Date | null = null;
    private roundWaitTimeEndAt = 5

    constructor(date: Date | null) {
        this.date = date;
    }

    private Algorithm() {
        return processAlgorithm()
    }

    public GenerateCred() {
        this.date = new Date()
        this.generatedOdds = String(this.Algorithm())
        this.reference = createReference('BUSLY')

        return {
            date: this.date,
            reference: this.reference,
            generatedOdds: this.generatedOdds,
        }
    }

    public Start() {
        const hasCountDownEnded = Number(this.countdown) === this.countdownEndAt;
        const hasWaitTimeEnded = Number(this.roundWaitTime) === this.roundWaitTimeEndAt;

        if (!hasWaitTimeEnded) {
            this.roundWaitTime = Number(Number(this.roundWaitTime) + 1).toFixed(1);
        }

        if (hasWaitTimeEnded) {
            if (Number(this.countdown) === 0) {
                this.GenerateCred()
            }

            if (!hasCountDownEnded) {
                this.countdown = Number(Number(this.countdown) + 1).toFixed(1);
            }
    
            if (hasCountDownEnded) {
                this.canPlaceBet = false
                this.readingOdds = Number(Number(this.readingOdds) + 0.5).toFixed(2)
            }
    
            if (hasCountDownEnded && parseFloat(this.generatedOdds) <= parseFloat(this.readingOdds)) {
                this.Clear()
                this.roundWaitTime = Number(Number(this.countdown) + 1).toFixed(1);
            }
        }



        return {
            date: this.date,
            countdown: this.countdown,
            reference: this.reference,
            canPlaceBet: this.canPlaceBet,
            readingOdds: this.readingOdds,
            generatedOdds: this.generatedOdds,
            roundWaitTime: this.roundWaitTime,
        }
    }

    public Clear() {
        this.canPlaceBet = true;
        this.generatedOdds = '0.00';
        this.countdown = '0.0';
        this.reference = '';
        this.date = null
        this.readingOdds = '0.00'
        this.roundWaitTime = '0.0'
    }
}

export default RealTime;