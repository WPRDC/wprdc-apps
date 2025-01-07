import { Field, Form, Formik, FormikHelpers } from 'formik';
import styles from '../../styles/Accounts.module.css';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { getCookie } from '@wprdc-components/util';
import * as Yup from 'yup';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';

const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': getCookie('csrftoken') || '',
  Accept: 'application/json',
};

interface Values {
  email: string;
  firstName: string;
  lastName: string;
  category: string;
  affiliation: string;
  intended_use: string;
  conflicts: string;
  agreed_to_terms: boolean;
  password: string;
  confirmPassword: string;
}

interface RequestMutationVariables {
  values: Values;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(),
  firstName: Yup.string()
    .max(64, 'Cannot be more than 64 characters')
    .required(),
  lastName: Yup.string()
    .max(64, 'Cannot be more than 64 characters')
    .required(),
  category: Yup.string().required(),
  affiliation: Yup.string()
    .max(64, 'Cannot be more than 64 characters')
    .required(),
  intended_use: Yup.string().required(),
  conflicts: Yup.string(),
  agreed_to_terms: Yup.boolean().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
});

function AccountRequestPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2>Request an Account</h2>
        <p>
          To request access, please complete an access request and a member of
          Neighborhood Allies will be in touch.
        </p>
        <p>
          You must agree to the Terms of Use before you can request an account.
        </p>

        <div className={styles.terms}>
          <h3>Terms of Use</h3>

          <p>
            This tool was developed to provide people with information about
            communities and properties that can be used to expand and preserve
            affordable housing in Allegheny County. This document describes the
            terms of use that are designed to minimize the ability for actors in
            the housing market to use this data to act in a malicious or
            predatory fashion, and work counter to the mission of the
            Preservation Working Group
          </p>

          <p>
            People affiliated with the following types of organizations will
            receive access to the data tool upon request, unless a conflict of
            interest exists between a person’s other affiliations and the intent
            of the Preservation Working Group.
          </p>

          <ul>
            <li>
              Housing and community development-focused nonprofit organizations
            </li>
            <li>
              Local, state, and federal government agencies and authorities
            </li>
            <li>Philanthropic organizations/Charitable</li>
          </ul>

          <p>
            People at the following types of organizations may request access to
            the tool from the Preservation Working Group. The Group may choose
            to grant access without extra conditions, place additional
            limitations on users from these organizations, or deny the request
            for access.
          </p>

          <ul>
            <li>Media organizations</li>
            <li>Students</li>
            <li>Researchers</li>
            <li>Mission-aligned developers</li>
            <li>Financial institutions</li>
          </ul>

          <h4>Permitted Uses</h4>

          <p>You are free and encouraged to use the data to:</p>
          <ul>
            <li>Expand and preserve affordable housing</li>
            <li>Improve community and resident well-being</li>
            <li>Enhance your understanding of community dynamics</li>
          </ul>

          <h4>As long as you:</h4>
          <ul>
            <li>
              Register for access in good faith, accurately representing your
              organizational status, eligibility, and intended use.
            </li>
            <li>
              Do not transfer your rights or credentials to use the tool to
              anyone else. Please encourage others to contact us for access.
            </li>
            <li>
              Do not share the tool’s bulk data, or large extracts of the data
              with others.
            </li>
            <li>
              Use special care when sharing reports or other extracts from the
              tool or database with non-registered users so as not to work
              counter to the mission of the Preservation Working Group. This may
              include redacting data related to subsidy expiration or inspection
              scores.
            </li>
            <li>
              Do not violate any of the security mechanisms established to
              prevent unauthorized users from accessing this tool.
            </li>
            <li>
              Remain employed or part of the organization that was listed in
              your initial application.
            </li>
            <li>
              Please let us know if you’ve moved to a new organization, even if
              you’ll be eligible to access the data in your new home or
              position.
            </li>
            <li>
              Provide attribution to the Preservation Working Group, Western
              Pennsylvania Regional Data Center, Carnegie Mellon Create Lab, and
              Preservation Working Group when using data and other information
              from the tool in reports, visualizations, stories, research, etc.
              We suggest you use the following language:
            </li>
            <li>
              This tool was created by the Western Pennsylvania Regional Data
              Center at the University of Pittsburgh and the Carnegie Mellon
              CREATE Lab in partnership with the Preservation Working Group.
              Data used in the tool comes from a variety of sources, including
              HUD and the Pennsylvania Housing Finance Agency.
            </li>
            <li>
              Consult Neighborhood Allies if you are in doubt about a
              prospective usage of the tool’s data.
            </li>
          </ul>

          <h4>Termination</h4>
          <p>
            Users that fail to comply with the terms of use will have their
            rights to use the tool and access the data terminated.
          </p>
          <h4>Disclaimer</h4>
          <p>
            The University of Pittsburgh, the City of Pittsburgh, Allegheny
            County (partners in the Western Pennsylvania Regional Data Center
            (WPRDC)), Neighborhood Allies and other members of the Preservation
            Working Group, and the Carnegie Mellon CREATE Lab hereby disclaim
            all implied and express warranties of any kind with regard to data
            made available through this tool or the WPRDC, and accessed by the
            user through the tool or WPRDC, including, but not limited to, the
            warranties of merchantability and of fitness for any particular
            purpose specific purpose. The University of Pittsburgh does not
            warrant the completeness or accuracy of the data made available
            through the WPRDC. User hereby acknowledges and accepts the above
            disclaimers and uses all of the data in the tool and WPRDC at its
            own risk and on an “as is” and “as available” basis.
          </p>
          <h4>Indemnification</h4>
          <p>
            User agrees to indemnify, release, and hold harmless the University
            of Pittsburgh, the City of Pittsburgh, Allegheny County - partners
            in the Western Pennsylvania Regional Data Center (WPRDC), members of
            the Preservation Working Group, and the Carnegie Mellon CREATE Lab
            to include its elected officials, officers, appointees, employees
            and agents, from any and all liability for claims arising out of my
            access to and/or use of data made available through the tool or the
            WPRDC.
          </p>
        </div>
        <div className={styles.formSection}>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              email: '',
              category: '',
              firstName: '',
              lastName: '',
              affiliation: '',
              intended_use: '',
              conflicts: '',
              password: '',
              confirmPassword: '',
              agreed_to_terms: false,
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>,
            ) => {
              const { confirmPassword, ...sendValues } = values;
              fetch(`${API_HOST}/accounts/request/`, {
                method: 'POST',
                headers,
                body: JSON.stringify(sendValues),
              }).then((r) => {
                if (r.status >= 200 && r.status < 300) {
                  router.push('/accounts/submitted');
                }
              });
            }}
          >
            {({ errors, touched, isValidating, values }) => (
              <Form className={styles.form}>
                <div>
                  <label>
                    I agree to the terms above.
                    <Field
                      id="agreed_to_terms"
                      name="agreed_to_terms"
                      type="checkbox"
                    />
                  </label>
                  {errors.agreed_to_terms && touched.agreed_to_terms && (
                    <div className={styles.error}>{errors.agreed_to_terms}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="email"
                    name="email"
                    placeholder="your@email.gov"
                    type="email"
                  />
                  {errors.email && touched.email && (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="password"
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className={styles.error}>{errors.confirmPassword}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="firstName"
                    name="firstName"
                    type="text"
                  />
                  {errors.firstName && touched.firstName && (
                    <div className={styles.error}>{errors.firstName}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="lastName"
                    name="lastName"
                    type="text"
                  />
                  {errors.lastName && touched.lastName && (
                    <div className={styles.error}>{errors.lastName}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="email">
                    What type of organization will you be using this data for?
                  </label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="category"
                    name="category"
                    as="select"
                  >
                    <option value="">-----</option>
                    <option value="nonprofit">
                      Housing and community development-focused nonprofit
                      organizations{' '}
                    </option>
                    <option value="government">
                      Local, state, and federal government agencies and
                      authorities
                    </option>
                    <option value="philanthropy">
                      Philanthropic organizations/Charitable foundations
                    </option>
                    <option value="media">Media organizations</option>
                    <option value="student">Students</option>
                    <option value="researcher">Researchers</option>
                    <option value="mission_aligned_dev">
                      Mission-aligned developers
                    </option>
                    <option value="financial_inst">
                      Financial Institutions
                    </option>
                  </Field>
                  {errors.category && touched.category && (
                    <div className={styles.error}>{errors.category}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="affiliation">
                    What is the name of the organization?
                  </label>
                  <Field
                    disabled={!values.agreed_to_terms}
                    id="affiliation"
                    name="affiliation"
                    type="text"
                  />
                  {errors.affiliation && touched.affiliation && (
                    <div className={styles.error}>{errors.affiliation}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="intended_use">
                    What is your intended use of the data?
                  </label>
                  <Field
                    id="intended_use"
                    name="intended_use"
                    component="textarea"
                    disabled={!values.agreed_to_terms}
                  />
                  {errors.intended_use && touched.intended_use && (
                    <div className={styles.error}>{errors.intended_use}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="conflicts">
                    List conflicts of interest that may arise with your use of
                    this data
                  </label>
                  <Field
                    id="conflicts"
                    name="conflicts"
                    component="textarea"
                    disabled={!values.agreed_to_terms}
                  />
                  <div className={styles.example}>
                    Example: for-profit real estate developer who is also on the
                    board of a community organization
                  </div>
                  {errors.conflicts && touched.conflicts && (
                    <div className={styles.error}>{errors.conflicts}</div>
                  )}
                </div>

                <button disabled={!values.agreed_to_terms} type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

AccountRequestPage.getLayout = (page: ReactElement) => (
  <Layout protect={false}>{page}</Layout>
);

export default AccountRequestPage;
