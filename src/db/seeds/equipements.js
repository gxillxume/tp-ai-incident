/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('incidents').del() --> Décommenter apres creation de la table `incidents`
  await knex('equipements').del()

  await knex('equipements').insert([
    {nom: 'SRV-WEB-01', type: "Serveur", adresse_ip: '192.168.1.10', os: "Ubuntu 22.04", localisation: "Salle A"},
    {nom: 'SRV-DB-01', type: 'Serveur', adresse_ip: '192.168.1.11', os: 'Debian 12', localisation: 'Salle A' },
    {nom: 'PC-DEV-01', type: 'Poste', adresse_ip: '192.168.1.50', os: 'Windows 11', localisation: 'Bureau 3' },
    {nom: 'PC-DEV-02', type: 'Poste', adresse_ip: '192.168.1.51', os: 'Windows 11', localisation: 'Bureau 3' },
    {nom: 'RTR-CORE-01', type: 'Routeur', adresse_ip: '192.168.1.1', os: 'Cisco IOS', localisation: 'Datacenter' },
    {nom: 'SW-ACCESS-01', type: 'Switch', adresse_ip: '192.168.1.2', os: 'Cisco IOS', localisation: 'Salle B' },
    { nom: 'NAS-BACKUP-01', type: 'NAS', adresse_ip: '192.168.1.20', os: 'TrueNAS', localisation: 'Datacenter' },
    {nom: 'SRV-APP-01', type: 'Serveur', adresse_ip: '192.168.1.12', os: 'Ubuntu 22.04', localisation: 'Salle A' }
  ]);
};
