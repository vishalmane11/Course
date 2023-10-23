const CatchAsyncerror = require("../../Middleware/CatchAsyncerror");
let Stats = require("../../Schema/Stats");
module.exports = Dashboard = CatchAsyncerror(async (req, res, next) => {
  let stats = await Stats.find().sort({ createdAt: "desc" }).limit(12);
  let Statsdata = [];
  let requiredsize = 12 - stats.length;
  for (let i = 0; i < stats.length; i++) {
    Statsdata.unshift(stats[i]);
  }
  for (let i = 0; i < requiredsize; i++) {
    Statsdata.unshift({
      users: 0,
      subscribes: 0,
      views: 0,
    });
  }
  let userpercentage = 0;
  let subscibepercentage = 0;
  let viewspercentage = 0;
  let userprofit = true;
  let subscibeprofit = true;
  let viewsprofit = true;
  let usercount = Statsdata[11].users;
  let subscibecount = Statsdata[11].subscribes;
  let viewcount = Statsdata[11].views;
  // if last month subscibe is zero
  if (Statsdata[10].users === 0) userpercentage = usercount * 100;
  if (Statsdata[10].subscribes === 0) subscibepercentage = subscibecount * 100;
  if (Statsdata[10].views === 0) viewspercentage = viewcount * 100;
  else {
    let difference = {
      users: Statsdata[11].users - Statsdata[10].users,
      subscribes: Statsdata[11].subscribes - Statsdata[10].subscribes,
      views: Statsdata[11].views - Statsdata[10].views,
    };
    userpercentage = (difference.users / Statsdata[10].users) * 100;
    subscibepercentage =
      (difference.subscribes / Statsdata[10].subscribes) * 100;
    viewspercentage = (difference.views / Statsdata[10].views) * 100;
    if (userpercentage < 0) userprofit = false;
    if (subscibepercentage < 0) subscibeprofit = false;
    if (viewspercentage < 0) viewsprofit = false;
  }

  res.status(200).json({
    msg: "statsu ",
    stats: Statsdata,
    usercount,
    subscibecount,
    viewcount,
    userpercentage,
    subscibepercentage,
    viewspercentage,
    userprofit,
    viewsprofit,
    subscibeprofit,
  });
});
