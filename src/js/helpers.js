import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const json = await response.json();

    if (!response.ok) throw new Error(`${json.message} (${response.status})`);
    return json;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, data) {
  try {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await Promise.race([
      fetch(url, request),
      timeout(TIMEOUT_SEC),
    ]);
    const json = await response.json();

    if (!response.ok) throw new Error(`${json.message} (${response.status})`);
    return json;
  } catch (error) {
    throw error;
  }
};
