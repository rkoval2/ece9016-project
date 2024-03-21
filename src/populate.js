import {faker} from "@faker-js/faker";

import {db} from "./db.js";

export const populate = async (n = 50) => {
  await db.query(`
      CREATE TABLE IF NOT EXISTS employees
      (
          "id"         SERIAL PRIMARY KEY,
          "name"       TEXT        NOT NULL,
          "position"   TEXT        NOT NULL,
          "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ
      )
  `);

  const {rows} = await db.query("SELECT COUNT(id) FROM employees");

  if (rows.length && Number(rows[0].count) > 0) {
    return;
  }

  let sql = 'INSERT INTO employees("name", "position", "created_at") VALUES';
  const params = [];

  for (let i = 0; i < n; i++) {
    const employee = {
      name: faker.person.fullName(),
      position: faker.helpers.arrayElement(["Developer", "Manager", "Marketing", "Architect", "Designer", "Analyst", "Database Administrator"]),
      created_at: faker.date.past(),
    };

    if (i > 0) {
      sql += ",";
    }

    sql += ` ($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`;
    params.push(employee.name, employee.position, employee.created_at);
  }

  await db.query(sql, params);
}
