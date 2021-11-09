import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerHeader from 'components/ContainerHeader';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';

class TermsOfUse extends Component {

  componentDidMount() {
    //this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
  }

  render() {
    return (
      <div className="app-wrapper termsofuse">
        <Helmet>
              <title>Terms of Use | JobsLab</title>
        </Helmet>
        <div className="termsofuse-imgcontainer">
          <div className="termsofuse-wordcontainer">
            <h3>Terms of Use</h3>
          </div>
          <div className="color-overlay termsofuse"></div>
          <img src={encodeURI(WEB_IMAGE_URL+"terms-of-use/Canva+-+Office+desk.jpg")}/>
        </div>
        <div className="termsofuse-padding">
        <div className="termofuse-wordbox">
          {/*<h2>Terms of Use</h2>*/}
          {/*
          <h3>Contents</h3>
          <ul>
            <li>1. Common Rules</li>
            <li>2. Individual Rules</li>
              <ul>
                <li>2.1 JobsLab Candidates</li>
                <li>2.2 JobsLab Clients</li>
              </ul>
          </ul>
          */}
          
          <div>
          <h3>1. Accepting these terms</h3>
          <p>
          If you access or use the Platform, it means you agree to be bound by all of the terms below. So, before you use the Platform, please read all of the terms. If you don't agree to all of the terms below, please do not use the Platform. Also, if a term does not make sense to you, please let us know by e-mailing&nbsp;
          <a href="mailto:support@jobslab.io?Subject=&Body=">support@jobslab.io</a>.
          </p>
          </div>
          
          <div>
          <h3>2. Changes to these Terms</h3>
          <p>
          We reserve the right to modify these Terms at any time. For instance, we may need to change these Terms if we come out with a new feature or for some other reason.
          </p>
          <p>
          Whenever we make changes to these Terms, the changes are effective immediately after we post such revised Terms (indicated by revising the date at the top of these Terms) or upon your acceptance if we provide a mechanism for your immediate acceptance of the revised Terms (such as a click-through confirmation or acceptance button). It is your responsibility to check the JobsLab website for changes to these Terms.
          </p>
          <p>
          If you continue to use the Platform after the revised Terms go into effect, then you have accepted the changes to these Terms.
          </p>
          </div>
          
          <div>
          <h3>3. Privacy Policy</h3>
          <p>
          For information about how we collect and use information about users of the Platform, please check out our privacy policy available at&nbsp;
          <a onClick={(e) => this.props.history.push("/privacy-policy")}>Privacy Policy</a>.
          </p>
          </div>
          
          <div>
          <h3>4. Third-Party Services</h3>
          <p>
          From time to time, we may provide you with links to third party websites or services that we do not own or control. Your use of the Platform may also include the use of applications that are developed or owned by a third party. Your use of such third party applications, websites, and services is governed by that party's own terms of service or privacy policies. We encourage you to read the terms and conditions and privacy policy of any third party application, website or service that you visit or use.
          </p>
          </div>
          
          <div>
          <h3>5. Creating Accounts</h3>
          <p>
          When you create an account or use another service to log in to the Platform, you agree to maintain the security of your password and accept all risks of unauthorized access to any data or other information you provide to the Platform.
          </p>
          <p>
          If you discover or suspect any Platform security breaches, please let us know as soon as possible.
          </p>
          </div>
          
          <div>
          <h3>6. Service Categories & Fees</h3>
          <span>Service Packages</span>
          <p>
          In full consideration for The Jobs Laboratory Limited's (hereafter known as “JobsLab” or the “Company”) provision of Services in placing candidates within Client companies, JobsLab will charge the hiring company a placement fee of a percentage of the selected candidate’s Gross Annual Remuneration Package, including all money payable and benefits offered to the employed candidate, not limited to salary, guaranteed bonus, commission, profit sharing or other specified financial benefits.  The percentage of the placement fee will vary depending on the package the client company has selected.  In the event the bonus and allowances mentioned above cannot be determined, JobsLab will calculate the fee with the consideration that such bonus is equivalent with two-month basis salary.
          </p>
          <span>Subscription Packages</span>
          <p>
          In the case where the Client has subscribed to a subscription package for the Service, the Client will be entitled to unlimited hires at a fixed rate per month upon agreement.
          </p>
          </div>
          
          <div>
          <h3>7. Reference</h3>
          <p>
          All Placement Fees and incidentals are invoiced and are to be settled in Hong Kong dollars. In the case where the client has no registered office in Hong Kong, any charges associated with exchange rate variation, bank transfers and withholding tax, are to be borne by Client. Billing to the client is subject to prevailing taxes at the time of invoicing.
          </p>
          </div>
          
          <div>
          <h3>8. Replacement Conditions</h3>
          <p>
          If the employment relationship between the nominated candidate through the JobsLab Platform and the hiring company are terminated within the guarantee period of service package (either zero or six months depending on the service package) from the starting date of the employment, JobsLab will provide search for one replacement without extra charge on the condition that:
          </p>
          <p>
          a) Candidate leaves due to his/her own personal choice, or the hiring company deem the candidate does not meet the company’s initial goal and objective, rather than due to any redundancy measures.
          </p>
          <p>
          b) All payments have been settled in accordance with the placement fee agreement.
          </p>
          <p>
          c) The request for replacement is given exclusively to JobsLab.
          </p>
          <p>
          d) The replacement conditions only apply for initial candidates placed by JobsLab and shall not be applied to the replacement candidate.
          </p>
          <p>
          e) If the new replacement is concluded at the salary level higher than the previous salary appointed, then an additional charge shall be applied.
          </p>
          <p>
          f) You must inform JobsLab that the termination of employment relationship with the initial candidate within 10 days of its occurring.
          </p>
          <p>
          In case of a termination of the candidate that is nominated through the JobsLab Platform, an amount equivalent to the placement fee will be credited to the Client for their next placement.
          </p>
          <p>
          The replacement guarantee will not be exercised in the case where the resignation or termination is as a result of the changes to the employer’s circumstances, job description, retrenchment, harassment (in employment) or unsafe conditions to the workplace.
          </p>
          </div>
          
          <div>
          <h3>9. Resume Ownership</h3>
          <p>
          The employment of a candidate introduced by JobsLab through any channel for a similar or non-similar role within 12 months of introduction will render the Client liable for full payment of the fee.
          </p>
          <p>
          Upon presentation of the candidate’s resume, the Client shall provide written confirmation to the Company if the candidate is already in their database. The Client may, at their sole discretion, offer employment to any candidate presented by the Company.
          </p>
          <p>
          In the case where the Client agreed to hire any candidate presented by JobsLab Platform, without informing or notify JobsLab of such event. JobsLab will charge a fine of 3 times of the actual placement fee and immediately possess the rights to discontinue the service to the client without prior notice.
          </p>
          <p>
          In the event that the client receives a similar candidate via another third party before being introduced by JobsLab, the client shall provide evidence that such event happened, and as such, can proceed with the mentioned third party without having any obligation to answer to JobsLab about the employment of such candidates.
          </p>
          </div>
          
          <div>
          <h3>10. Invoicing & Payment</h3>
          <p>
          JobsLab Company Limited shall invoice the client for the Placement Fee on the first day of the candidate’s contract signing date. The invoice amount is due and payable within 30 days of the date of the invoice.
          </p>
          <p>
          Should the Client fail to settle all payment before the designated timeline, JobsLab will reserve the right to impose an interest charge for late payment, calculated on the basis of the interest rates set by the local State Bank.
          </p>
          </div>
          
          <div>
          <h3>11. Referral Rewards & Successful Job Applicant Rewards</h3>
          <p>
          For information about referral rewards and successful job applicant rewards available to users of the Platform, please check out our Referral Rewards & Successful Job Applicant Rewards policy available at Rewards Policy.
          </p>
          </div>
          
          <div>
          <h3>12. Responsibility Disclaimer & Confidentiality</h3>
          <p>
          JobsLab shall, in all its power, take reasonable care in the selection of candidates. However, we are not responsible for any negligence, dishonesty, misconduct, or lack of skills of any candidates.
          </p>
          <p>
          All parties must not at any time disclose any confidential matters, or information relating the engaged service, including candidates, Clients and JobsLab information without prior consent from the particular party.
          </p>
          </div>
          
          <div>
          <h3>13. Change of Term & Termination</h3>
          <p>
          All terms cannot be changed without a written consent of JobsLab’ local General Manager or any members of JobsLab board of management.
          </p>
          <p>
          All of the above terms and conditions shall come into effect right after both parties execute the service engagement, and shall last until either party terminate the agreement through giving a 30 days’ prior written notice.
          </p>
          </div>
          
          <div>
          <h3>14. JobsLab Materials</h3>
          <p>
          JobsLab puts a considerable effort into creating the Service including, the logo and all designs, text, graphics, pictures, information and other content (excluding your content). This property is owned by us or our licensors and it is protected by Hong Kong, and international copyright laws. We grant you a limited right to use it.
          </p>
          <p>
          However, unless we expressly state otherwise, your rights do not include: (i) publicly performing or publicly displaying the Service; (ii) modifying or otherwise making any derivative uses of the Service or any portion thereof; (iii) using any data mining, robots or similar data gathering or extraction methods; (iv) downloading (other than page caching) of any portion of the Service or any information contained therein; (v) reverse engineering or accessing the Service in order to build a competitive product or service; or (vi) using the Service other than for its intended purposes. If you are in violation of this agreement, we reserve the right to terminate your use of the Service.
          </p>
          </div>
          
          <div>
          <h3>15. Hyperlinks and Third Party Content</h3>
          <p>
          You may create a hyperlink to the Platform. But, you may not use, frame or utilize framing techniques to enclose any of our trademarks, logos or other proprietary information without our express written consent.
          </p>
          <p>
          JobsLab makes no claim or representation regarding, and accepts no responsibility for third party websites accessible by hyperlink from the Platform or websites linking to the Platform. When you leave the Platform, you should be aware that these Terms and our policies no longer govern.
          </p>
          <p>
          If there is any content on the Platform from you and others, we don't review, verify or authenticate it, and it may include inaccuracies or false information. We make no representations, warranties, or guarantees relating to the quality, suitability, truth, accuracy or completeness of any content contained in the Platform. You acknowledge sole responsibility for and assume all risk arising from your use of or reliance on any content.
          </p>
          </div>
          
          <div>
          <h3>16. Additional Terms and Conditions</h3>
          <p>
          The Platform and any other service and content included on or otherwise made available to you through the service are provided to you on an as is or as available basis without any representations or warranties of any kind. We disclaim any and all warranties and representations (express or implied, oral or written) with respect to the service and content included on or otherwise made available to you through the service whether alleged to arise by operation of law, by reason of custom or usage in the trade, by course of dealing or otherwise.
          </p>
          <p>
          In no event will JobsLab be liable to you or any third party for any special, indirect, incidental, exemplary or consequential damages of any kind arising out of or in connection with the service or any other service and/or content included on or otherwise made available to you through the service, regardless of the form of action, whether in contract, tort, strict liability or otherwise, even if we have been advised of the possibility of such damages or are aware of the possibility of such damages. Our total liability for all causes of action and under all theories of liability will be limited to the amount you paid to JobsLab. This section will be given full effect even if any remedy specified in this agreement is deemed to have failed of its essential purpose.
          </p>
          <p>
          You agree to defend, indemnify and hold us harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys' fees, costs, penalties, interest and disbursements) we incur in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party relating to your use of the service or the use of the service by any person using your account, including any claim that your use of the service violates any applicable law or regulation, or the rights of any third party, and/or your violation of these Terms.
          </p>
          </div>
          
          <div>
          <h3>17. Feedback</h3>
          <p>
          Please let us know what you think of the Platform, these Terms and, in general, www.jobslab.io / JobsLab application. When you provide us with any feedback, comments or suggestions about the Platform, these Terms and, in general, www.jobslab.io / JobsLab application, you irrevocably assign to us all of your right, title and interest in and to your feedback, comments and suggestions.
          </p>
          </div>
          
          <div>
          <h3>18. Questions & Contact Information</h3>
          <p>
          Questions or comments about the Platform may be directed to us at the email address&nbsp;
          <a href="mailto:support@jobslab.io?Subject=&Body=">support@jobslab.io</a>.
          </p>
          </div>
          
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TermsOfUse);