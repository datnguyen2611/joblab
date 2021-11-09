var axios = require("axios");
require("babel-register")({
  presets: ["es2015", "react"]
});
 
const router = require("./sitemap/sitemap-routes").default;
const staticRouter = require("./sitemap/sitemap-static").default;
const jobRouter = require("./sitemap/sitemap-job").default;

const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
  
    var mainSitemap =  new Sitemap(router)
          .build("https://jobslab.io");
    for (let i = 0; i < mainSitemap.sitemaps[0].urls.length; i++) {
      mainSitemap.sitemaps[0].urls[i].lastmod = new Date();
    }
    mainSitemap.sitemaps[0].urls.splice(0, 1);
    
    var staticSitemap =  new Sitemap(staticRouter)
          .build("https://jobslab.io");
    for (let i = 0; i < staticSitemap.sitemaps[0].urls.length; i++) {
      staticSitemap.sitemaps[0].urls[i].changefreq =  'weekly';
      staticSitemap.sitemaps[0].urls[i].priority = 0.8;
      staticSitemap.sitemaps[0].urls[i].lastmod = new Date();
    }
    
    let jobIdMap = [];
    const jobs = await axios.post('https://admin.jobslab.io/api/sitemap/get/jobs', 
      {
        withCredentials: true,
      }, 
      {
        auth: {
          username: 'jobslabadmin',
          password: 'J0bsLa8Admin'
        }
      }) 
      .then(res => {
        if (res.data.isSuccess) {
          console.log("Get job list success");
          return res.data.jobs;
        }
        else
          return {};
      })
      .catch(function (err) {
        console.log("Cannot get job list!");
        console.log(err);
        return {};
      });   
     
    for(var i = 0; i < jobs.length; i++) {
      jobIdMap.push({ jobId: jobs[i]._id });
    } 
    
    const paramsConfig = {
      "/job/:jobId": jobIdMap
    };
      
    
    var jobSitemap =  new Sitemap(jobRouter)
          .applyParams(paramsConfig)
          .build("https://jobslab.io");
    for (let i = 0; i < jobSitemap.sitemaps[0].urls.length; i++) {
      jobSitemap.sitemaps[0].urls[i].changefreq =  'monthly';
      jobSitemap.sitemaps[0].urls[i].priority = 0.7;
      jobSitemap.sitemaps[0].urls[i].lastmod = new Date();
    }
    jobSitemap.sitemaps[0].urls.splice(0, 1);
  
    mainSitemap.save("./public/sitemap.xml");
    staticSitemap.save("./public/static-sitemap.xml");
    jobSitemap.save("./public/job-sitemap.xml");
}

generateSitemap();