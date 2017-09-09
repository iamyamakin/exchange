const parseJSON = (response) => {
    const res = response.json();

    if (res) {
        return res;
    }

    const error = new Error(res.error);

    error.response = res;
    throw error;
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);

    error.response = response;
    throw error;
};

const catchError = (error) => {
    console.log(error);
};

export default (url, options) => {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(catchError);
};
