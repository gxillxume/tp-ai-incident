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
        equipementsListe.innerHTML = `<tr><td colspan="7">Aucun résultat</td></tr>`;
        return
    }
    for (const eq of equipements) {
        const tr = document.createElement('tr');
        const item = [eq.id, eq.nom, eq.type, eq.adresse_ip, eq.os, eq.localisation];

        for (const value of item) {
            const td = document.createElement('td');
            td.textContent = value ?? '';
            tr.appendChild(td);
        }
        const actionTd = document.createElement('td');
        const modifyBtn = document.createElement('button');
        modifyBtn.className = 'button';
        modifyBtn.type = 'button';
        modifyBtn.title = 'Modifier';
        // image vient de https://remixicon.com (modifier JUSTE path)
        modifyBtn.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="rgb(255, 255, 255)"
                aria-hidden="true"
            >
                <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
            </svg>
        `;
        modifyBtn.addEventListener('click', () => {
            window.location.href = `/equipements/${eq.id}/modifier`;
        });
        actionTd.appendChild(modifyBtn);

        tr.appendChild(actionTd);
        equipementsListe.appendChild(tr);
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

