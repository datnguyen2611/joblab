import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerHeader from 'components/ContainerHeader';
import { Helmet } from 'react-helmet';

import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';



class FAQ extends Component {

  componentDidMount() {
    //this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
  }

  render() {
    return (
      <div className="app-wrapper termsofuse">
        <Helmet>
              <title>FAQ | JobsLab</title>
        </Helmet>
        <div className="termsofuse-imgcontainer faq">
          <div className="termsofuse-wordcontainer">
            <h3>Frequently Asked Questions</h3>
          </div>
          <div className="color-overlay termsofuse"></div>
          <img src={encodeURI(WEB_IMAGE_URL+"faq/Canva+-+Office+desk+(1).jpg")}/>
        </div>
        <div className="termsofuse-padding faq">
        <div className="termofuse-wordbox">
          
          <div>
          <h3>
          1. I have completed registration. What’s next?
          </h3>
          <p>
          Once you have completed your profile on JobsLab, our algorithms will match you against ALL open jobs. You will see all matching jobs on your dashboard and be able to apply to them with a simple click.Just sit tight and let our algorithm and our career experts do the work!
          </p>
          </div>
          
          <div>
          <h3>
          2. I was not matched to the job I applied for and now I don’t see any matching jobs on my dashboard. What do I do now?
          </h3>
          <p>
          Don’t worry if you do not see any matching jobs. We will continue to match you against all new jobs, as they are created. You will be notified via email or SMS as soon as a new job matching your profile is available. Meanwhile, we recommend you to visit our job advice forum to get insights and further job search support.
          </p>
          </div>
          
          <div>
          <h3>
          3. I received an email or SMS saying I am matched to a job. What do I do next?
          </h3>
          <p>
          Once you are matched to a role, you can choose to share your profile with the employer by clicking on apply or you can choose to decline the role. The Employer will only receive your application if you click apply on a matched role. You can also reach out to our career experts for more information on the job we’ve matched for you.
          </p>
          </div>
          
          <div>
          <h3>
          4. Why was my application not retained? I was not given any reason for rejection.
          </h3>
          <p>
          JobsLab matches candidates’ unique profile, their skills and preferences to the detailed requirements of the job. If the application is not retained, it is more an indication of fit for a particular requirement and not of capabilities. Your profile will continue to be screened against all our current and future openings and you will be notified when a suitable role comes up soon!
          </p>
          </div>
          
          <div>
          <h3>
          5. I had all the pre-requisites mentioned in the job description. Yet your AI did not match me to the role. Why is that?
          </h3>
          <p>
          JobsLab matches candidates’ unique profile, their skills and preferences to the detailed requirements of the recruiter. If the application is not retained, it is more an indication of fit for a particular requirement and not of capabilities. Your profile will continue to be screened against all our current and future openings and you will be notified when a suitable role comes up.
          </p>
          </div>
          
          <div>
          <h3>
          6. I thought I would be good at the role. I got a pretty quick rejection with very little feedback as to why.
          </h3>
          <p>
          JobsLab matches candidates’ unique profile, their skills and preferences to the detailed requirements of the recruiter. If the application is not retained, it is more an indication of fit for a particular requirement and not of capabilities. Your profile will continue to be screened against all our current and future openings and you will be notified when a suitable role comes up.
          </p>
          </div>
          
          <div>
          <h3>
          7. Each time I clicked SUBMIT, it indicates that the submission is successful, then why does it always show “0 applications” on my dashboard?
          </h3>
          <p>
          Once your profile is complete, you are automatically matched against all open roles and notified when a suitable role comes up. You do not need to resubmit your CV every time! The “Applications” you see on the dashboard are the ones you apply to after you have been matched by our algorithms and our career experts to a specific open job.
          </p>
          </div>
          
          <div>
          <h3>
          8. I saw your ad in a jobsite, but could not find it after logging into the JobsLab.
          </h3>
          <p>
          Once your profile is complete, you don’t need to apply for jobs on JobsLab as you are automatically matched against all open roles. That’s why you don’t see the jobs page on your dashboard.
          </p>
          </div>
          
          <div>
          <h3>
          9. How would I know if jobs listed are open to foreigners as well?
          </h3>
          <p>
          Once your profile is complete, the algorithm takes into account your visa status and the employers requirements.
          </p>
          </div>
          
          <div>
          <h3>
          10. Are there any humans doing the matching?
          </h3>
          <p>
          Hiring on our platform is based on Augmented Intelligence meaning that we combine machine learning algorithms and experienced career experts. Our algorithms are based on decades of specialist recruitment experience and use data driven insights to remove bias in the recruiting process and match you to roles where you have a high chance of securing an interview.
          </p>
          </div>
          
          <div>
          <h3>
          11. Do you also help older candidates find jobs?
          </h3>
          <p>
          We at JobsLab strive to keep the hiring process as transparent and unbiased as possible. While matching roles, age is not a factor. The AI takes into consideration important factors such as skills, experience, preferences and working style and matches them to employer requirements. We will be honoured to help someone so experienced find the right job!
          </p>
          </div>
          
          <div>
          <h3>
          12. How do I claim my new job reward?
          </h3>
          <p>
          We at JobsLab believe in celebrating your success with a dream holiday. Upon passing your probation with your employer you will be automatically sent a travel voucher for you to use to buy a holiday anywhere in the world! You will receive this voucher either electronically or it will be posted to the address that you provided to JobsLab. Please see the terms and conditions of use issued by our travel partner.
          </p>
          </div>
          
          <div>
          <h3>
          13. I have been referred by a friend to a job opening on JobsLab, what do I do now?
          </h3>
          <p>
          Your job recommendation through a friend will be added to your dashboard. Simply review the job they thought was great for you and decide whether you wish to apply. If you have not registered to JobsLab, you’ll need to register to review the position. Referrals on JobsLab can be made anonymously, so don’t be surprised if someone you know has secretly admired you! Our career experts are available to speak with you before you make a decision as to whether to apply for the job that was referred to you.
          </p>
          </div>
          
          <div>
          <h3>
          14. How do I refer someone to a job?
          </h3>
          <p>
          Ever wanted to try your hand at being a talent spotter? If you see a job on our site and you know someone who’d be perfect for it, simply click on the refer button on the job description and decide whether you would like to personalise the invite or whether to remain anonymous. Referrals on JobsLab are extremely rewarding and helps to show your admiration for someone’s skills! See whether you can beat our AI in making the match.
          </p>
          </div>
          
          <div>
          <h3>
          15. How do I claim my referal awards?
          </h3>
          <p>
          JobsLab believe in supporting a ‘gig economy’ and pay substantial rewards for your ability to identify talent. When your referred candidate passes probation, we’ll send you a cheque to the address that you have provided us in your profile page. If a candidate has been referred by several sources, the first referee on our system will be issued the reward. You will be notified the good news when the candidate gets the job so that you can use some of the referral money to celebrate with them! Our admin team will be on hand to support you to collect your reward.
          </p>
          </div>
          
          
          
          
          </div>
        </div>
      </div>
    )
  }
}

export default FAQ;