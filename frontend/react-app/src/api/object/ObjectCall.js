

function createObject(envoy) {
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

export default createObject;