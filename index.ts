import { scrapper } from "./scrapper/scrapper";

const express = require("express");
const app = express();
const port = 3000;
const { query, validationResult } = require("express-validator");

app.get(
  "/api/scrape",
  [
    query("startlat")
      .isFloat()
      .withMessage("startlat must be a number")
      .toFloat(),
    query("startlon")
      .isFloat()
      .withMessage("startlon must be a number")
      .toFloat(),
    query("endlat").isFloat().withMessage("endlat must be a number").toFloat(),
    query("endlon").isFloat().withMessage("endlon must be a number").toFloat(),
    query("numberofresults")
      .isInt()
      .withMessage("numberofresults must be an integer")
      .toInt(),
  ],
  (
    req: {
      query: {
        startlat: any;
        startlon: any;
        endlat: any;
        endlon: any;
        numberofresults: any;
      };
    },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { errors: any }): any; new (): any };
      };
      json: (arg0: {
        status: number;
        errors: any;
        data: {
          startlat: number;
          startlon: number;
          endlat: number;
          endlon: number;
          numberofresults: number;
        }[];
      }) => void;
    }
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ status: 400, data: errors.array(), errors: errors.array() });
    }

    const { startlat, startlon, endlat, endlon, numberofresults } = req.query;
    
    scrapper(startlat, startlon, endlat, endlon, numberofresults).catch((error) => {
      console.log(error);
    });

    res.status(200);
    res.json({
      status: 200,
      errors: [],
      data: [
        {
          startlat,
          startlon,
          endlat,
          endlon,
          numberofresults,
        },
      ],
    });
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
