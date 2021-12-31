import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, data = undefined) {
  try {
    const requestPromise = data
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      : fetch(url);

    const response = await Promise.race([requestPromise, timeout(TIMEOUT_SEC)]);
    const json = await response.json();
    console.log(json);

    if (!response.ok) throw new Error(`${json.message} (${response.status})`);
    return json;
  } catch (error) {
    throw error;
  }
};
