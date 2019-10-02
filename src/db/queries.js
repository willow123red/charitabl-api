module.exports = db => ({
  getAllCharities: () => db.query(
    `
    SELECT * FROM charities
    `
  ).then(({ rows: charities }) => charities),

  getAllUsers: () => db.query(
    `
    SELECT * FROM users
    `
  ).then(({ rows: users }) => users),

  getAllDonations: () => db.query(
    `
    SELECT * FROM donations
    `
  ).then(({ rows: donations }) => donations),

  getCharityById: (id) => db.query(
    `
    SELECT * FROM charities Where id = ${id}
    `
  ).then(({ rows: charities }) => charities),

  getDonationsByUser: () => db.query(
    `
    SELECT
      users.id AS users_id,
      charities.name AS charity_name,
      donations.donations_cents,
      donations.donated_at
    FROM users,
         donations,
         charities
    WHERE donations.user_id = users.id
    AND 
    charities.id = donations.charity_id
    ORDER BY users.id,
             donations.donated_at;
    `
  ).then(({ rows: users }) => users),


})