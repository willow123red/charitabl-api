module.exports = db => ({
// Charities queries, etc to database
  getAllCharities: () => db.query(
    `
    SELECT * FROM charities
    `
  ).then(({ rows: charities }) => charities
  ).catch(error => console.log(error)),

  getAllCharitiesSpecificInfo: (charityId) => db.query(
    `
    SELECT
      charities.id AS charity_id,
      charities.short_description AS short_description,
      charities.long_description AS long_description,
      charities.logo AS logo
    FROM
      charities
    ORDER BY $1;
    `,[charityId]
  ).then(({ rows: charities }) => charities
  ).catch(error => console.log(error)),

  getCharityById: (id) => db.query(
    `
    SELECT * FROM charities WHERE id = ${id}
    `
  ).then(({ rows: charities }) => charities
  ).catch(error => console.log(error)),

  // Users, queries, etc to database
  getAllUsers: () => db.query(
    `
    SELECT * FROM users
    `
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  getDonationsByUser: (userId) => db.query(
    `
    SELECT
      users.id AS users_id,
      charities.name,
      charities.logo,
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
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  createNewUser: (user) => db.query(
    `
    INSERT INTO users
    (first_name, last_name, address, city, province, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,[user.first_name, user.last_name, user.address, user.city, user.province, user.email]
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  // Donations, queries, etc to database
  makeUserDonation: (donation) => db.query(
    `
    INSERT INTO donations
    (amount_cents, user_id, charity_id, employee_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *; 
    `,[donation.amount_cents, donation.user_id, donation.charity_id, donation.employee_id]
  ).then(({ rows: donations }) => donations
  ).catch(error => console.log(error)),

  getAllDonations: () => db.query(
    `
    SELECT * FROM donations
    `
  ).then(({ rows: donations }) => donations
  ).catch(error => console.log(error)),

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
  ).then(({ rows: donations }) => donations
  ).catch(error => console.log(error))

});