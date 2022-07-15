import { imgDict, gradeDict } from "./Dicts.js";

//----------------------------------------
//  OVERVIEW
//----------------------------------------
export const yearlyOptions = {
  scales: {
    y1: {
      type: "linear",
      display: true,
      position: "left",
      min: 0,
      max: 16,
    },
    y2: {
      type: "linear",
      display: true,
      position: "right",
      min: 0,
      max: 3000,
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
  maintainAspectRatio: false,
};

//----------------------------------------
//  STANDINGS
//----------------------------------------

export const renderTrophyStandings = (props) => {
  if (props.record.placement > 3) {
    return <span>{props.record.placement}</span>;
  } else {
    return (
      <span>
        <img
          src={imgDict[props.record.placement]}
          alt="table-trophy"
          style={{ width: "30px", borderRadius: "100%" }}
        ></img>
      </span>
    );
  }
};

export const renderLogoStandings = (props) => {
  return (
    <span>
      <img
        src={imgDict[props.record.owner]}
        alt="table-logo"
        style={{ width: "40px", borderRadius: "100%" }}
      ></img>
    </span>
  );
};

export const standingsTableOptions1 = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "logo",
    displayName: "Owner",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderLogoStandings,
  },
  {
    name: "owner",
    displayName: "",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "gp",
    displayName: "Games Played",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "win",
    displayName: "Wins",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "loss",
    displayName: "Losses",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "tie",
    displayName: "Ties",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pct",
    displayName: "Win %",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pf",
    displayName: "PF",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pa",
    displayName: "PA",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
];

export const standingsTableOptions2 = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderTrophyStandings,
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "logo",
    displayName: "Owner",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderLogoStandings,
  },
  {
    name: "owner",
    displayName: "",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "gp",
    displayName: "Games Played",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "win",
    displayName: "Wins",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "loss",
    displayName: "Losses",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "tie",
    displayName: "Ties",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pct",
    displayName: "Win %",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pf",
    displayName: "PF",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
  {
    name: "pa",
    displayName: "PA",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true,
  },
];

//----------------------------------------
//  RECORDS
//----------------------------------------
export const renderLogoRecords = (props) => {
  return (
    <span>
      <img
        src={imgDict[props.record.owner]}
        alt="search-bar-logo"
        style={{ width: "30px", borderRadius: "100%" }}
      ></img>
    </span>
  );
};

export const recordTableOptions1 = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "logo",
    displayName: "Owner",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
    render: renderLogoRecords,
  },
  {
    name: "owner",
    displayName: "",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "year",
    displayName: "Year",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "week",
    displayName: "Week",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "score",
    displayName: "Score",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
];

export const recordTableOptions2 = [
  {
    name: "placement",
    displayName: "Place",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "matchup",
    displayName: "Matchup",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "year",
    displayName: "Year",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "week",
    displayName: "Week",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
  {
    name: "points",
    displayName: "Points",
    thClassName: "standings-th-header",
    tdClassName: "standings-td",
  },
];

//----------------------------------------
//  DRAFTS
//----------------------------------------
export const renderIconDrafts = (props) => {
  return (
    <span>
      <img
        src={gradeDict[props.record.Grade]}
        alt="letter-icon"
        style={{ width: "50px" }}
      ></img>
    </span>
  );
};

export const fullDraftOptions = [
  {
    name: "Round",
    displayName: "Round",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Pick",
    displayName: "Pick",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Player",
    displayName: "Player",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Team",
    displayName: "Team",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Position",
    displayName: "Position",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Owner",
    displayName: "Owner",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "PRK",
    displayName: "PRK",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Games",
    displayName: "GP",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "FPTSG",
    displayName: "FPTS/G",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "FPTS",
    displayName: "FPTS",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Grade",
    displayName: "Grade",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderIconDrafts,
  },
];

export const indvidualDraftOptions = [
  {
    name: "Round",
    displayName: "Round",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Pick",
    displayName: "Pick",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Player",
    displayName: "Player",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Team",
    displayName: "Team",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Position",
    displayName: "Position",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "PRK",
    displayName: "PRK",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Games",
    displayName: "GP",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "FPTSG",
    displayName: "FPTS/G",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "FPTS",
    displayName: "FPTS",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Grade",
    displayName: "Grade",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderIconDrafts,
  },
];

export const draftRankOptions = [
  {
    name: "owner",
    displayName: "Team",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "value",
    displayName: "Value-Based Metric Score",
    thClassName: "standings-th",
    tdClassName: "standings-td",
  },
  {
    name: "Grade",
    displayName: "Grade",
    thClassName: "standings-th",
    tdClassName: "standings-td",
    render: renderIconDrafts,
  },
];

//----------------------------------------
//  POWER RANKINGS
//----------------------------------------
// Need to figure out classnames for styling and the actual CSS file later
// Or not, it just works if I leave them :)
export const powerRankingTableFields = [
  {
    name: "ranking",
    displayName: "Rank",
    thClassName: "power-th-header",
    tdClassName: "power-td",
  },
  {
    name: "team",
    displayName: "Team",
    thClassName: "power-th-header",
    tdClassName: "power-td",
  },
  {
    name: "name",
    displayName: "Name",
    thClassName: "power-th-header",
    tdClassName: "power-td",
  },
  {
    name: "power",
    displayName: "Power Score",
    thClassName: "power-th-header",
    tdClassName: "power-td",
  },
];
