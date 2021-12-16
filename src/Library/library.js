


/**
 * 
 * @param {*} number - Number to be formated
 * @returns  A comma seperated string of the 
 * number parameter passed if its length
 * is greater than three(3)
 * 
 */

export function insertCommasToNumber(number) {
    //convert number to array and reverse
    const reversedNumber = [...number.toString()].reverse();
    const lengthOfNumber = reversedNumber.join("").length;
    // array to hold chunks/slices of reversed number
    const formatedNumber = [];
    let formatedNumberLength = 0;
    let chunk = 0;

    while (formatedNumberLength < lengthOfNumber) {
        // push slices of reversed number in group of threes(3) into formated number array
        formatedNumber.push(reversedNumber.join("").substr(chunk, 3));
        // increment the length of formated number 
        formatedNumberLength = formatedNumber.join("").length;
  		chunk += 3;  
	}
    return formatedNumber.join(",").split("").reverse().join("");
}


