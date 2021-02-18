# sopTask1webDev
## Basic task:
1.Front(intro) page with neon glow look has been achieved with responsiveness. Morever frontpage can be navigated with up, down and enter keys(from play game to instruction to high scores) as well as with mouse clicks. A preview image of my game has been givn on frontpage. A modal box(fully self designed) will appear for setting difficulty options, viewing instruction and on pausing the game. Instructions have been designed as a very interactive styled list in a modal box. A home button has been provided on gamepage and highscores page to navigate back to index page.\
2.The bubbles have been created using a linear gradient with stopcolors and the user can choose the color of their choice for the bubbles.\
while setting difficulty options. A shiny white curve has been given on each bubble. The bubbles collide elastically and move in opposite direction on hitting sides of the screen.Bubble(generation) seem to rise up from the bottom of the canvas. Bubbles disappear immediately on clicking.\
3.As time progresses more bubbles are generated. One new bubble is created for each bubble destroyed & for each time a bubble hits the top of the screen.\
4.If around half of the screen get covered for 6 seconds game is over. A countdown is shown on screen for six seconds.\
5.My scoring system is very unique - I have an accuracy%(which accounts for percentage of correct number of clicks) which will be multiplied by score to get points. If the player plays in quick mode(rate of bubble generation will be double) his points will be doubled\
Same applies when player plays in fast growing bubbles(rate of growth of radius of bubbles will be double) mode.\
6.Game can be paused(even when the timer is running) or resumed at any point of time.\
7.Bubbles rise in a smooth fashion like from underwater.
## Advanced task:
1.Bubble color has been left to user choice, normal bubbles not only move but also rotate, and their radius(size) keeps growing dynamically. On collecting a coin inside a bubble(will be shown 'what's inside?' for a few frames even after bubble bursts), the growth rate of radius of bubbles will be halved and will again be restored after 7 seconds. Morever the coin rotation is a sprite sheet implemented. Each bubble on bursting plays an animation of lines coming(growing) out from the circumference and then shrinking.\
2.Rock bubbles are color changing balls made using sprite sheet. They require 5 clicks to be destroyed and grow dimmer on each click. But player will fetch a score of '1' for each click on rock bubble-total 5 points but it will occupy portion of screen untill 5 clicks.\
3.Felix felicus(liquid luck) has been made in the form of shiny bubbles with a white light at centre(created usng radialgradient). Only 2 of them will be available for each game, and on popping them rate of generation of bubbles(the rise of bubbles) will be halved for 10 seconds.\
4.Gauntlet(here, waving arms) made using sprite sheets, have been placed inside a few transparent bubbles which on popping will wave at you and burst all bubbles in the top half of the screen but player won't get points for these bubbles, it clears half the screen at once(even rock bubbles).\
5. Sprite sheets have been used for rock bubbles and gauntlets(moreover, transparent bubbles have also been used).\
6. Three sounds have been used-A bubble popping sound has been used for each bursting bubble. Morever an alarm beep sound has been used with the timer. A gameover sound is also played consequently.\
7. High scores are depicted in abar graph drawn sing pure canvas with an interactive background of rotating plus symbols.\
8. The user can also select the range of initial radius of bubbles in the 'play game difficulty options modal box': 10-16, 20-26, 30-36\
Almost all features from basic and advanced mode have been implement (along with some extra ones as well).
