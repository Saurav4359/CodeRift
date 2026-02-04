import axios from "axios";


export async function result(token : string) {
    const result= await axios.get(`https://ce.judge0.com/submissions/${token}`,{
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
}