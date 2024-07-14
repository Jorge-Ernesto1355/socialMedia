export const isValidEmail = (email = "")=>{
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
        return "the email only can contains letters, numbers, underscores and coms"
    }
    
}