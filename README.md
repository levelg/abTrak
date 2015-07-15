# abTrak

###Methods
- Attempts to add script with ad in name and associated boolean
- Attempts to establish gpt call back and checks ad for height, visibility and display properties

###Usage
- Add scripts to server (update path of adsbygoogle.js in abTrak.js)
- Add <script src="js/adTrak.js"></script> to page
- Call abTrak.getStatus() to determine if adBlocking is on or off [true | false]

###Considerations
- Only tested in FF and Chrome OSx
- If an ad is flighted at 0x0, this could cause a false positive
- Timers maybe better centralized in a util