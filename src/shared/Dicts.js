import LogoMB from "../images/logos/Michael Buchman.jpg";
import LogoGD from "../images/logos/Grant Dakovich.jpg";
import LogoBZ from "../images/logos/Brenden Zarrinnam.jpg";
import LogoJP from "../images/logos/Joe Perry.jpg";
import LogoJE from "../images/logos/James Earley.jpg";
import LogoJS from "../images/logos/Jonathan Setzke.jpg";
import LogoRR from "../images/logos/Ryan Rasmussen.jpg";
import LogoTB from "../images/logos/Tyler Brown.jpg";
import LogoNE from "../images/logos/Nick Eufrasio.jpg";
import LogoCD from "../images/logos/Connor DeYoung.jpg";
import LogoDef from "../images/logos/Wallerstein.jpg";
import fPlace from "../images/trophies/1st.png";
import sPlace from "../images/trophies/2nd.png";
import tPlace from "../images/trophies/3rd.png";
import Ring from "../images/trophies/Ring.png";
import iconAp from "../images/letter-icons/A+.png";
import iconA from "../images/letter-icons/A.png";
import iconAm from "../images/letter-icons/A-.png";
import iconBp from "../images/letter-icons/B+.png";
import iconB from "../images/letter-icons/B.png";
import iconBm from "../images/letter-icons/B-.png";
import iconCp from "../images/letter-icons/C+.png";
import iconC from "../images/letter-icons/C.png";
import iconCm from "../images/letter-icons/C-.png";
import iconD from "../images/letter-icons/D.png";
import iconF from "../images/letter-icons/F.png";

export const yearsPlayed = ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]; // Requires draft data in db
export const yearsCompleted = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"]; // Requires final standings in db

export const imgDict = {
  "Michael Buchman": LogoMB,
  "Grant Dakovich": LogoGD,
  "Brenden Zarrinnam": LogoBZ,
  "Joe Perry": LogoJP,
  "James Earley": LogoJE,
  "Jonathan Setzke": LogoJS,
  "Ryan Rasmussen": LogoRR,
  "Tyler Brown": LogoTB,
  "Nick Eufrasio": LogoNE,
  "Connor DeYoung": LogoCD,
  "Zach Way": LogoDef,
  "Sal DiVita": LogoDef,
  "": LogoDef,
  1: fPlace,
  2: sPlace,
  3: tPlace,
  Ring: Ring,
};

export const gradeDict = {
  "A+": iconAp,
  A: iconA,
  "A-": iconAm,
  "B+": iconBp,
  B: iconB,
  "B-": iconBm,
  "C+": iconCp,
  C: iconC,
  "C-": iconCm,
  D: iconD,
  F: iconF,
};

export const placeDict = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th",
  5: "5th",
  6: "6th",
  7: "7th",
  8: "8th",
  9: "9th",
  10: "10th",
};
