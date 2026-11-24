const form = document.getElementById('equipements-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const response = await fetch('/api/equipements', {
            method: 'POST',
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
        message.textContent = 'Équipement ajouté avec succès';
        form.reset();
    } catch (err) {
        message.hidden = false;
        message.className = 'notification is-danger';
        message.textContent = err.message;
    }
});