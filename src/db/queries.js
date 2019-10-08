module.exports = db => ({
// Charities queries, etc to database
  getAllCharities: () => db.query(
    `
    SELECT * FROM charities
    `
  ).then(({ rows: charities }) => charities
  ).catch(error => console.log(error)),

  loginCharity: (charity) => db.query(
    `
    SELECT * FROM
      charities
    WHERE charities.email = $1
    AND charities.password = $2
    `,[charity.email, charity.password]
  ).then(({ rows: users }) => users
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
  ).then(({ rows: charities }) => charities[0]
  ).catch(error => console.log(error)),


  // Users, queries, etc to database
  getAllUsers: () => db.query(
    `
    SELECT * FROM users
    `
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  loginUser: (user) => db.query(
    `
    SELECT * FROM
      users
    WHERE users.email = $1
    AND users.password = $2
    `,[user.email, user.password]
  ).then(({ rows: users }) => users
  ).catch(error => console.log(error)),

  createNewUser: (user) => db.query(
    `
    INSERT INTO users
    (first_name, last_name, address, city, province, email, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,[user.first_name, user.last_name, user.address, user.city, user.province, user.email, user.password]
  ).then(({ rows: users }) => users[0]
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


  // Donations, queries, etc to database
  makeUserDonation: async function(donation) {
    const that = this;
    try {
      const result = await db.query(
      `
        INSERT INTO donations
        (amount_cents, user_id, charity_id, employee_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *; 
      `,[donation.amount, donation.user_id, donation.charity.id, 1]
      )

      const newDonation = result.rows[0];
      const charity = await that.getCharityById(newDonation.charity_id);
      newDonation.logo = charity.logo;
      newDonation.name = charity.name;
      return newDonation;
      
    } catch(error) {
      console.log(error)
    }
  },

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