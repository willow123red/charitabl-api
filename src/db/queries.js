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
      charities.id AS charityId,
      charities.shortDescription AS shortDescription,
      charities.longDescription AS longDescription,
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
      users.id AS usersId,
      charities.name,
      charities.logo,
      donations.amountCents,
      donations.donatedAt
    FROM  users,
          donations,
          charities
    WHERE donations.userId = users.id
    AND charities.id = donations.charityId
    AND users.id = $1
    ORDER BY  users.id,
              donations.donatedAt;
    `, [userId]
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  createNewUser: (user) => db.query(
    `
    INSERT INTO users
    (firstName, lastName, address, city, province, email)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,[user.firstName, user.lastName, user.address, user.city, user.province, user.email]
  ).then(({ rows: users }) => users[0]
  ).catch(error => console.log(error)),

  // Donations, queries, etc to database
  makeUserDonation: (donation) => db.query(
    `
    INSERT INTO donations
    (amountCents, userId, charityId, employeeId)
    VALUES ($1, $2, $3, $4)
    RETURNING *; 
    `,[donation.amountCents, donation.userId, donation.charityId, donation.employeeId]
  ).then(({ rows: donations }) => donations[0]
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
      users.firstName AS firstName,
      users.lastName AS lastName,
      charities.id AS charityId,
      donations.amountCents,
      donations.donatedAt
    FROM  users,
          charities,
          donations
    WHERE donations.userId = users.id
    AND charities.id = donations.charityId
    AND charities.id = $1
    ORDER BY donations.donatedAt;  
    `, [charityId]
  ).then(({ rows: donations }) => donations
  ).catch(error => console.log(error))

});