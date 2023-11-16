export async function up(db, client) {
  // TODO write your migration here.
  // En fonction du projet avec l'api, on peut ajouter des champs dans la base de données ou en supprimer ou en modifier
  // Exemple:
  await db.collection('users').updateOne({ firstname: 'zebi' }, { $set: { firstname: 'Toto' } });
}
export async function down(db, client) {
  // TODO write the statements to rollback your migration (if possible)
  // Example:
  await db.collection('users').updateOne({ firstname: 'Toto' }, { $set: { firstname: 'zebi' } });
}