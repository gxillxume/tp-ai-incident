// loique du formulaire de creation et modification des equipements

const form = document.getElementById('equipements-form');
const message = document.getElementById('message');
const title = document.querySelector('h2');
const submitBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('delete-btn');

const path = window.location.pathname.split('/'); // divise le path en ["", equipements, id, modifier]
const isEditing = path[3] === 'modifier'; // check si on veut le form de creation ou modifs
const equipementId = isEditing ? path[2] : null; 

// setup la page si c pour modifier
async function loadPageEdit() {
    if (!equipementId) return;

    title.textContent = 'Modifier un équipement';
    submitBtn.textContent = 'Modifier'
    deleteBtn.hidden = false

    const response = await fetch(`/api/equipements/${equipementId}`);
    const equipement = await response.json();

    if (!response.ok) {
        throw new Error(equipement.error || 'Impossible de charger l’équipement');
    }
    // remplace les champs du formulaire par leur valeur selon la key, (key === 'name' ou autre attribut)
    for (const [key, value] of Object.entries(equipement)) {
        if (form.elements[key]) {
            form.elements[key].value = value;
        }
    }
}

if (equipementId) {
    loadPageEdit().catch((err) => {
        message.hidden = false;
        message.className = 'notification is-danger';
        message.textContent = err.message
    })
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {
        const response = await fetch(equipementId ? `/api/equipements/${equipementId}` : '/api/equipements', {
            method: equipementId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Impossible d’ajouter l’équipement');
        }

        message.hidden = false;
        message.className = 'notification is-success';
        message.textContent = equipementId ? 'Équipement modifié avec succès' : 'Équipement ajouté avec succès';
        message.animate([{opacity:0, transform:'translateY(-4px)'},{opacity:1, transform:'translateY(0)'}], 300);
        if (!equipementId) form.reset();
    } catch (err) {
        message.hidden = false;
        message.className = 'notification is-danger';
        message.textContent = err.message;
    }
});

deleteBtn.addEventListener("click", async () => {
    if (!equipementId || !confirm('Supprimer cet équipement ?')) return;
    const response = await fetch(`/api/equipements/${equipementId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        window.location.href = '/equipements';
        return;
    }
    message.hidden = false
    message.className = 'notification is-danger';
    message.textContent = 'Impossible de supprimer l’équipement';
})