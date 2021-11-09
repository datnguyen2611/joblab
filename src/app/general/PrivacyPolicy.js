import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContainerHeader from 'components/ContainerHeader';
import { Helmet } from 'react-helmet';

import { HORIZONTAL_NAVIGATION } from 'constants/ActionTypes';
import { VERTICAL_NAVIGATION } from 'constants/ActionTypes';
import { WEB_IMAGE_URL } from 'constants/PictureUrl';


class PrivacyPolicy extends Component {

  componentDidMount() {
    //this.props.updateHeaderStyle(VERTICAL_NAVIGATION, true);
    this.props.updateHeaderStyle(HORIZONTAL_NAVIGATION, true);
  }

  render() {
    return (
      <div className="app-wrapper termsofuse">
        <Helmet>
              <title>Privacy Policy | JobsLab</title>
        </Helmet>
        <div className="termsofuse-imgcontainer privacy">
          <div className="termsofuse-wordcontainer">
            <h3>Privacy and Cookie Policy</h3>
          </div>
          <div className="color-overlay termsofuse"></div>
          <img src={encodeURI(WEB_IMAGE_URL+"privacy-policy/privacypolicy.jpg")}/>
        </div>
        <div className="termsofuse-padding">
        <div className="termofuse-wordbox">
          <div>
          <p>
          We, The Jobs Laboratory Ltd., a Hong Kong corporation with offices at 17F Tesbury Centre, Wan Chai, Hong Kong ("The Jobs Laboratory", “JobsLab”, "we", or "us"), explain in this Privacy and Cookie Policy (the “Policy”) how we collect, process and/or use information that we receive via our websites, emails we send, and mobile applications (collectively, the "Platform") that link to this Policy, as amended from time to time. This Policy describes how The Jobs Laboratory collects, processes, uses, shares and secures the personal information you provide. It also describes your choices regarding use, access, and correction of your personal information. For purposes of this Policy, personal information shall mean any information relating to an identified or identifiable natural person.
          </p>
          <p>
          This Policy applies only to information we collect, process and use through the Platform. This Policy does not apply to information that we collect through other channels, such as information that we collect offline, from other websites or from emails you send us.
          </p>
          </div>
          
          <div>
          <h3>Information We Collect</h3>
          <p>
          If you connect to the Platform using Linkedin, Facebook, Google+, or another social networking site (each a "Social Networking Site"), we will receive information that you authorize the Social Networking Site to share with us, which may include public profile information, birthday, current city work, school, and email address. When we receive this information, it becomes JobsLab’s account information for purposes of your use of the Platform. This information also constitutes personal information and is therefore subject to this Policy. Any information that we collect from your Social Networking Site account may depend on the privacy settings you have set with the Social Networking Site, so please consult the Social Networking Site's privacy and data practices. You have the ability to disconnect your Social Networking Site account from your JobsLab account by adapting the privacy settings in your Social Networking Site account. If you come to the Platform through a Social Networking Site, from other websites or with devices that enable third parties to collect information from or about you, such third parties receive information about you subject to their privacy policies.
          </p>
          <p>
          On certain JobsLab domains, when you set up an individual user account on the Platform, you may create a profile (a "Profile") that will include personal information you provide. At your request, we will create your Profile with information we extract from a resume you have uploaded on the Platform. When you fill out and save your Profile, your saved Profile can be viewed by prospective employers, subject to visibility settings you control. Because your anonymity on our Platform is important, your Profile does not include or link to information you submit to the Platform anonymously (for example, the reviews, salaries, benefits, and company ratings information you submit anonymously).
          </p>
          </div>
          
          <div>
          <h3>Information We Collect Automatically</h3>
          <p>
          When you use the Platform, your device is automatically providing information to us so we can respond and customize our response to you. The type of information we collect by automated means generally includes technical information about your computer, such as your IP address or other device identifier, the type of device you use, and operating system version. The information we collect also may include usage information and statistics about your interaction with the Platform. That information may include the URLs of our web pages that you visited, URLs of referring and exiting pages, page views, time spent on a page, number of clicks, platform type, location data (if you have enabled access to your location on your mobile device), and other information about how you used the Platform.
          </p>
          </div>
          
          <div className="terms-i">
          <i>
          Automated means of data collection include the following:
          </i>
          </div>
          
          <div className="privacy-span">
          <span>Cookies and Tracking Technologies.</span>
          <p>
          Technologies such as: cookies, web beacons, locally shared objects (sometimes called "flash cookies"), mobile identifiers and similar technologies ("Cookies") are used by JobsLab and our partners (such as advertising, marketing and analytics providers) ("Ad Partners"). We use Cookies to remember users’ settings as well as for authentication and analytics. These technologies may be used in analyzing trends, administering the Platform, tracking users’ movements around the Platform and to gather demographic information about our user base as a whole. Our Ad Partners may also use such technologies to deliver advertisements to you. You can control the use of Cookies at the individual browser level, but if you choose to disable Cookies, it may limit your use of certain features or functions on our website or service. 
          </p>
          </div>
          
          <div className="privacy-span">
          <span>Log File Information.</span>
          <p>
          Log file information is automatically reported by your browser or mobile application each time you access a website on our Platform. For example, when you access a JobsLab website, our servers automatically record certain information that your web browser sends when you visit any website. These server logs include information such as your web request, Internet Protocol ("IP") address, browser type, referring / exit pages and URLs, number of clicks, domain names, landing pages, and pages viewed.
          </p>
          </div>
          
          <div className="privacy-span">
          <span>Device Information.</span>
          <p>
          We collect information about the device you use to access the Platform, including type of device, operating system, settings, and unique device identifiers, and IP address. Whether we collect some or all of this information often depends on what type of device you’re using and its settings. For example, different types of information are available depending on whether you’re using a Mac or a PC, or an iPhone or Android phone. We collect the device type and any other information you choose to provide, such as username, geolocation, or email address. We also use mobile analytics software to allow us to better understand the functionality of our mobile software on your phone. This software records information such as how often you use the application, the events that occur within the application, aggregated usage, performance data, and where the application was downloaded from. We do not link the information we store within the analytics software to any personally identifiable information you submit within the mobile application.
          </p>
          </div>
          
          <div>
          <h3>How We Use Information</h3>
          <p>
          We use the information we collect to provide our services. In order for us to best provide our services (and to help make it feasible for us to do so), it is essential that we are able to collect and use the information as described in this Policy. So it is largely necessary for fulfilling the relationship we have with you, and, where that is not the case, we have a legitimate interest in using the information we collect, including personal information, for these purposes:
          </p>
          <ul>
            <li>
            to provide you with personalized content, services and offers of services offered by JobsLab, as well as other promotional content and services, or your resume or Profile information, to determine relevant search results and provide you with recommended jobs on JobsLab, we may reach out to you about jobs or companies you may be interested in; we also use your IP address and mobile device for these purposes; For the purposes of this Policy, "affiliates" means any entity that directly or indirectly, controls, is controlled by, or is under common control of or with JobsLab, Inc., now or in the future. "Control" for these purposes means having a majority of shares or the right and ability to direct management.
            </li>
            <li>
            to moderate and display the employer reviews, interview reviews, salary reports and other content you have submitted for the benefit of our other users;
            </li>
            <li>
            to customize and improve the features, performance, and support of the JobsLab site and sites of JobsLab affiliates;
            </li>
            <li>
            to permit JobsLab or a JobsLab affiliate to recommend a JobsLab user (and that user’s resume or resume extract) to an employer hosted by JobsLab or to an employer hosted by a JobsLab affiliate, subject to visibility settings you control;
            </li>
            <li>
            to permit JobsLab to contact JobsLab users with respect to such recommendations, subject to visibility settings you control;
            </li>
            <li>
            to provide relevant advertising, including interest-based advertising from us and third parties, which may mean that we share non-personally identifiable information, such as your job title, to third-party advertisers;
            </li>
            <li>
            to transmit your application and save your application materials;
            </li>
            <li>
            to share your saved Profile or resume with employers, subject to visibility settings you control;
            </li>
            <li>
            to allow JobsLab and JobsLab affiliates to process your personal data for the purpose of improving for internal operations, including detecting and preventing fraud and spam, troubleshooting, data analysis, testing, research, and service improvement (this includes use of your IP address and mobile device information to help diagnose problems with our service and to administer the Platform);
            </li>
            <li>
            to create aggregate and statistical data that does not identify you individually and that we can commercialize (for example, we use mobile device data and IP addresses to gather demographic information);
            </li>
          </ul>
          <p>
          When we collect any information that does not identify you as a specific natural person ("Non-Personal Information"), we are permitted to use and disclose this information for any purpose, notwithstanding anything to the contrary in this Policy, except where we are required to do otherwise by applicable law. Examples of Non-Personal Information include: physical location information; demographic information, including gender, dates of birth, ZIP codes, etc.; or any personal information that has been anonymized, aggregated or de-identified. If we combine any Non-Personal Information with your personal information (such as combining your ZIP code with your name), we will use and disclose such combined information as personal information in accordance with this policy. Similarly, if applicable law requires that we treat certain Non-Personal Information as personal information, we will use and disclose this information as personal information in accordance with this policy.
          </p>
          </div>
          
          <div>
          <h3>How We Share Information</h3>
          <p>
          Cookie Policy and Ad Choices{/*<a>Cookie Policy and Ad Choices</a>*/}
          </p>
          <span>Cookies</span>
          <p>
          Cookies are small pieces of data that are stored on your computer, mobile phone, or other device when you first visit a page. We use cookies, web beacons, locally shared objects (sometimes called "flash cookies"), mobile identifiers and similar technologies ("Cookies") to help us recognize you on the Platform, enhance your user experience, understand usage of the Platform, and show you relevant advertising. Cookies may also be set by other websites or services that run content on the page you're visiting. To learn more about our partners (such as advertising, marketing and analytics providers) ("Ad Partners") and their use of Cookies, click here. After you register on the Platform, we may connect information we collect from the Cookies set by us and our partners with other information received from you. The provision of your data via Cookies is voluntary except for those Cookies that we place on your device because we need them for the performance of our Platform and our services.
          </p>
          </div>
          
          <div className="terms-i cookies">
          <p>
          We use Cookies for things like:
          </p>
          <p>
          <span>Purpose</span>
          </p>
          <p>
          <span>Explanation</span>
          </p>
          <p>
          <span>Authentication</span>
          </p>
          <p>
          We use Cookies to help us determine whether or not you've signed in to the Platform and to keep you signed in during visits as you access different pages.
          </p>
          <span>Security</span>
          <p>
          We use Cookies to enable and support security features, prevent fraud, and protect your data from unauthorized access.
          </p>
          <span>Preferences and Features</span>
          <p>
          We use Cookies to enable features, help us provide you with personalized content such as showing you your recent search activity.
          </p>
          <span>Advertising</span>
          <p>
          We use Cookies to deliver, evaluate and improve advertising, such as by using information about you to provide relevant advertising both on and off the Platform. Our Ad Partners may use a cookie to determine whether you've already been shown an advert or how it performed, or provide us with information about how you interacted with an ad.
          </p>
          <span>Analytics and Performance</span>
          <p>
          We use Cookies to analyze how our visitors use the Platform and to monitor site performance. These Cookies help us to identify and fix errors, understand and improve services, research and test out different features, and monitor how our visitors reach our sites.
          </p>
          <span>Opting Out of Cookies</span>
          <p>
          We use Cookies that are necessary for us to provide the services you use and you cannot opt out of these Cookies on the Platform. You are able to disable placement of some (but not all) Cookies by setting your browser to decline cookies, though this may worsen your user experience. Additionally, you can also control, manage and/or delete cookies via your browser settings. A useful resource for information about deleting and controlling cookies can be found at AboutCookies.org.
          </p>
          <p>
          If you enable location data for the mobile version of the Platform (including any version installed as a native application), we may use your location data to serve you geo-targeted ads for employers and other advertisers that are local to you. In such instances, we do not share your location with the advertiser or advertising network; rather, we provide the advertiser or advertising network with a means to push ads through to users located in certain areas. You may disable location services at any time in your device privacy settings or the JobsLab native app settings.
          </p>
          </div>
          
          <div>
          <h3>Close Your Account</h3>
          <p>
          If you'd like to close your JobsLab account, you can do so by sending an email to compliance@jobslab.io. After you close your account, you will no longer have full access to salaries, reviews, and interviews, and any content you have submitted will be pulled from the display on the Platform, but we reserve the right to keep any information in a closed account in our archives that we deem necessary to comply with our legal or regulatory obligations, resolve disputes and enforce our agreements. If, after you close your account, you wish to know which personal information we keep you can proceed in accordance with your rights set out above.
          </p>
          </div>
          
          <div>
          <h3>How Long We Keep Your Personal Information</h3>
          <p>
          We keep your personal information only so long as we need it to provide the Platform to you and fulfill the purposes described in this Policy. This is also the case for anyone that we share your personal information with and who carries out services on our behalf. Retention periods can vary significantly based on the type of information and how it is used. Our retention periods are based on criteria that include legally mandated retention periods, pending or potential litigation, our intellectual property or ownership rights, contract requirements, operational directives or needs, and historical archiving. When we no longer need to use your personal information and there is no need for us to keep it to comply with our legal or regulatory obligations, resolve disputes and enforce our agreements, we’ll either remove it from our systems or depersonalize it so that we can't identify you.
          </p>
          </div>
          
          </div>
        </div>
      </div>
    )
  }
}

export default PrivacyPolicy;