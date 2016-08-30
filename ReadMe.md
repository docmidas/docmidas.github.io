Author: Dexter Golden
Game: Cops and Robbers: Ninjas VS Future Cop
Technologies:Javascript; CSS

Problems:
-Lots of issues getting CreateJS and Phaser librararies running. Maybe Next time.
-Gravity effect was hard to get initially.
-Transitioning between action points was challenging

Future additions:
-I'd like to rewrite, to make object creation and handling easier.
  -Create a catalog of all possinle items. Each item would be an object with ~12 prperties (mostly preset, while others would be assigned upon creation).
  -Item creation function would call catalog class, passing in starting pint and speed values (collide status and z-index would be last and optional: this could add things in midbackrground, without affecting runner), and also issuing screenID number. Item object would be pushed to "Onscreen array".
  -Other functions would use the item class proerties to interpret behavior, animation, screen removal, etc- instead of hard coding for every object.
  -"Onscreen array" tracks all items currently on screen. Item movement func and collison would run through array to handle various tasks.
-If canvas will go behind my mainstage, I could hollow out main background, and have canvas play thru transarent areas. Make API calls  for music and cast visualizations onto canvas. 
