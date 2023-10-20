const parseFile = (file: string | ArrayBuffer | null) => {
    let pair : {english: string, creole: string}[] = []

    if (typeof file === 'string'){
        let lines = file.split('\n').filter((line) => line != '').map((line) => line.trim())

        let english_line : string
        let creole_line : string

        for (let i = 1; i < lines.length; i+=2) {
            if(lines[i].startsWith('T')){
                english_line = lines[i].substring(1).trim()    
            }
            else{
                english_line = lines[i].trim()
            }

            let partition = lines[i-1].split('\t')

            if(partition.length === 2)
                creole_line = partition[1]
            else if(partition.length === 3)
                creole_line = partition[2]
            else
                creole_line = lines[i-1]

            pair.push({english: english_line, creole: creole_line})
        }
    }

    return pair
}

export default parseFile