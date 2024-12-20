import { SharedEvent } from "@/types";
import { formatDateForICS } from "./date";

const roundToFourDecimals = (value: number): number => {
  return Math.round(value * 10000) / 10000;
};

export const generateICS = (sharedEvent: SharedEvent) => {
  const { title, description, icsLocation, startDate, endDate, notification } =
    sharedEvent;
  const icsContent = [];
  icsContent.push("BEGIN:VCALENDAR");
  icsContent.push("VERSION:2.0");
  icsContent.push("CALSCALE:GREGORIAN");
  icsContent.push("BEGIN:VEVENT");
  icsContent.push(`SUMMARY:${title}`);
  icsContent.push(`DESCRIPTION:${description}`);
  if (icsLocation && icsLocation.geocode)
    icsContent.push(`LOCATION:${icsLocation.geocode}`);
  icsContent.push(`DTSTART:${formatDateForICS(startDate)}`);
  icsContent.push(`DTEND:${formatDateForICS(endDate)}`);
  icsContent.push("BEGIN:VALARM");
  icsContent.push(`TRIGGER:${notification}`);
  icsContent.push("ACTION:DISPLAY");
  icsContent.push("DESCRIPTION:Напоминание о событии");
  icsContent.push("END:VALARM");
  if (
    icsLocation &&
    icsLocation.location[0] &&
    icsLocation.location[1] &&
    icsLocation.geocode
  ) {
    icsContent.push(
      `GEO:${roundToFourDecimals(
        icsLocation.location[0]
      )};${roundToFourDecimals(icsLocation.location[1])}`
    );
    icsContent.push(
      `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS=${
        icsLocation.geocode
      };X-APPLE-RADIUS=500;X-TITLE=${
        icsLocation.geocode
      }:geo:${roundToFourDecimals(
        icsLocation.location[0]
      )},${roundToFourDecimals(icsLocation.location[1])}`
    );
  }
  icsContent.push("END:VEVENT");
  icsContent.push("END:VCALENDAR");
  return icsContent.join("\n").trim();
};

export const downloadICS = (icsContent: string) => {
  const blob = new Blob([icsContent.trim()], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "event.ics";
  link.click();
  URL.revokeObjectURL(url);
};
