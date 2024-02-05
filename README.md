## DOCUMENTATION
#### YOU'RE TO EXPECT THE BELOW PAYLOAD
* date: The date round detail was generated
* countdown: The countdown before the game starts. 
* reference: The round reference, send this to the api on   authenticate so all users will be in the same round,
* canPlaceBet: Show when user can place bet,
* readingOdds: When odd is reading. Shown after countdown stops at 10,
* roundWaitTime: The grace period to show round result to user. Ends at 5,
* generatedOdds: The generated odd for this round, shows the winning odds. Might want to use this after grace periods
* rangeOutcome: The Bet on Distance side bet result for each round
* connectedUsers: Number of users connected to the websocket to play the game

#### RESPONSE
Response is encrypted and should be decrypted for use
Response is also sent every .5 seconds

#### EVENT LISTENER
* crash-event: Listen for this key to get result from response data