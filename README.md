# abTrak

###Methods
- Attempts to add script with ad in name and associated boolean
- attempts to establish gpt call back and checks ad for height, visibility and display properties

###Usage
- Add scripts to server (update path of adsbygoogle.js in abTrak.js)
- Add <script src="js/adTrak.js"></script> to page
- call abTrak.getStatus() to determine if adBlocking is on or off [true | false]

###Considerations
- only tested in FF and Chrome OSx
- if an ad is flighted at 0x0, this could cause a false positive
- timers maybe better centralized in a util