function parser(file){
	
	const builder = require("xmlbuilder")
	var doc = builder.create('gedcom');
	
	let fileIn = file.split("\n")

	let levelUp = -1
	let valueUp = null
	let node = doc

	for (let i = 0; i < fileIn.length; i++) {

		if(fileIn[i][fileIn[i].length - 1] === '\r')
			fileIn[i] = fileIn[i].substring(0, fileIn[i].length - 1);

		let split = fileIn[i].split(' ')
		let level = split.shift()
		let tmp = split.shift()
		let id = null
		let tag = null
		let value = null

		if(split[0] === undefined)
			split[0] = ''

		if(tmp.charAt(0) == '@'){
			id = tmp
			tmp = split.shift()
			tag = tmp
		}
		else if(split[0].includes('@')){
			tag = tmp
			tmp = split.shift()
			id = tmp
		}else tag = tmp
		
		if(split.length > 0){
			value = split.join(' ')
			if(value.match(/@[^@]+@/)){
				id = value
				value = null
			}
		}

		if(level > levelUp){
			if(valueUp != '')
				node.att("value", valueUp)
			node = node.ele(tag).att("id", id)
			levelUp = level
			valueUp = value
		}else if(level === levelUp){
			if(valueUp!=null)
				node.txt(valueUp)
			node = node.up().ele(tag).att("id", id)
			levelUp = level
			valueUp = value
		}else if (level < levelUp){
			if(valueUp!=null)
				node.txt(valueUp)
			node = node.up()
			while(level != levelUp){
				node = node.up()
				levelUp--
			}
			node = node.ele(tag).att("id", id)
			levelUp = level
			valueUp = value
		}
	}
	if(valueUp!=null)
		node.txt(valueUp)
		
	return(doc.toString({ pretty: true }))
}

module.exports = parser