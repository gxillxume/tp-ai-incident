const API = '/api/equipements'
const equipementsListe = document.getElementById('equipements-list');
const searchBar = document.getElementById("search-input")
const message = document.getElementById('message')

let timer; // id du setTimeout (debounce)
let controller; // AbortController, permet d'annuler la requete en cours

// affichage des equipements (tableau, rows, etc)
function render(equipements) {
    equipementsListe.innerHTML = '';
    if (equipements.length === 0) {
        equipementsListe.innerHTML = `<tr><td colspan="6">Aucun résultat</td></tr>`;
        return
    }
    for (const eq of equipements) {
        const tr = document.createElement('tr');
        const item = [eq.id, eq.nom, eq.type, eq.adresse_ip, eq.os, eq.localisation];

        for (const value of item) {
            const td = document.createElement('td');
            td.textContent = value ?? ''; 
            tr.appendChild(td)
        }
        equipementsListe.appendChild(tr)
    }
}

// fonction getter/load les equipements (fetch l'API) selon le query (recherche)
async function load(query) {
    controller?.abort(); // annule la requete si elle existe encore
    controller = new AbortController() // creer un nv controller pour CETTE requete
    try {
        const response = await fetch(
            `${API}?q=${encodeURIComponent(query)}`,
            {
                signal: controller.signal // add le signal pour abort
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`, {cause: response.message});

        }
        const result = await response.json();
        render(result)
    } catch (err) {
        if (err.name !== 'AbortError') { // ignore les erreurs de NOTRE abort(), erreur voulu
            message.textContent = "Recherche échouée. Réessayez."
            message.hidden = false
        }
    }

}

// a chaque 'input', va run load selon la recherche
searchBar.addEventListener('input', () => {
    clearTimeout(timer); // annule le timer si nouveau input
    message.hidden = true
    const q = searchBar.value.trim();
    timer = setTimeout(() => load(q), 300); // delay load de 300ms (temps d'attente)
});


load('') // affiche tout les equipements

