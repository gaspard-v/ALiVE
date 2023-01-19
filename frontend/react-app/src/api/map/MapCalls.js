export function createMap(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/map/create', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}

export function updateMap(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/map/create', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}

export function getMaps(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/map/create', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}