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

  getDonationsByUser: (userId) => db.query(
    `
    SELECT
      users.id AS users_id,
      charities.name AS charity_name,
      donations.amount_cents,
      donations.donated_at
    FROM  users,
          donations,
          charities
    WHERE donations.user_id = users.id
    AND charities.id = donations.charity_id
    AND users.id = $1
    ORDER BY  users.id,
              donations.donated_at;
    `, [userId]
  ).then(({ rows: users }) => users),

  getDonationsByCharity: (charityId) => db.query(
    `
    SELECT
      donations.id AS donations_id,
      users.first_name AS first_name,
      users.last_name AS last_name,
      charities.id AS charity_id,
      donations.amount_cents,
      donations.donated_at
    FROM  users,
          charities,
          donations
    WHERE donations.user_id = users.id
    AND charities.id = donations.charity_id
    AND charities.id = $1
    ORDER BY donations.donated_at;  
    `, [charityId]
  ).then(({ rows: donations }) => donations)



});