/** @format */

import { processAlgorithm } from "../common/gameAlgorithm"
import { createReference } from "../common/utils"


class RealTime {
    private reference = ""
    private countdown = 120
    private countdownEndAt = 0
    private canPlaceBet = true
    private readingOdds = "1.01"
    private secondsInReadingOdds = 1;
    private roundWaitTime = 30
    private generatedOdds = "1.02"
    private hasGeneratedOdds = false
    private date: Date | null = null
    private roundWaitTimeEndAt = 0

    private timeElapsedInSeconds = 0

    constructor(date: Date | null) {
        this.date = date
    }

    private Algorithm() {
        return processAlgorithm()
    }

    public GenerateCred() {
        this.date = new Date()
        this.generatedOdds = String(this.Algorithm())
        // this.generatedOdds = '4000'
        this.reference = createReference('BUSLY')

        return {
            date: this.date,
            reference: this.reference,
            generatedOdds: this.generatedOdds,
        }
    }


    private processGeneratedOdds() {
        // Y=1.01^x
        this.readingOdds = Math.pow(1.01, this.secondsInReadingOdds/1.3).toFixed(2)
    }

    public Start() {
        const hasCountDownEnded =
            Number(this.countdown) === Number(this.countdownEndAt);
        const hasOddsCrashed = Number(this.readingOdds) >= Number(this.generatedOdds);
        const hasWaitTimeEnded = this.roundWaitTimeEndAt === this.roundWaitTime;
        
        if (!hasCountDownEnded) {
            this.timeElapsedInSeconds = this.timeElapsedInSeconds + 100;

            if (this.timeElapsedInSeconds >= 1000) {
                this.countdown = Number(this.countdown) - 1;
                this.timeElapsedInSeconds = 0;
            }
        }

        if (hasCountDownEnded && !hasOddsCrashed) {
            this.canPlaceBet = false;

            if (!this.hasGeneratedOdds) {
                this.GenerateCred(),
                this.hasGeneratedOdds = true
                this.timeElapsedInSeconds = 0;
            }
                this.secondsInReadingOdds = this.secondsInReadingOdds + 1
                this.processGeneratedOdds();
        }

        if (hasOddsCrashed && !hasWaitTimeEnded) {
            this.timeElapsedInSeconds = this.timeElapsedInSeconds + 100;

            if (this.timeElapsedInSeconds >= 1000) {
                this.roundWaitTime = Number(this.roundWaitTime) - 1
                this.timeElapsedInSeconds = 0
            }
        }

        if (hasWaitTimeEnded) {
            this.Clear();
        }

        return {
            countdown: this.countdown,
            canPlaceBet: this.canPlaceBet,
            date: this.date,
            readingOdds: this.readingOdds,
            // secondsInReadingOdds: this.secondsInReadingOdds,
            generatedOdds: this.generatedOdds,
            roundWaitTime: this.roundWaitTime,
            reference: this.reference,
        }
    }

    public Clear() {
        this.canPlaceBet = true
        this.generatedOdds = "1.02"
        this.countdown = 120
        this.reference = ""
        this.date = null
        this.countdownEndAt = 0
        this.readingOdds = "1.01"
        this.roundWaitTime = 30
        this.timeElapsedInSeconds = 0
        this.hasGeneratedOdds = false;
        this.secondsInReadingOdds = 0
    }
}

export default RealTime