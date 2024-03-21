import path from "node:path";
import url from "node:url";
import express from "express";
import {DateTime} from "luxon";

import {db} from "./db.js";

const escapeSqlLike = (value) => value.replaceAll(/([\\%_])/g, "\\$1");

export const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(path.dirname(url.fileURLToPath(import.meta.url)), "views"));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", async (req, res, next) => {
  try {
    const search = req.query.q ? String(req.query.q) : "";

    let sql = "SELECT * FROM employees";
    const params = [];

    if (search) {
      sql += ` WHERE "name" ILIKE $1 OR "position" ILIKE $1`
      params.push(`%${escapeSqlLike(search)}%`);
    }

    sql += ' ORDER BY "id" ASC';

    const result = await db.query(sql, params);

    const rows = result.rows.map((row) => ({
      ...row,
      created_at: DateTime.fromJSDate(row.created_at).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
    }))

    res.render("index", {rows});
  } catch (error) {
    console.error(error);
    next("Internal server error");
  }
});
