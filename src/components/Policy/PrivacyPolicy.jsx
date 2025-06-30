import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Noto Sans", sans-serif;
  color: ${({ theme }) => (theme.isDarkMode ? "#fff" : "#000")};
`;

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 20px;
    margin-top: 20px;
  }

  p,
  li {
    font-size: 16px;
    line-height: 1.6;
  }

  ul {
    padding-left: 20px;
  }
`;

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Section>
        <section>
          <h2>{t("privacy_policy.summary.title")}</h2>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.last_updated"
              components={{ strong: <strong /> }}
            />
          </p>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.intro"
              components={{ em: <em /> }}
            />
          </p>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.questions"
              components={{ strong: <strong /> }}
            />
          </p>
          <h2>{t("privacy_policy.summary.summary_title")}</h2>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.summary_intro"
              components={{ em: <em /> }}
            />
          </p>
          <h3>{t("privacy_policy.summary.summary_subtitle")}</h3>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.what_info"
              components={{ a: <a /> }}
            />
          </p>
          <h3>{t("privacy_policy.summary.summary_subtitle_1")}</h3>
          <p>{t("privacy_policy.summary.sensitive_info")}</p>

          <h3>{t("privacy_policy.summary.summary_subtitle_2")}</h3>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.third_parties"
              components={{ a: <a /> }}
            />
          </p>
          <h2>{t("privacy_policy.summary.summary_title_1")}</h2>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.how_process"
              components={{ a: <a /> }}
            />
          </p>

          <h2>{t("privacy_policy.summary.summary_title_2")}</h2>

          <p>
            <Trans
              i18nKey="privacy_policy.summary.who_share"
              components={{ a: <a /> }}
            />
          </p>

          <h2> {t("privacy_policy.summary.summary_title_3")}</h2>
          <p>
            <Trans
              i18nKey="privacy_policy.summary.your_rights"
              components={{ a: <a /> }}
            />
          </p>

          <h2> {t("privacy_policy.summary.summary_title_4")}</h2>

          <p> {t("privacy_policy.summary.exercise_rights")}</p>

          <p>
            <Trans
              i18nKey="privacy_policy.summary.learn_more"
              components={{ a: <a /> }}
            />
          </p>
        </section>
        <h2>Table of Contents</h2>
        <ol>
          <li>What information do we collect?</li>
          <li>How do we process your information?</li>
          <li>When and with whom do we share your personal information?</li>
          <li>Do we use cookies and other tracking technologies?</li>
          <li>How do we handle your social logins?</li>
          <li>Is your information transferred internationally?</li>
          <li>How long do we keep your information?</li>
          <li>Do we collect information from minors?</li>
          <li>What are your privacy rights?</li>
          <li>Controls for Do-Not-Track features</li>
          <li>Do we make updates to this notice?</li>
          <li>How can you contact us about this notice?</li>
          <li>
            How can you review,update,or delete the data we collect from you?
          </li>
        </ol>
        <section>
          <h2>{t("privacy_policy.section1.title")}</h2>
          <h3>{t("privacy_policy.section1.subtitle_1")}</h3>
          <Trans
            i18nKey="privacy_policy.section1.summary_1"
            components={{ strong: <strong /> }}
          />
          <p>{t("privacy_policy.section1.content_1")}</p>
          <p>
            <Trans
              i18nKey="privacy_policy.section1.sensitive_info"
              components={{ strong: <strong /> }}
            />
          </p>
          <p>
            <Trans
              i18nKey="privacy_policy.section1.accuracy"
              components={{ strong: <strong /> }}
            />
          </p>

          <h3>{t("privacy_policy.section1.subtitle_2")}</h3>
          <Trans
            i18nKey="privacy_policy.section1.summary_2"
            components={{ strong: <strong /> }}
          />
          <p>{t("privacy_policy.section1.content_2")}</p>

          <ul>
            <li>Device and usage information</li>
            <li>IP address</li>
            <li>Browser and device characteristics</li>
            <li>Operating system</li>
            <li>Language preferences</li>
            <li>Referring URLs</li>
            <li>Device name</li>
            <li>Country, location</li>
            <li>Information about how and when you use our Services</li>
            <li>Other technical information</li>
          </ul>

          <p>{t("privacy_policy.section1.purpose")}</p>
          <p>{t("privacy_policy.section1.cookies")}</p>
        </section>
        <section>
          <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
          <p>
            <strong>In Short:</strong> We process your information to provide,
            improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also
            process your information for other purposes with your consent.
          </p>

          <p>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </p>
        </section>

        <section>
          <h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
          <p>
            <strong>In Short:</strong> We may share information in specific
            situations described in this section and/or with the following third
            parties.
          </p>

          <p>
            We may need to share your personal information in the following
            situations:
          </p>

          <ul>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.
            </li>
            <li>
              <strong>Affiliates:</strong> We may share your information with
              our affiliates. In such cases, we require those affiliates to
              honor this Privacy Notice. Affiliates include our parent company
              and any subsidiaries, joint venture partners, or other companies
              that we control or are under common control with us.
            </li>
            <li>
              <strong>Business Partners:</strong> We may share your information
              with our business partners to offer you certain products,
              services, or promotions.
            </li>
          </ul>
        </section>
        <section>
          <h2>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          <p>
            <strong>In Short:</strong> We may use cookies and other tracking
            technologies to collect and store your information.
          </p>

          <p>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our
            <a href="/policy-cookies">Cookie Notice</a>.
          </p>

          <p>
            Some cookies help maintain the security and functionality of our
            Services. Others may be placed by our partners and service providers
            for analytics and advertising, including:
          </p>

          <ul>
            <li>Delivering relevant advertisements</li>
            <li>Measuring ad performance</li>
            <li>Sending reminders (e.g. about items left in your cart)</li>
          </ul>
        </section>

        <section>
          <h2>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
          <p>
            <strong>In Short:</strong> If you choose to register or log in using
            a social media account, we may have access to certain information
            about you.
          </p>

          <p>
            Our Services offer you the ability to register and log in using your
            third-party social media account details (like Facebook, Google,
            etc.). Where you choose to do this, we will receive certain profile
            information, including your name, email address, profile picture,
            and possibly other details made public on that platform.
          </p>

          <p>
            We will use this information only for the purposes that are
            described in this Privacy Notice Please note that we do not control,
            and are not responsible for, other uses of your personal information
            by your third-party social media provider. We recommend that you
            review their privacy policies to understand how they handle your
            data.
          </p>
        </section>
        <section>
          <h2>6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
          <p>
            <strong>In Short:</strong> We may transfer, store, and process your
            information in countries other than your own.
          </p>

          <p>
            Our servers are located in [insert location]. If you are accessing
            our Services from outside, please be aware that your information may
            be transferred to, stored by, and processed by us in our facilities
            and in the facilities of third parties with whom we may share
            personal information (see "When and with whom do we share your
            personal information?" above), in [insert applicable countries].
          </p>

          <p>
            If you are a resident in the European Economic Area (EEA), United
            Kingdom (UK), or Switzerland, please note that these countries may
            not necessarily have data protection laws or other similar laws as
            comprehensive as those in your country. However, we will take all
            necessary measures to protect your personal information in
            accordance with this Privacy Notice and applicable law.
          </p>
        </section>

        <section>
          <h2>7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <p>
            <strong>In Short:</strong> We keep your information for as long as
            necessary to fulfill the purposes outlined in this Privacy Notice
            unless otherwise required by law.
          </p>

          <p>
            We will only retain your personal information for as long as it is
            necessary for the purposes set out in this Privacy Notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements).
          </p>

          <p>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize such
            information. If this is not possible (for example, if your personal
            information is stored in backup archives), we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible.
          </p>
          <p>
            If this is not possible (for example, if your personal information
            is stored in backup archives), we will securely store your personal
            information and isolate it from any further processing until
            deletion is possible.
          </p>
        </section>

        <section>
          <h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          <p>
            <strong>In Short:</strong> We do not knowingly collect data from or
            market to children under 18 years of age.
          </p>

          <p>
            We do not knowingly collect, solicit data from, or market to
            children under 18 years of age, nor do we knowingly sell such
            personal information. By using the Services, you represent that you
            are at least 18 or that you are the parent or guardian of such a
            minor and consent to such minor dependent’s use of the Services.
          </p>
          <p>
            If we learn that personal information from users less than 18 years
            of age has been collected, we will deactivate the account and take
            reasonable measures to promptly delete such data from our records.
            If you become aware of any data we may have collected from children
            under age 18, please contact us at [insert contact info].
          </p>
        </section>

        <section>
          <h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <p>
            <strong>In Short:</strong> You may review, change, or terminate your
            account at any time, depending on your country, province, or state
            of residence.
          </p>

          <h3>Withdrawing your consent</h3>
          <p>
            If we are relying on your consent to process your personal
            information, which may be express and/or implied depending on the
            applicable law, you have the right to withdraw your consent at any
            time. You can withdraw your consent by contacting us using the
            contact details provided in the section "How can you contact us
            about this notice?" below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of
            processing based on consent before its withdrawal, nor (where
            applicable law allows) the lawfulness of processing based on other
            legal grounds.
          </p>

          <h3>Account Information</h3>
          <p>
            If you would at any time like to review or change the information in
            your account or terminate your account, you can:
          </p>
          <ul>
            <li>
              Log in to your account settings and update your user account
            </li>
            <li>Contact us using the contact information provided</li>
          </ul>

          <p>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, we may retain some information in our files to:
          </p>
          <ul>
            <li>Prevent fraud</li>
            <li>Troubleshoot problems</li>
            <li>Assist with investigations</li>
            <li>Enforce our legal terms</li>
            <li>Comply with applicable legal requirements</li>
          </ul>
        </section>
        <section>
          <h2>10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          <p>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track ("DNT") feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected.
          </p>
          <p>
            At this stage, no uniform technology standard for recognizing and
            implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that
            automatically communicates your choice not to be tracked online. If
            a standard for online tracking is adopted that we must follow in the
            future, we will inform you about that practice in a revised version
            of this Privacy Notice.
          </p>
        </section>

        <section>
          <h2>11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
          <p>
            <strong>In Short:</strong> Yes, we will update this notice as
            necessary to stay compliant with relevant laws.
          </p>
          <p>
            We may update this Privacy Notice from time to time. The updated
            version will be indicated by an updated "Revised" date at the top of
            this document. If we make material changes, we may notify you either
            by prominently posting a notice of such changes or by directly
            sending you a notification. We encourage you to review this Privacy
            Notice frequently to stay informed of how we are protecting your
            information.
          </p>
        </section>
        <section>
          <h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          <p>
            If you have questions or comments about this notice, you may contact
            us by post at:
          </p>
          <address>
            Nika Gold
            <br />
            [Street Address]
            <br />
            [City, Postal Code]
            <br />
            [Country]
          </address>
        </section>

        <section>
          <h2>
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>
          <p>
            Based on the applicable laws of your country, you may have the right
            to request access to the personal information we collect from you,
            details about how we have processed it, correct inaccuracies, or
            delete your personal information. You may also have the right to
            withdraw your consent to our processing of your personal
            information. These rights may be limited in some circumstances by
            applicable law.
          </p>
          <p>
            To request to review, update, or delete your personal information,
            please fill out and submit a data subject access request at:
            <a href="/data-access-request">/data-access-request</a>
          </p>
        </section>
      </Section>
    </Wrapper>
  );
};

export default PrivacyPolicy;
