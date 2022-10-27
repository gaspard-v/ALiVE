

function createObject() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://localhost:8080/api/object/create', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));

    console.log(response)
    return(response);
}