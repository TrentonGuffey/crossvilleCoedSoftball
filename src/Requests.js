import { useEffect, useState } from 'react';
const baseURL = `http://localhost:8088`
const localCoedUser = JSON.parse(localStorage.getItem("coed_user"))


export const Requests = (props) => {
    const [requests, setRequests] = useState([...props.requestsProps])
    const [completedRequests, setCompletedRequests] = useState([])
    const userId = localCoedUser.id;

    useEffect(() => {
        fetch(`${baseURL}/requests`)
            .then((res) => res.json())
            .then((requestArray) => {
                setRequests(requestArray);
            })
            .catch((error) => {
                console.error('Error fetching requests:', error);
            });
    }, [completedRequests]);

    const GetCompletedRequest = () => {
        return fetch(`${baseURL}/completedRequests`)
            .then((res) => res.json())
            .then((completedRequestArray) => {
                props.setCompRequestsProps(completedRequestArray)
            })

    }

    const handleComplete = (requestId) => {
        const completedRequest = requests.find((request) => request.id === requestId);

        if (completedRequest) {
            completedRequest.userId = userId
            delete completedRequest.id
            // Make a POST request to update the completedRequests array in the API
            fetch(`${baseURL}/completedRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completedRequest),
            })
                .then((res) => res.json())
                .then(() => {
                    fetch(`${baseURL}/requests/${requestId}`, {
                        method: 'DELETE',
                    })
                        .catch((error) => {

                            console.error('Error deleting player:', error)
                        });

                })

                .then((newCompletedRequest) => {
                    // Move the completed request to the completedRequests array in the state
                    setCompletedRequests((prevCompletedRequests) => [
                        ...prevCompletedRequests,
                        newCompletedRequest,
                    ])

                })
                .then(() => {
                     GetCompletedRequest()

                })
        }
    }

    return (
        <div>
            <div>
                <h2>Roster Requests:</h2>
                <ul>
                    {requests.map((request) => (
                        <li key={`request--${request.id}`}>
                            <button onClick={() => handleComplete(request.id)}>Complete</button>{request.playerId}{"."}{"  "}
                            {request.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};