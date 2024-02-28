import { processAlgorithm, processRangeAlgo } from "../common/gameAlgorithm";
import { createReference } from "../common/utils";

class RealTime {
    private reference = '';
    private countdown = '10';
    private countdownEndAt = 0
    private canPlaceBet = true;
    private readingOdds = '1.00'
    private roundWaitTime = '3.0'
    private generatedOdds = '0.00';
    private oddsIncrement = 0.04
    private rangeOutcome = '';
    private date: Date | null = null;
    private roundWaitTimeEndAt = 0;

    constructor(date: Date | null) {
        this.date = date;
    }

    private Algorithm() {
        return processAlgorithm()
    }

    private RangeBets(){
        return processRangeAlgo()
    }

    public GenerateCred() {
        this.date = new Date()
        this.generatedOdds = String(this.Algorithm())
        this.rangeOutcome = String(this.RangeBets().causeOfStop)
        this.reference = createReference('BUSLY')

        return {
            date: this.date,
            reference: this.reference,
            generatedOdds: this.generatedOdds,
            rangeOutcome: this.rangeOutcome
        }
    }

    public Start() {
        const hasCountDownEnded = Number(this.countdown) === this.countdownEndAt;
        const hasWaitTimeEnded = Number(this.roundWaitTime) === this.roundWaitTimeEndAt;

        if (!hasWaitTimeEnded) {
            this.roundWaitTime = Number(Number(this.roundWaitTime) - 0.4)>0 ? Number(Number(this.roundWaitTime) - 0.4).toFixed(1):'0';
        }

        if (hasWaitTimeEnded) {
            this.canPlaceBet = true
            if (Number(this.countdown) === 10) {
                this.GenerateCred()
            }

            if (!hasCountDownEnded) {
                this.countdown = String(Number(this.countdown) - 1);
            }
    
            if (hasCountDownEnded) {
                this.canPlaceBet = false
                this.readingOdds = Number(Number(this.readingOdds) + this.oddsIncrement).toFixed(2)
                this.oddsIncrement += 0.02
            }
    
            if (hasCountDownEnded && parseFloat(this.generatedOdds) <= parseFloat(this.readingOdds)) {
                this.Clear()
                this.roundWaitTime = Number(Number(this.roundWaitTime) ).toFixed(1);
            }
        }



        return {
            date: this.date,
            countdown: this.countdown,
            reference: this.reference,
            canPlaceBet: this.canPlaceBet,
            readingOdds: this.readingOdds,
            generatedOdds: this.generatedOdds,
            rangeOutcome: this.rangeOutcome,
            roundWaitTime: this.roundWaitTime,
        } 
    }

    public Clear() {
        this.canPlaceBet = false;
        this.generatedOdds = '0.00';
        this.rangeOutcome= '';
        this.countdown = '10';
        this.reference = '';
        this.date = null;
        this.readingOdds = '1.00';
        this.oddsIncrement = 0
        this.roundWaitTime = '3.0';
    }
}

export default RealTime;