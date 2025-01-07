import styles from '../../styles/Accounts.module.css';
import { useAccountList } from '@wprdc-connections/housecat';
import { AccountRequestItem } from '../../components/AccountRequestItem';
import { useMutation } from 'react-query';
import { getCookie } from '@wprdc-components/util';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';

const headers = {
  'Content-Type': 'application/json',
  'X-CSRFToken': getCookie('csrftoken') || '',
};

interface MutationVariables {
  /** email for target user profile */
  email: string;

  /** True if the user with email `email` should be approved. */
  shouldApprove: boolean;
}

export function AccountReviewPage() {
  const {
    data: userList,
    error,
    refetch: refecthAccountList,
  } = useAccountList({ approved: false });

  const approvalMutation = useMutation(
    ({ email, shouldApprove }: MutationVariables) => {
      return fetch(
        `${API_HOST}/accounts/${shouldApprove ? 'approve' : 'revoke'}/`,
        {
          method: 'POST',
          body: JSON.stringify({ user: email }),
          headers,
          credentials: 'include',
        },
      );
    },
    {
      onSuccess: () => refecthAccountList(),
    },
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h2>Accounts Pending Review</h2>
        {!!userList && !!userList.length ? (
          userList.map((user) => (
            <AccountRequestItem
              key={user.user.email}
              userProfile={user}
              onApprove={() => {
                approvalMutation.mutate({
                  email: user.user.email,
                  shouldApprove: true,
                });
              }}
              onDeny={() =>
                approvalMutation.mutate({
                  email: user.user.email,
                  shouldApprove: false,
                })
              }
            />
          ))
        ) : (
          <div className={styles.message}>
            <p>All done!</p>
            <p>There are currently no more accounts to review.</p>
          </div>
        )}
      </div>
    </div>
  );
}

AccountReviewPage.getLayout = (page: ReactElement) => (
  <Layout protect={true}>{page}</Layout>
);

export default AccountReviewPage;
