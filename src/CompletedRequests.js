import React, { useEffect, useState } from 'react';
const baseURL = `http://localhost:8088`

export const completeRequestBtn = () => {
      
}

export const CompletedRequests = (props) => {
  
    return (
      <div>
        <h2>Completed Requests:</h2>
        <ul>
          {props.compRequestsProps.map((request) => (
            <li key={`completeRequest--${request.id}`}>
              {request.title} (Completed by User ID: {request.userId}) Description: {request.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  