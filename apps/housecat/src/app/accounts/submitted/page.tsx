import styles from '../../styles/Accounts.module.css';

export function AccountSubmittedPage() {
  return (
    <div className="w-full">
      <div className={styles.message}>
        <p>Submitted</p>
        <p>Thank you for submitting your request.</p>
        <p>
          Someone will email you once your request has been approved or denied.
        </p>
      </div>
    </div>
  );
}

export default AccountSubmittedPage;
