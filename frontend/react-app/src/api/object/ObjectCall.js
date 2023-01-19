

export function createObject(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/object/create', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}

export function createObjectv2(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/object', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}
export function updateObject(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/object', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}

export function getObjects() {
    // Simple GET request using fetch
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };
    fetch('http://localhost:8080/api/object', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}