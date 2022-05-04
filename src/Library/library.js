
/**
 * 
 * @param {*} number - Number to be formated
 * @returns  A comma seperated string of the 
 * number parameter passed if its length
 * is greater than three(3)
 * 
 */
export function insertCommasToNumber(number) {

    if (typeof number !== "number") {
        throw new Error('function parameter should be of type number')
    }

    if (String(number).length > 21) {
        throw new Error("function parameter is too large") 
    }
    
    let numberArr = [...number.toString()];
    const numberArrLength = numberArr.length;
    let decimalFragment = [];
    let containsRealFraction = null;
    let reversedNumberArr = []
    let reversedNumberArrLength;
    //array to hold chunks/slices of reversed number
    const formatedNumberChunks = [];
    let formatedNumberChunksLength = 0;
    let chunk = 0; 
    //check if number contains decimal fraction
    const indexOfDecimalPoint = numberArr.indexOf(".");

    if (indexOfDecimalPoint > -1) {
        decimalFragment = numberArr.slice(indexOfDecimalPoint, numberArrLength)
    }
    
    if (decimalFragment.length > 0) {
        for (let i in decimalFragment) {
            if (decimalFragment[i] > 0) {
                containsRealFraction = true;
                break;
            }  
        } 
    }
     
    if (containsRealFraction) { 
      numberArr = numberArr.slice(0, indexOfDecimalPoint)
    }

    //revers number array
    reversedNumberArr  = numberArr.reverse();
    reversedNumberArrLength = reversedNumberArr.length ;
      
    while (formatedNumberChunksLength < reversedNumberArrLength) {
      // push slices of reversed number in group of threes(3) into formated number array
      formatedNumberChunks.push(reversedNumberArr.join("").substr(chunk, 3));
      // increment the length of formated number 
      formatedNumberChunksLength = formatedNumberChunks.join("").length;
      chunk += 3;  
    }
    
    if (!containsRealFraction) {
      return formatedNumberChunks.join(",").split("").reverse().join("") 
    }
    
    return formatedNumberChunks.join(",").split("").reverse().join("") + decimalFragment.join("") 
}

/**
 * 
 * @param {*} imageFiles - Array of image files to be resized
 * @param {*} callback - A callback that should execute after images are resized
 * @returns  An array of resized images in dataUrl format 
 *  
 */
export const getResizedImages = async (imageFiles = [], callback = f =>f) => {

    const imagesDataUrl = [];

    try {

        for (let i = 0; i < imageFiles.length; i++) { 
            const dataUrl = await resizeImage(imageFiles[i]);
            imagesDataUrl.push(dataUrl);
        }

        return callback(imagesDataUrl)
        
    } catch (err) {
        // TODO... handle error
        
    }
    
    function resizeImage(imageFile = {}) {

        return new Promise((res, rej) => {
            try {

                const reader = new FileReader();
                // Set the image once loaded into file reader
                reader.onload = function(e) {
                    const img = document.createElement("img");

                    img.src =  e.target.result;
                    // resize image once it loads
                    img.addEventListener("load", (evt) => {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        let width = img.width;
                        let height = img.height;
                        let dataurl = null;
                        const MAX_WIDTH = 300;
                        const MAX_HEIGHT = 300; 

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);
                        dataurl = canvas.toDataURL(imageFile.type);
                        // resolve resized image dataurl
                        res({dataurl});
                    })
                }
                reader.readAsDataURL(imageFile);

            } catch(err) {
                rej(err);
            }
        })

    }

}

/**
 * 
 * @param {*} unicode - A unicode string
 * @returns The value of the unicode string
 *   
 */
export function setUnicode(unicode = "") {
    let dummy;
    let decoded;

    if (!unicode) {
        return decoded ="";
    }

    dummy = document.createElement('textarea');
    dummy.innerHTML = unicode;
    decoded = dummy.value;
    return decoded;
}

export const open = setUnicode('&#9776;');

export const close = setUnicode('&times;');