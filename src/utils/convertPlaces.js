export function convertPlaces(rawPlaces = []) {
    return rawPlaces.map(p => ({
        latitude: parseFloat(p.mapy),
        longitude: parseFloat(p.mapx),
        name: p.title,
        address: p.addr1,
        id: p.contentid,
        image: p.firstimage,
    }));
}
