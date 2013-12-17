/*
AEParser
	Convert After Effects tracking points to JSON
	by @SuperIRis
	updated by @mrgnou
	V 0.2
	17.12.13
*/
var AEParser = function(){
	var aeData		= {},
		aeKeys		= {"Units Per Second":"framesPerSecond", "Source Width":"width", "Source Height":"height", "Position":"position", "Scale":"scale", "Rotation":"rotation", "Frame":"frame", "X":"x", "Y":"y"},
		parseBlock	= function(block)
		{
			var blockItems;
			var finalObject = {};
			// 0 is title, 1 is subtitle (Frame, X, Y, Z)
			switch (block[0])
			{
				case "Transform	Position":
					blockItems = ["frame", "x", "y", "z"];
					finalObject.name = aeKeys["Position"];
					break;

				case "Transform	Scale":
					blockItems = ["frame", "xScale", "yScale", "zScale"];
					finalObject.name = aeKeys["Scale"];
					break;

				case "Transform	Rotation":
					blockItems = ["frame", "degrees"];
					finalObject.name = aeKeys["Rotation"];
					break;

				default:
					return null;
			}

			var itemData;
			var itemDataAe = [];
			for (var j = 2, bl = block.length; j < bl; j++)
			{
				itemData = block[j].replace(/\t|\n/g, " ").replace(" ", "").split(" ");
				if(itemData[itemData.length - 1] == "") itemData.pop();
				for (var ji = 0; ji < itemData.length; ji += 4)
				{
					itemDataAe[itemDataAe.length] = {};
					for (var jii = 0; jii < blockItems.length; jii++)
					{
						itemDataAe[itemDataAe.length-1][blockItems[jii]] = itemData[ji+jii];
					}
				}
			}
			finalObject.items = itemDataAe;
			return finalObject;
		};

	return {
		parse:function(parseText)
		{
			if(parseText.length)
			{
				var parseDatas = parseText.split("\n\n");
				var generalData = parseDatas[1].split("	");
				for (var i = 1, gl = generalData.length; i < gl; i += 2)
				{
					if(aeKeys[generalData[i]])
					{
						aeData[aeKeys[generalData[i]]] = generalData[i + 1].replace(/\n/g, "");
					}
				}
				aeData.data = [];
				var parserResult;
				for(var j = 2, pl = parseDatas.length; j < pl; j++)
				{
					parserResult = parseBlock(parseDatas[j].split("\n"));
					if(parserResult)
					{
						aeData.data.push(parserResult);
					}
				}
				return aeData;
			}
		}
	};
}();