export function createRoom(envoy) {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envoy)
    };
    fetch('http://localhost:8080/api/room', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}

export function getRooms() {
    // Simple GET request using fetch
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };
    fetch('http://localhost:8080/api/room', requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
}