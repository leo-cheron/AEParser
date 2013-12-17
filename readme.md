AEParser (v.0.2)
----------------

Adobe After Effects can export video tracking points so you can use them anyway you want. The problem is that the points are exported in a legible text format, so if you want to use them in any programming language they are useless. This JS simply parses the text and converts it into a useful JSON. 


Usage
-----

You just have to make a call to AEParser.parse with all the After Effects text as a unique parameter. The result is the json Object.

The example uses JSON.stringify to output the json, so it may not work in old versions of IE and maybe other ancient browsers.



Example After Effects Text:readme.
---------------------------

Adobe After Effects 8.0 Keyframe Data

  Units Per Second  25
  Source Width  20
  Source Height 20
  Source Pixel Aspect Ratio 1
  Comp Pixel Aspect Ratio 1

Transform Position
  Frame X pixels  Y pixels  Z pixels  
  1 1076.52 203.476 0 
  2 1075.11 200.137 0 
  3 1073.24 194.511 0 

End of Keyframe Data