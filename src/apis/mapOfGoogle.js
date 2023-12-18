const API_GOOGLE = "/api/googleMap";

export async function detailsPlace(location) {
    try {
        const response = await fetch (`${API_GOOGLE}/searchDetail?lat=${location.lat}&lng=${location.lng}`)
        return response.json();
    } catch (error) {
        console.error('Erreur recherche de détails sur un lieu');
    }
}