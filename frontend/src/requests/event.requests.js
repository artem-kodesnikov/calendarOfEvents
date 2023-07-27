import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL;

export const createNewEvent = async (data) => {
  const { name, startedAt, finishedAt } = data;
  const request = {
    method: 'post',
    url: BASE_URL,
    data: { name, startedAt, finishedAt },
  };
  const response = await axios(request);
  return response;
};

export const getEvents = async () => {
  const request = {
    method: 'get',
    url: BASE_URL
  };
  const response = await axios(request);
  return response;
};


export const deleteEvent = async (id) => {
  const request = {
    method: 'delete',
    url: BASE_URL,
    data: { id }
  };
  const response = await axios(request);
  return response;
};