import React from "react";
import { Card, CardContent } from "@mui/material";
import { t } from "i18next";

export default function DetailList({ data }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.map((item, index) => (
        <Card key={index} className="rounded-2xl p-4 shadow-sm w-full">
          <CardContent className="p-0">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-lg">{item.title1}</p>
                <p className="text-base mt-1 font-semibold">{item.cu1Weight} Kg</p>
                <ul className="text-sm text-gray-600 list-disc ml-4 mt-1">
                  {item.cu1Details?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-lg">{item.title2}</p>
                <p className="text-base mt-1 font-semibold">{item.cu2Weight} Kg</p>
                <ul className="text-sm text-gray-600 list-disc ml-4 mt-1">
                  {item.cu2Details?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start justify-end text-right">
                <div>
                  <p className="font-semibold text-lg">{t("detailLayout.total")}</p>
                  <p className="text-xl font-bold text-blue-600">{item.total} Kg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
