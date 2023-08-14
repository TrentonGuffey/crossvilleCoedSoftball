import { useEffect, useState } from "react"
import { CompletedRequests } from "./CompletedRequests"
import { Requests } from "./Requests"

const baseURL = `http://localhost:8088`

export const RequestView = () => {
    const [ requests, setRequests] = useState([])
    const [ completedRequests, setCompletedRequests] = useState([])

    useEffect(() => {
        fetch(`${baseURL}/requests`)
            .then((res) => res.json())
            .then((requestArray) => {
                setRequests(requestArray);
            })            
    }, []);

    useEffect(() => {
        fetch(`${baseURL}/completedRequests`)
            .then((res) => res.json())
            .then((compRequestsArray) => {
                setCompletedRequests(compRequestsArray);
            })
    }, []);



    return (
        <>
        <Requests requestsProps={requests} setRequestsProps={setRequests} setCompRequestsProps={setCompletedRequests}/>
        <CompletedRequests compRequestsProps={completedRequests}/>
        </>
    )
}

