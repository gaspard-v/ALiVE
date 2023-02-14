import { getMap } from "../map";

const mapResponse = {
    "name": "Anciens port industriel de Dunkerque",
    "uuid": "C5E5B624A14611ED9D200242AC140003",
    "places": [
        {
            "uuid": "C5E78446A14611ED9D200242AC140003",
            "name": "Usine",
            "x": 12,
            "y": 52,
            "rooms": [
                {
                    "name": "anciens champs",
                    "uuid": "C5E6CEDFA14611ED9D200242AC140003",
                    "objects": [
                        {
                            "uuid": "C5E65F8FA14611ED9D200242AC140003",
                            "name": "Sac de terreau",
                            "description": "Le terreau permet la culture de certaines plantes et champignons particulier ",
                            "isTool": 1,
                            "x": 735,
                            "y": 368
                        }
                    ],
                    "doors": []
                }
            ]
        },
        {
            "uuid": "C5E7856EA14611ED9D200242AC140003",
            "name": "Bord de mer",
            "x": 678,
            "y": 507,
            "rooms": [
                {
                    "name": "salle de classe",
                    "uuid": "C5E6CD14A14611ED9D200242AC140003",
                    "objects": [
                        {
                            "uuid": "C5E65F8FA14611ED9D200242AC140003",
                            "name": "Sac de terreau",
                            "description": "Le terreau permet la culture de certaines plantes et champignons particulier ",
                            "isTool": 1,
                            "x": 318,
                            "y": 12
                        }
                    ],
                    "doors": []
                }
            ]
        }
    ]
}

test('get map infos', async () => {
    const pool = {
        getConnection: () => {
            return new Promise(resolve => resolve(mapResponse))
        }
    }

    // const pool = {
    //     getConnection: () => {
    //         return new Promise(resolve => resolve({
    //             query: (query, parameters) => {
    //                 return new Promise(resolve => resolve(mapResponse))
    //             }, end: () => {
    //             }
    //         }))
    //     }
    // }
    getMap(pool).then((res) => {
        expect(res).toBe(mapResponse);
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('uuid')
        expect(res.body['uuid']).toBe(mapResponse.uuid)
        expect(res.body).toHaveProperty('name')
        expect(res.body['name']).toBe(mapResponse.name)
        expect(res.body).toHaveProperty('places')
        expect(res.body['places']).toBe(mapResponse.places)
    })
        .catch(err => {
            console.log(err);
        })
})