export interface Validator {
    (value: any): {result:true}|{result:false,message:string}
}

export const validateName: Validator = (name: string)=>{
    const playerNameRegex = /^(?=[a-zA-Z0-9._]{5,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/i;
    if (playerNameRegex.test(name))
        return {result:true};
    // implement custom error messages dependent on what is missing
    return {result:false,message:'Username must be in between 5 and 10 characters long, <br>' +
            ' The only available special characters are _ . and cannot be more than 1 in a row.'};
}

export function generateBoard() {

}

export function checkGameSate() {

}